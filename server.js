import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = resolve(ROOT, 'dist');
const DATABASE_FILE = resolve(ROOT, 'db.json');
const PORT = Number.parseInt(process.env.PORT ?? '3000', 10);
const HOST = process.env.HOST ?? '0.0.0.0';

const CONTENT_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

/** Adds shared response headers and sends a response body. */
function send(response, statusCode, body, contentType = 'application/json; charset=utf-8', headOnly = false) {
  response.writeHead(statusCode, {
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'no-store',
  });
  response.end(headOnly ? undefined : body);
}

/** Parses JSON Server style query filters for the flights collection. */
function matchesFilters(flight, searchParams) {
  for (const [filterKey, expected] of searchParams.entries()) {
    const match = filterKey.match(/^(.*?)(?::|_)(contains|like|gte|lte|gt|lt)$/i);
    const property = match?.[1] ?? filterKey;
    const operator = match?.[2]?.toLowerCase() ?? 'eq';
    const actual = flight[property];
    if (actual === undefined || actual === null) return false;

    if (operator === 'contains' || operator === 'like') {
      if (!String(actual).toLowerCase().includes(expected.toLowerCase())) return false;
      continue;
    }

    let left = actual;
    let right = expected;
    if (typeof actual === 'number') right = Number(expected);
    else if (typeof actual === 'boolean') right = expected.toLowerCase() === 'true';
    else if (operator !== 'eq' && !Number.isNaN(Number(actual)) && !Number.isNaN(Number(expected))) {
      left = Number(actual);
      right = Number(expected);
    }

    if (operator === 'eq' && String(left).toLowerCase() !== String(right).toLowerCase()) return false;
    if (operator === 'gte' && !(left >= right)) return false;
    if (operator === 'lte' && !(left <= right)) return false;
    if (operator === 'gt' && !(left > right)) return false;
    if (operator === 'lt' && !(left < right)) return false;
  }
  return true;
}

/** Serves the read-only flight API, production assets, and SPA route fallback. */
async function handleRequest(request, response) {
  const headOnly = request.method === 'HEAD';
  if (request.method !== 'GET' && !headOnly) {
    response.setHeader('Allow', 'GET, HEAD');
    send(response, 405, JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    send(response, 400, JSON.stringify({ error: 'Invalid URL' }));
    return;
  }

  if (pathname === '/health') {
    send(response, 200, JSON.stringify({ status: 'ok' }));
    return;
  }

  if (pathname === '/flights' || pathname === '/flights/') {
    try {
      const database = JSON.parse(await readFile(DATABASE_FILE, 'utf8'));
      const flights = Array.isArray(database.flights) ? database.flights : [];
      const filteredFlights = flights.filter((flight) => matchesFilters(flight, new URL(request.url, 'http://localhost').searchParams));
      send(response, 200, JSON.stringify(filteredFlights), 'application/json; charset=utf-8', headOnly);
    } catch {
      send(response, 500, JSON.stringify({ error: 'Could not read the flight data.' }));
    }
    return;
  }

  const requestedPath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = resolve(DIST_DIR, requestedPath);
  if (filePath !== DIST_DIR && !filePath.startsWith(`${DIST_DIR}${sep}`)) {
    send(response, 403, JSON.stringify({ error: 'Forbidden' }));
    return;
  }

  let candidate = filePath;
  try {
    if (!(await stat(candidate)).isFile()) throw new Error('Not a file');
  } catch {
    if (extname(pathname)) {
      send(response, 404, JSON.stringify({ error: 'Not found' }));
      return;
    }
    candidate = resolve(DIST_DIR, 'index.html');
  }

  try {
    const body = await readFile(candidate);
    const contentType = CONTENT_TYPES[extname(candidate).toLowerCase()] ?? 'application/octet-stream';
    send(response, 200, body, contentType, headOnly);
  } catch {
    send(response, 503, JSON.stringify({ error: 'Production build not found. Run npm run build first.' }));
  }
}

const server = createServer((request, response) => {
  void handleRequest(request, response);
});

server.listen(PORT, HOST, () => {
  console.log(`PlaneT production server listening on http://${HOST}:${PORT}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
