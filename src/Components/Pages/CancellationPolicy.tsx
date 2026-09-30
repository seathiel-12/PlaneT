import { AlertTriangle, ArrowLeft, CalendarClock, CircleCheck, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import Bubble from '../../Utils/Components/Bubble/Bubble';
import { routeMatcher } from '../router';

const policyItems = [
  {
    title: 'Within 24 hours of booking',
    text: 'The PlaneT demo displays free cancellation within 24 hours as part of the booking summary. This is informational only; the demo does not submit a cancellation request to an airline or payment provider.',
    Icon: CalendarClock,
  },
  {
    title: 'After the first 24 hours',
    text: 'Cancellation eligibility, fees, and refunds depend on the fare conditions and the airline or ticketing provider. Check those conditions before making a real booking.',
    Icon: Plane,
  },
  {
    title: 'Changes and refunds',
    text: 'A cancellation does not automatically guarantee a refund. Any change fee, refund amount, or travel credit is determined by the relevant fare rules and provider.',
    Icon: CircleCheck,
  },
];

function CancellationPolicy() {
  return (
    <main className="min-h-[60vh] bg-gray-50 px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <Link to={routeMatcher.help} className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-(--sb-blue-250) hover:underline"><ArrowLeft size={17} /> Help center</Link>
        <div className="text-center">
          <Bubble Icons={CalendarClock} text="Booking support" />
          <h1 className="playfair-display mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">Cancellation policy</h1>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-500">Here is how to understand cancellation information shown in PlaneT and what to check before a real trip.</p>
        </div>

        <div className="mt-9 grid gap-4">
          {policyItems.map(({ title, text, Icon }) => (
            <section key={title} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--sb-blue-fade-4) text-(--sb-blue-250)"><Icon size={21} /></div>
              <div><h2 className="playfair-display text-xl font-semibold text-gray-900">{title}</h2><p className="mt-2 leading-7 text-gray-600">{text}</p></div>
            </section>
          ))}
        </div>

        <aside className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 sm:p-6">
          <AlertTriangle className="mt-0.5 shrink-0" size={20} />
          <p className="leading-7"><strong>Demo notice:</strong> PlaneT does not currently issue tickets or process cancellation or refund requests. For a real ticket, contact the airline or booking provider named on your confirmation and follow its fare rules.</p>
        </aside>
      </div>
    </main>
  );
}

export default CancellationPolicy;
