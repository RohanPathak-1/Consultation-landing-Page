"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Check, Info, MessageCircle } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";
import { getWhatsappUrl } from "@/lib/content";
import { DEMO_COMPLETION_KEY, isLocalDemoMode } from "@/lib/demoFlow";

type SubmissionState = "checking" | "confirmed" | "direct";

export function ThankYouContent() {
  const { language, copy } = useI18n();
  const [submissionState, setSubmissionState] = useState<SubmissionState>("checking");
  const pageCopy = copy.thankYou;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const completed = window.sessionStorage.getItem(DEMO_COMPLETION_KEY) === "true";
    setSubmissionState(isLocalDemoMode || completed ? "confirmed" : "direct");
  }, []);

  if (submissionState === "checking") {
    return <section className="min-h-[55vh] bg-soft" aria-live="polite" />;
  }

  if (submissionState === "direct") {
    return (
      <section className="relative flex min-h-[65vh] items-center py-14 sm:py-20">
        <div className="container-page relative">
          <div className="confirmation-enter mx-auto max-w-2xl rounded-[2rem] border border-blue-100 bg-white p-7 text-center shadow-soft sm:p-11">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-soft text-brand ring-8 ring-blue-50"><Info className="h-8 w-8" aria-hidden="true" /></div>
            <p className="eyebrow mt-7">{pageCopy.fallback.eyebrow}</p>
            <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-4xl">{pageCopy.fallback.headline}</h1>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">{pageCopy.fallback.message}</p>
            <a href="/#form" className="primary-cta mt-7 w-full sm:w-auto"><ArrowLeft className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />{pageCopy.fallback.link}</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-14 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(1,54,206,0.15),transparent_60%)]" />
      <div className="container-page relative">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-blue-100 bg-white p-5 shadow-soft sm:p-10 lg:p-14">
          <div className="confirmation-enter text-center">
            <div className="confirm-icon mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700 ring-8 ring-green-50"><Check className="h-11 w-11" strokeWidth={3} aria-hidden="true" /></div>
            <p className="eyebrow mt-8">{pageCopy.confirmed.eyebrow}</p>
            <h1 className="mx-auto mt-3 max-w-4xl text-balance text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl">{pageCopy.confirmed.headline}</h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{pageCopy.confirmed.message}</p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <Reveal><h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">{pageCopy.nextHeading}</h2></Reveal>
            <div className="mt-7 grid gap-4">
              {pageCopy.steps.map((step, index) => <Reveal key={step.title} delay={index * 100}><article className="interactive-card flex gap-4 rounded-2xl border border-blue-100 bg-soft p-5 sm:p-6"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white">{index + 1}</span><div><h3 className="font-extrabold text-ink">{step.title}</h3><p className="mt-2 leading-7 text-slate-600">{step.text}</p></div></article></Reveal>)}
            </div>
          </div>

          <Reveal className="mt-14 text-center">
            <p className="eyebrow">{pageCopy.video.eyebrow}</p>
            <h2 className="mt-3 text-balance text-2xl font-extrabold text-ink sm:text-3xl">{pageCopy.video.heading}</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">{pageCopy.video.description}</p>
            <div className="mt-7 overflow-hidden rounded-2xl border border-blue-100 bg-ink shadow-xl">
              <video controls playsInline preload="metadata" className="aspect-video h-auto w-full bg-ink" aria-label={pageCopy.video.demoLabel}>
                <source src="/demo-consultation.mp4" type="video/mp4" />
                {pageCopy.video.unsupported}
              </video>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-500">{pageCopy.video.demoLabel}</p>
          </Reveal>

          <Reveal className="mt-14 rounded-[2rem] border border-green-200 bg-green-50 p-6 text-center sm:p-9" delay={100}>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{pageCopy.whatsapp.heading}</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">{pageCopy.whatsapp.text}</p>
            <a href={getWhatsappUrl(language)} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-green-600 px-7 py-3 text-center text-base font-extrabold text-white shadow-lg shadow-green-900/20 transition duration-200 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-green-200 sm:w-auto sm:px-9 sm:text-lg"><MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />{pageCopy.whatsapp.cta}</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
