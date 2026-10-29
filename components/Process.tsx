"use client";

import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";

export function Process() {
  const { copy } = useI18n();
  return (
    <section className="section-space border-y border-slate-100 bg-slate-50">
      <div className="container-page">
        <Reveal className="text-center"><p className="eyebrow">{copy.process.eyebrow}</p><h2 className="section-title">{copy.process.heading}</h2></Reveal>
        <div className="relative mt-14 grid gap-6 lg:grid-cols-3"><div className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-blue-200 lg:block" />{copy.process.steps.map((step, index) => <Reveal key={step.title} delay={index * 100}><article tabIndex={0} className="blue-hover-card interactive-card relative h-full rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-8"><div className="process-badge relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-xl font-extrabold text-white ring-8 ring-slate-50 transition">{index + 1}</div><p className="mt-6 text-xs font-extrabold uppercase tracking-[0.15em] text-brand">{copy.process.stepLabel} {index + 1}</p><h3 className="mt-2 text-xl font-extrabold text-ink">{step.title}</h3><p className="mt-3 leading-7 text-slate-600">{step.text}</p></article></Reveal>)}</div>
      </div>
    </section>
  );
}
