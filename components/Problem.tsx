"use client";

import { BarChart3, CircleDollarSign, Megaphone, Route } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";

const icons = [Megaphone, CircleDollarSign, Route, BarChart3];

export function Problem() {
  const { copy } = useI18n();
  return (
    <section className="section-space bg-soft">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center"><p className="eyebrow">{copy.problem.eyebrow}</p><h2 className="section-title">{copy.problem.heading}</h2></Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
          {copy.problem.items.map((item, index) => {
            const Icon = icons[index];
            return <Reveal key={item} delay={index * 80}><article tabIndex={0} className="blue-hover-card interactive-card group h-full rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-7"><div className="card-icon flex h-11 w-11 items-center justify-center rounded-xl bg-soft text-brand transition"><Icon className="h-6 w-6" aria-hidden="true" /></div><p className="mt-5 font-semibold leading-7 text-slate-700">{item}</p></article></Reveal>;
          })}
        </div>
        <Reveal delay={140}><p className="mx-auto mt-10 max-w-3xl text-center text-xl font-extrabold leading-8 text-ink sm:text-2xl">{copy.problem.closing}</p></Reveal>
      </div>
    </section>
  );
}
