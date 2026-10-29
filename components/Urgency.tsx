"use client";

import { ArrowRight, CalendarDays } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";

export function Urgency() {
  const { copy } = useI18n();
  return (
    <section className="bg-white py-16 sm:py-20"><div className="container-page"><Reveal><div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-12 text-center text-white shadow-2xl shadow-blue-900/20 sm:px-12 sm:py-14"><div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border-[40px] border-white/5" /><p className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-100 sm:text-sm"><CalendarDays className="h-5 w-5" aria-hidden="true" />{copy.urgency.eyebrow}</p><h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{copy.urgency.heading}</h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100">{copy.urgency.text}</p><a href="#form" className="light-cta mt-8 w-full sm:w-auto">{copy.urgency.cta}<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></a></div></Reveal></div></section>
  );
}
