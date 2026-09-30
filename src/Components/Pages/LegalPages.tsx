import { ArrowLeft, Cookie, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routeMatcher } from '../router';

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

function LegalPage({ title, intro, Icon, sections }: {
  title: string;
  intro: string;
  Icon: typeof Cookie;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-[60vh] bg-gray-50 px-4 py-10 sm:px-8 sm:py-14">
      <article className="mx-auto max-w-4xl">
        <Link to={routeMatcher.home} className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-(--sb-blue-250) hover:underline"><ArrowLeft size={17} /> Back to PlaneT</Link>
        <header className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-9">
          <div className="flex items-center gap-3 text-(--sb-blue-250)"><Icon size={25} /><span className="text-sm font-semibold uppercase tracking-wide">PlaneT information</span></div>
          <h1 className="playfair-display mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl leading-7 text-gray-600">{intro}</p>
        </header>

        <div className="mt-5 space-y-4">
          {sections.map(({ title: sectionTitle, paragraphs, bullets }) => (
            <section key={sectionTitle} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="playfair-display text-xl font-semibold text-gray-900">{sectionTitle}</h2>
              {paragraphs?.map((paragraph) => <p key={paragraph} className="mt-3 leading-7 text-gray-600">{paragraph}</p>)}
              {bullets && <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-gray-600">{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </section>
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-500">Questions about this information? Contact <a className="font-medium text-(--sb-blue-250) hover:underline" href="mailto:hello@planet-travel.com">hello@planet-travel.com</a>.</p>
      </article>
    </main>
  );
}

export function CookiePolicy() {
  return <LegalPage
    title="Cookie Policy"
    intro="This page describes the cookies and similar browser storage currently used by the PlaneT demonstration application."
    Icon={Cookie}
    sections={[
      {
        title: 'First-party session cookie',
        paragraphs: ['When you sign in, PlaneT stores a first-party cookie named `planet_auth` so the demo can restore your signed-in state on this browser. The cookie contains the demo account ID, name, and email address. It is set for the site path, uses SameSite=Lax, and expires after 30 days. Signing out removes it.'],
      },
      {
        title: 'Local browser storage',
        paragraphs: ['PlaneT also uses localStorage, which is separate from cookies, to remember the selected interface language, demo account records, and saved demo bookings. These values remain on the browser until they are removed through the application where available or by clearing this site’s browser data.'],
      },
      {
        title: 'External resources',
        paragraphs: ['Some pages load Google Fonts, an embedded Google Map, and destination images from an external image provider. When those resources load, the provider may receive technical request data such as your IP address and browser information and may use its own storage technologies under its policies. EmailJS is contacted only when an email confirmation is sent. PlaneT does not currently install its own advertising or audience-measurement cookies.'],
      },
      {
        title: 'Your choices',
        paragraphs: ['You can sign out to remove the PlaneT session cookie and clear PlaneT browser storage through your browser settings. Blocking all cookies or local storage may prevent sign-in, language preferences, or saved demo bookings from working. Refer to the relevant external providers’ privacy information for controls over their resources.'],
      },
    ]}
  />;
}

export function PrivacyPolicy() {
  return <LegalPage
    title="Privacy Policy"
    intro="PlaneT is a frontend travel-booking demonstration. This policy explains what the current application stores in your browser and what is sent to external services when you choose a feature."
    Icon={Shield}
    sections={[
      {
        title: 'Information stored on this browser',
        bullets: [
          'Demo account details: name, email address, a generated account ID, and a salted password digest with its salt. The demo account registry is stored in localStorage.',
          'Session details: account ID, name, and email are stored in the `planet_auth` cookie for up to 30 days while signed in.',
          'Saved demo bookings: booking reference, booking date, flight route and date, passenger count, price, and account association are stored in localStorage.',
          'Interface preference: the selected language is stored in localStorage. Passenger form entries are held in application memory during the booking flow and are not included in the saved booking record.',
        ],
      },
      {
        title: 'Information sent to service providers',
        paragraphs: ['If you choose to send a booking confirmation email, PlaneT sends the recipient email, traveler name, booking reference, route, departure date, passenger count, and price to EmailJS. In production, the request passes through a PlaneT Vercel function before reaching EmailJS. EmailJS processes the message under its own terms and privacy policy.'],
      },
      {
        title: 'External content and contact form',
        paragraphs: ['Google Fonts, the embedded Google Map, and remote destination images are requested from their providers when the related page or image is displayed. The contact form currently provides a front-end demonstration only: it does not transmit or store the submitted message.'],
      },
      {
        title: 'Purpose, retention, and control',
        paragraphs: ['Browser data is used to demonstrate account sign-in, language preference, and saved bookings. It stays on this browser until you sign out (for the session cookie) or clear the site’s browser data. The app does not currently provide a separate account-deletion or booking-deletion control. You can clear local browser data in your browser settings.'],
      },
      {
        title: 'No real payments or issued tickets',
        paragraphs: ['The current payment flow is simulated. PlaneT does not collect or process payment-card details through a payment gateway, issue airline tickets, or provide real travel insurance. Do not enter real card or passport information into this demonstration.'],
      },
      {
        title: 'Contact',
        paragraphs: ['For privacy questions or requests, contact hello@planet-travel.com. This application is a demo and does not currently provide a separate account export or deletion workflow.'],
      },
    ]}
  />;
}

export function TermsOfService() {
  return <LegalPage
    title="Terms of Service"
    intro="These terms describe the current PlaneT demonstration. By using the application, you agree to use it as a travel-planning and booking-flow demo, not as a live ticketing service."
    Icon={FileText}
    sections={[
      {
        title: 'Demonstration service',
        paragraphs: ['PlaneT is a frontend demonstration. Flight schedules, availability, prices, account features, booking confirmation, and payment screens may use sample or locally stored data and are not a live offer to sell air travel.'],
      },
      {
        title: 'Bookings and payment',
        paragraphs: ['The payment form simulates a booking confirmation. No payment is submitted to a bank or payment processor, no charge is made, and no airline ticket or travel contract is issued. Downloaded ticket summaries are demonstrations only and cannot be used for travel.'],
      },
      {
        title: 'Accounts and saved data',
        paragraphs: ['Demo accounts and reservations are stored in the browser used to create them. They may not be available on another device and may be removed when browser data is cleared. You are responsible for avoiding real or sensitive information in this demonstration.'],
      },
      {
        title: 'Cancellations and insurance',
        paragraphs: ['Any cancellation text shown in the application is illustrative and does not submit a cancellation or refund request. The insurance option does not create or activate a policy. Real travel services and policies are governed by the airline, ticket seller, or insurer and their applicable terms.'],
      },
      {
        title: 'Acceptable use and availability',
        paragraphs: ['Use the application lawfully and do not attempt to disrupt, overload, or gain unauthorized access to it. The demo is provided as available and may change or become unavailable without notice.'],
      },
      {
        title: 'Third-party services',
        paragraphs: ['External resources such as Google Maps, Google Fonts, destination image providers, and EmailJS are governed by their own terms and privacy notices. PlaneT does not control those services.'],
      },
      {
        title: 'Contact',
        paragraphs: ['Questions about these terms can be sent to hello@planet-travel.com.'],
      },
    ]}
  />;
}
