import { VercelRequest, VercelResponse } from '@vercel/node';

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const RATE_LIMIT_MS = 10_000;
const recentRequests = new Map<string, number>();

type EmailTemplateParams = {
  email?: string;
  [key: string]: unknown;
};

function getEmailConfig() {
  const env = process.env;
  return {
    serviceId: env.EMAILJS_SERVICE_ID?.trim() ?? '',
    templateId: env.EMAILJS_TEMPLATE_ID?.trim() ?? '',
    publicKey: env.EMAILJS_PUBLIC_KEY?.trim() ?? '',
    blockedEmails: (env.EMAILJS_BLOCKED_EMAILS ?? '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  };
}

function isConfigured(config: ReturnType<typeof getEmailConfig>): boolean {
  return Boolean(config.serviceId && config.templateId && config.publicKey);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const config = getEmailConfig();

  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ configured: isConfigured(config) });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  if (!isConfigured(config)) {
    return res.status(503).json({ success: false, message: 'Email confirmation is not configured.' });
  }

  const templateParams = req.body as EmailTemplateParams | undefined;
  const recipient = typeof templateParams?.email === 'string' ? templateParams.email.trim() : '';
  if (!recipient) {
    return res.status(400).json({ success: false, message: 'A recipient email is required.' });
  }

  if (config.blockedEmails.includes(recipient.toLowerCase())) {
    return res.status(403).json({ success: false, message: 'This recipient is blocked from email confirmation.' });
  }

  const clientIp = req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || 'unknown';
  const rateLimitKey = clientIp;
  const now = Date.now();
  const lastRequest = recentRequests.get(rateLimitKey);
  if (lastRequest !== undefined && now - lastRequest < RATE_LIMIT_MS) {
    return res.status(429).json({ success: false, message: 'Please wait before sending another confirmation email.' });
  }
  recentRequests.set(rateLimitKey, now);

  try {
    const emailResponse = await fetch(EMAILJS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        template_params: { ...templateParams, email: recipient },
      }),
    });
    const message = await emailResponse.text();

    if (!emailResponse.ok) {
      recentRequests.delete(rateLimitKey);
      return res.status(emailResponse.status).json({
        success: false,
        message: message || `Email provider returned ${emailResponse.status}.`,
      });
    }

    return res.status(200).json({ success: true, data: null, message: 'Confirmation email sent.' });
  } catch {
    recentRequests.delete(rateLimitKey);
    return res.status(502).json({ success: false, message: 'Could not reach the email provider.' });
  }
}
