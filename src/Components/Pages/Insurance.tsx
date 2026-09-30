import { ArrowLeft, Check, Info, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Bubble from '../../Utils/Components/Bubble/Bubble';
import { routeMatcher } from '../router';

const coverageTopics = [
  ['Trip cancellation or interruption', 'Some real policies may reimburse eligible non-refundable travel costs for covered events.'],
  ['Medical assistance abroad', 'Some plans offer emergency medical support or evacuation benefits, subject to policy terms.'],
  ['Baggage and delays', 'Some policies cover eligible baggage loss, damage, or delay expenses under stated limits.'],
];

function Insurance() {
  return (
    <main className="min-h-[60vh] bg-gray-50 px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <Link to={routeMatcher.help} className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-(--sb-blue-250) hover:underline"><ArrowLeft size={17} /> Help center</Link>
        <div className="text-center">
          <Bubble Icons={ShieldCheck} text="Travel protection" />
          <h1 className="playfair-display mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">Travel insurance</h1>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-500">Understand the insurance choice shown during the PlaneT booking demonstration.</p>
        </div>

        <section className="mt-9 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--sb-blue-fade-4) text-(--sb-blue-250)"><Info size={21} /></div>
            <div><h2 className="playfair-display text-xl font-semibold text-gray-900">The current PlaneT option is a demo</h2><p className="mt-2 leading-7 text-gray-600">Selecting Travel Insurance in the booking form records a preference in the demonstration. PlaneT does not sell, issue, or activate an insurance policy, and the selection does not provide coverage or add an insurance charge.</p></div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="playfair-display text-xl font-semibold text-gray-900">What real travel insurance may include</h2>
          <p className="mt-2 leading-7 text-gray-600">Coverage varies by insurer, plan, location, and personal circumstances. A real policy may include benefits such as:</p>
          <ul className="mt-4 space-y-4">
            {coverageTopics.map(([title, text]) => <li key={title} className="flex gap-3 text-gray-600"><Check className="mt-1 shrink-0 text-green-600" size={18} /><span><strong className="text-gray-800">{title}.</strong> {text}</span></li>)}
          </ul>
        </section>

        <aside className="mt-5 rounded-2xl bg-(--sb-blue-fade-4) p-5 leading-7 text-gray-700 sm:p-7">
          Before buying a real plan, read its certificate and exclusions, check coverage limits and deductibles, and confirm that your trip and activities are eligible. Contact the insurer directly for advice about a specific policy.
        </aside>
      </div>
    </main>
  );
}

export default Insurance;
