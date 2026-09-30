import { Accordion } from '@mantine/core';
import { ArrowRight, CircleHelp, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Bubble from '../../Utils/Components/Bubble/Bubble';
import { routeMatcher } from '../router';

const questions = [
  {
    question: 'How do I book a flight?',
    answer: 'Search for a route and travel date, choose a flight, add passenger details, then review the payment step. The current PlaneT payment flow is a demonstration and does not charge a card.',
  },
  {
    question: 'Why do I need to sign in before paying?',
    answer: 'Signing in lets PlaneT associate your ticket with your account so it appears in My Bookings. If you are signed out, the payment step offers a sign-in or account creation link and returns you to the same step afterward.',
  },
  {
    question: 'Where can I find my ticket?',
    answer: 'After completing the demo payment, you can download the ticket from the confirmation page. Signed-in users can also view their saved reservations in My Bookings on this browser.',
  },
  {
    question: 'Can I change or cancel a reservation?',
    answer: 'The cancellation information for this demo is described in the cancellation policy. Actual airline tickets and changes are subject to the fare rules shown by the airline or ticketing provider.',
  },
  {
    question: 'Does selecting insurance purchase a real policy?',
    answer: 'No. PlaneT currently demonstrates an insurance selection only. It does not issue insurance or collect an insurance premium. See the insurance page for details.',
  },
];

function Help() {
  return (
    <main className="min-h-[60vh] bg-gray-50 px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Bubble Icons={CircleHelp} text="PlaneT Support" />
          <h1 className="playfair-display mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">How can we help?</h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500">Find answers about booking, cancellations, and travel protection.</p>
        </div>

        <section id="faqs" className="mt-10 scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="playfair-display mb-5 text-2xl font-semibold text-gray-900">Frequently asked questions</h2>
          <Accordion variant="separated" radius="md">
            {questions.map(({ question, answer }) => (
              <Accordion.Item key={question} value={question}>
                <Accordion.Control>{question}</Accordion.Control>
                <Accordion.Panel><p className="leading-7 text-gray-600">{answer}</p></Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link to={routeMatcher.cancellationPolicy} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-(--sb-blue-250)">
            <h2 className="playfair-display text-xl font-semibold text-gray-900">Cancellation policy</h2>
            <p className="mt-2 leading-6 text-gray-500">Review the demo cancellation window and how airline fare rules apply.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-medium text-(--sb-blue-250)">Read the policy <ArrowRight size={17} className="transition group-hover:translate-x-1" /></span>
          </Link>
          <Link to={routeMatcher.insurance} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-(--sb-blue-250)">
            <h2 className="playfair-display text-xl font-semibold text-gray-900">Travel insurance</h2>
            <p className="mt-2 leading-6 text-gray-500">Learn what the insurance option means in this PlaneT demonstration.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-medium text-(--sb-blue-250)">View insurance information <ArrowRight size={17} className="transition group-hover:translate-x-1" /></span>
          </Link>
        </div>

        <section className="mt-6 flex flex-col gap-4 rounded-2xl bg-(--sb-blue-fade-4) p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-1 shrink-0 text-(--sb-blue-250)" />
            <div><h2 className="font-semibold text-gray-900">Still need help?</h2><p className="mt-1 text-gray-600">Send us a message and include your booking reference if you have one.</p></div>
          </div>
          <Link to={routeMatcher.contact} className="inline-flex w-max items-center gap-2 rounded-xl bg-(--sb-blue-250) px-5 py-2.5 font-medium text-white transition hover:opacity-90"><Mail size={17} /> Contact PlaneT</Link>
        </section>
      </div>
    </main>
  );
}

export default Help;
