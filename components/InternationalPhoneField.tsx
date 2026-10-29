"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { CountryCode, getCountries, getCountryCallingCode } from "libphonenumber-js";
import { Language } from "@/lib/content";

function countryFlag(code: string) {
  return code.replace(/./g, (letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)));
}

export function InternationalPhoneField({
  country,
  onCountryChange,
  language,
  labels,
  input,
}: {
  country: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  language: Language;
  labels: { country: string; search: string; noResults: string };
  input: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const countryNames = useMemo(() => {
    const displayNames = new Intl.DisplayNames([language === "ne" ? "ne" : "en"], { type: "region" });
    return getCountries()
      .map((code) => ({ code, name: displayNames.of(code) || code, callingCode: getCountryCallingCode(code) }))
      .sort((a, b) => a.name.localeCompare(b.name, language === "ne" ? "ne" : "en"));
  }, [language]);

  const selected = countryNames.find((item) => item.code === country) || countryNames[0];
  const filtered = countryNames.filter((item) => `${item.name} ${item.code} ${item.callingCode}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative mt-2 flex min-h-14 w-full rounded-xl border border-slate-300 bg-white focus-within:border-brand focus-within:ring-4 focus-within:ring-blue-100">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${labels.country}: ${selected.name} +${selected.callingCode}`}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-14 shrink-0 items-center gap-2 rounded-l-xl border-r border-slate-200 px-3 text-sm font-bold text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand sm:px-4"
      >
        <span className="text-xl" aria-hidden="true">{countryFlag(selected.code)}</span>
        <span>+{selected.callingCode}</span>
        <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
      </button>
      {input}

      {open && (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-full min-w-[290px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:w-[420px]">
          <div className="border-b border-slate-100 p-3">
            <label className="relative block">
              <span className="sr-only">{labels.search}</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} autoFocus placeholder={labels.search} className="min-h-12 w-full rounded-xl border border-slate-300 pl-10 pr-3 text-base outline-none focus:border-brand focus:ring-4 focus:ring-blue-100" />
            </label>
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto p-2">
            {filtered.length ? filtered.map((item) => (
              <li key={item.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={country === item.code}
                  onClick={() => { onCountryChange(item.code); setOpen(false); setQuery(""); }}
                  className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition hover:bg-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="text-xl" aria-hidden="true">{countryFlag(item.code)}</span>
                  <span className="min-w-0 flex-1 truncate font-semibold text-ink">{item.name}</span>
                  <span className="text-slate-500">+{item.callingCode}</span>
                  {country === item.code && <Check className="h-4 w-4 text-brand" aria-hidden="true" />}
                </button>
              </li>
            )) : <li className="p-5 text-center text-sm text-slate-500">{labels.noResults}</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
