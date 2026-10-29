"use client";

import { ArrowRight, Check } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";

export function Benefits() {
  const { copy } = useI18n();
  return (
    <section className="section-space bg-white">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
        <Reveal><p className="eyebrow">{copy.benefits.eyebrow}</p><h2 className="section-title">{copy.benefits.heading}</h2><a href="#form" className="primary-cta mt-8 hidden lg:inline-flex">{copy.benefits.cta}<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></a></Reveal>
        <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-soft to-white p-5 shadow-soft sm:p-8"><ul className="space-y-3">{copy.benefits.items.map((item, index) => <Reveal key={item} delay={index * 70}><li tabIndex={0} className="blue-hover-card interactive-card flex gap-4 rounded-2xl border border-transparent bg-white/80 p-4 sm:p-5"><span className="benefit-check flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white transition"><Check className="h-5 w-5" strokeWidth={3} aria-hidden="true" /></span><span className="pt-1 font-semibold leading-7 text-slate-700">{item}</span></li></Reveal>)}</ul></div>
        <a href="#form" className="primary-cta w-full lg:hidden">{copy.benefits.cta}<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></a>
      </div>
    </section>
  );
}
