"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";

export function Header() {
  const { language, setLanguage, copy } = useI18n();

  return (
    <header className="border-b border-white/10 bg-brand text-white">
      <div className="container-page flex flex-col items-center justify-between gap-3 py-4 sm:min-h-28 sm:flex-row sm:gap-4">
        <div className="mx-auto flex min-w-0 items-center gap-3 sm:mx-0 sm:gap-4">
          <Image src="/logo.png" alt={copy.header.logoAlt} width={88} height={64} priority className="h-12 w-auto shrink-0 object-contain sm:h-16" />
          <div className="min-w-0 border-l border-white/25 pl-3 sm:pl-4">
            <p className="truncate text-base font-extrabold leading-tight sm:text-xl">{copy.header.name}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.13em] text-blue-100 sm:text-xs">{copy.header.role}</p>
          </div>
        </div>

        <div className="mx-auto flex w-full shrink-0 items-center justify-center gap-1 rounded-full border border-white/25 bg-white/10 p-1 text-xs font-extrabold sm:mx-0 sm:w-auto sm:text-sm" role="group" aria-label={copy.language.label}>
          <button type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"} className="min-h-10 rounded-full px-3 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white aria-pressed:bg-white aria-pressed:text-brand">
            {copy.language.english}
          </button>
          <span className="text-blue-200" aria-hidden="true">|</span>
          <button type="button" lang="ne" onClick={() => setLanguage("ne")} aria-pressed={language === "ne"} className="min-h-10 rounded-full px-3 font-nepali transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white aria-pressed:bg-white aria-pressed:text-brand">
            {copy.language.nepali}
          </button>
        </div>
      </div>
    </header>
  );
}
