"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

export function Hero() {
  const { copy } = useI18n();

  return (
    <section className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_20%,rgba(1,54,206,0.13),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.28] [background-image:radial-gradient(#9fb5ef_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <div className="container-page grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
        <div className="hero-copy-enter min-w-0 text-center lg:text-left">
          <div className="flex w-full max-w-full items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-soft px-3 py-2 text-center text-xs font-extrabold uppercase leading-5 tracking-[0.08em] text-brand sm:inline-flex sm:w-auto sm:rounded-full sm:px-4 sm:text-sm">
            <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 break-words">{copy.hero.eyebrow}</span>
          </div>
          <h1 className="mx-auto mt-7 max-w-4xl break-words text-balance text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-ink sm:text-5xl lg:mx-0 lg:text-[3.5rem]">{copy.hero.hook}</h1>
          <h2 className="lead-magnet-enter mx-auto mt-6 max-w-3xl break-words text-balance rounded-2xl border border-blue-200 bg-soft/85 px-5 py-5 text-xl font-extrabold leading-[1.3] text-brand shadow-sm sm:text-2xl lg:mx-0 lg:text-[1.7rem]">
            {copy.hero.offerBefore}<span className="inline-block rounded-lg bg-brand px-2.5 py-1 text-white shadow-md shadow-blue-900/15">{copy.hero.offerFree}</span>{copy.hero.offerAfter}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mx-0">{copy.hero.description}</p>
          <a href="#form" className="primary-cta mt-8 w-full sm:w-auto">
            {copy.hero.cta}<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        <div className="hero-photo-enter mx-auto w-full max-w-[520px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-soft shadow-[0_28px_70px_-30px_rgba(1,54,206,0.45)]">
            <div className="relative aspect-square w-full">
              <Image src="/rohan-navy-suit.png" alt={copy.hero.photoAlt} fill priority sizes="(max-width: 1024px) 90vw, 42vw" className="object-contain" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent px-5 pb-5 pt-24 text-white sm:px-7 sm:pb-7">
                <div className="flex items-center gap-2 text-sm font-extrabold"><CheckCircle2 className="h-5 w-5 text-blue-300" aria-hidden="true" />{copy.hero.photoLabel}</div>
                <p className="mt-1 text-sm text-slate-200">{copy.hero.photoSubLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
