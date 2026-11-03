"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { CountryCode } from "libphonenumber-js";
import { useI18n } from "@/components/I18nProvider";
import { InternationalPhoneField } from "@/components/InternationalPhoneField";
import { Reveal } from "@/components/Reveal";
import { DEMO_COMPLETION_KEY } from "@/lib/demoFlow";
import { normalizeWhatsappNumber } from "@/lib/phone";

const FLODESK_FORM_ID = "6ae9c2d2d7770f548c26cb8e";
const FLODESK_ROOT_SELECTOR = `.ff-${FLODESK_FORM_ID}`;
const FLODESK_SUBMIT_URL = `https://form.flodesk.com/forms/${FLODESK_FORM_ID}/submit`;
const flodeskClass = `ff-${FLODESK_FORM_ID}`;
const FLODESK_CONFIG =
  "eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJyZWRpcmVjdCIsIm1lc3NhZ2UiOiIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vY29uc3VsdGF0aW9uLnJvaGFuLXBhdGhhay5jb20ubnAvdGhhbmsteW91In0sImNvaSI6ZmFsc2UsInNob3dGb3JSZXR1cm5WaXNpdG9ycyI6dHJ1ZSwibm90aWZpY2F0aW9uIjpmYWxzZSwiZ2RwciI6eyJhY2NlcHRzTWFya2V0aW5nIjpmYWxzZSwicHJpdmFjeVBvbGljeSI6eyJlbmFibGVkIjpmYWxzZSwibWFuZGF0b3J5IjpmYWxzZX19LCJ0cmFja2luZ0NvbmZpZyI6eyJtZXRhUGl4ZWxJZCI6IiIsImNvb2tpZUJhbm5lckVuYWJsZWQiOmZhbHNlLCJnb29nbGVBbmFseXRpY3NJZCI6IiJ9fQ==";

type FlodeskFunction = ((...args: unknown[]) => void) & { q?: unknown[][] };

type FlodeskWindow = Window & {
  FlodeskObject?: string;
  fd?: FlodeskFunction;
};

const inputClass = "mt-2 min-h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-blue-100 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-100";

function loadFlodeskForm() {
  const flodeskWindow = window as FlodeskWindow;
  flodeskWindow.FlodeskObject = "fd";

  if (!flodeskWindow.fd) {
    const queue: FlodeskFunction = (...args: unknown[]) => {
      queue.q = queue.q || [];
      queue.q.push(args);
    };
    flodeskWindow.fd = queue;
  }

  if (!document.querySelector('script[data-flodesk-universal="module"]')) {
    const version = `?v=${Math.floor(Date.now() / 120000) * 60}`;
    const moduleScript = document.createElement("script");
    moduleScript.async = true;
    moduleScript.type = "module";
    moduleScript.src = `https://assets.flodesk.com/universal.mjs${version}`;
    moduleScript.dataset.flodeskUniversal = "module";
    document.head.appendChild(moduleScript);

    const legacyScript = document.createElement("script");
    legacyScript.async = true;
    legacyScript.noModule = true;
    legacyScript.src = `https://assets.flodesk.com/universal.js${version}`;
    legacyScript.dataset.flodeskUniversal = "legacy";
    document.head.appendChild(legacyScript);
  }

  flodeskWindow.fd?.("form:handle", {
    formId: FLODESK_FORM_ID,
    rootEl: FLODESK_ROOT_SELECTOR,
  });
}

export function CTAForm() {
  const { language, copy } = useI18n();
  const [country, setCountry] = useState<CountryCode>("NP");
  const [whatsappError, setWhatsappError] = useState<string>();
  const formCopy = copy.form;

  useEffect(() => {
    loadFlodeskForm();
  }, []);

  const validateBeforeFlodesk = (event: FormEvent<HTMLFormElement>) => {
    const whatsappInput = event.currentTarget.elements.namedItem("fields.whatsappNumber") as HTMLInputElement | null;
    const normalizedWhatsapp = normalizeWhatsappNumber(whatsappInput?.value ?? "", country);

    if (!normalizedWhatsapp) {
      event.preventDefault();
      event.stopPropagation();
      setWhatsappError(formCopy.errors.whatsapp);
      whatsappInput?.focus();
      return;
    }

    if (whatsappInput) {
      whatsappInput.value = normalizedWhatsapp;
    }

    setWhatsappError(undefined);
    window.sessionStorage.setItem(DEMO_COMPLETION_KEY, "true");
  };

  return (
    <section id="form" className="section-space bg-soft">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <Reveal className="lg:sticky lg:top-8">
          <p className="eyebrow">{formCopy.eyebrow}</p><h2 className="section-title">{formCopy.heading}</h2><p className="mt-4 text-lg leading-8 text-slate-600">{formCopy.subheading}</p>
          <div className="mt-7 flex flex-wrap gap-2">{formCopy.chips.map((chip) => <span key={chip} className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-brand">{chip}</span>)}</div>
        </Reveal>

        <Reveal delay={100}>
          <div className={`ff-${FLODESK_FORM_ID}`} data-ff-el="root" data-ff-version="3" data-ff-type="inline" data-ff-name="inlineNoImage" data-ff-stage="default">
            <div data-ff-el="config" data-ff-config={FLODESK_CONFIG} hidden />
            <form
              action={FLODESK_SUBMIT_URL}
              method="post"
              data-ff-el="form"
              onSubmitCapture={validateBeforeFlodesk}
              className={`${flodeskClass}__form rounded-[2rem] border border-blue-100 bg-white p-5 shadow-soft sm:p-8 lg:p-10`}
            >
              <div data-ff-el="content" className={`${flodeskClass}__content fd-form-content`}>
                <div data-ff-el="fields" className={`${flodeskClass}__fields grid gap-5 sm:grid-cols-2`}>
                  <FormField label={formCopy.fields.fullName.label} name="fullName" requiredLabel={formCopy.required}><input id="fullName" name="fields.fullName" type="text" minLength={2} maxLength={255} autoComplete="name" placeholder={formCopy.fields.fullName.placeholder} required className={`${flodeskClass}__control fd-form-control ${inputClass}`} /></FormField>
                  <FormField label={formCopy.fields.email.label} name="email" requiredLabel={formCopy.required}><input id="email" name="email" type="email" inputMode="email" maxLength={255} autoComplete="email" placeholder={formCopy.fields.email.placeholder} required className={`${flodeskClass}__control fd-form-control ${inputClass}`} /></FormField>
                  <div className="sm:col-span-2"><FormField label={formCopy.fields.whatsapp.label} name="whatsapp" error={whatsappError} requiredLabel={formCopy.required}><InternationalPhoneField country={country} onCountryChange={(nextCountry) => { setCountry(nextCountry); setWhatsappError(undefined); }} language={language} labels={{ country: formCopy.fields.country.label, search: formCopy.fields.country.search, noResults: formCopy.fields.country.noResults }} input={<input id="whatsapp" name="fields.whatsappNumber" type="tel" inputMode="tel" autoComplete="tel" maxLength={255} placeholder={formCopy.fields.whatsapp.placeholder} required aria-invalid={Boolean(whatsappError)} aria-describedby={whatsappError ? "whatsapp-error" : undefined} onChange={() => setWhatsappError(undefined)} className={`${flodeskClass}__control fd-form-control min-h-14 min-w-0 flex-1 rounded-r-xl px-3 text-base text-ink outline-none placeholder:text-slate-400 sm:px-4`} />} /></FormField></div>
                  <FormField label={formCopy.fields.businessName.label} name="businessName" requiredLabel={formCopy.required}><input id="businessName" name="fields.businessName" type="text" minLength={2} maxLength={255} autoComplete="organization" placeholder={formCopy.fields.businessName.placeholder} required className={`${flodeskClass}__control fd-form-control ${inputClass}`} /></FormField>
                  <FormField label={formCopy.fields.website.label} name="website"><input id="website" name="fields.websiteOrFacebookUrl" type="url" inputMode="url" maxLength={255} autoComplete="url" placeholder={formCopy.fields.website.placeholder} className={`${flodeskClass}__control fd-form-control ${inputClass}`} /></FormField>
                  <div className="sm:col-span-2"><FormField label={formCopy.fields.message.label} name="message" requiredLabel={formCopy.required}><textarea id="message" name="fields.anythingYouWantToSay" rows={4} maxLength={255} placeholder={formCopy.fields.message.placeholder} required className={`${flodeskClass}__control fd-form-control ${inputClass} min-h-32 py-4`} /></FormField></div>
                  <input type="text" name="confirm_email_address" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                </div>
                <div data-ff-el="footer" className={`${flodeskClass}__footer`}>
                  <button type="submit" data-ff-el="submit" className={`${flodeskClass}__button fd-btn primary-cta mt-7 w-full`}>{formCopy.submit}<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></button>
                </div>
                <p className="mt-4 flex items-start justify-center gap-2 text-center text-sm font-semibold leading-6 text-slate-500"><LockKeyhole className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />{formCopy.trust}</p>
              </div>
              <div data-ff-el="success" className="hidden" aria-live="polite" />
              <div data-ff-el="error" className="mt-4 text-center text-sm font-semibold text-red-600" role="alert" aria-live="polite" />
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FormField({ label, name, error, requiredLabel, children }: { label: string; name: string; error?: string; requiredLabel?: string; children: React.ReactNode }) {
  return <div className={`${flodeskClass}__field fd-form-group`}><label htmlFor={name} className={`${flodeskClass}__label text-sm font-extrabold text-ink`}>{label}{requiredLabel && <><span className="ml-1 text-brand" aria-hidden="true">*</span><span className="sr-only"> ({requiredLabel})</span></>}</label>{children}{error && <p id={`${name}-error`} role="alert" className="mt-2 text-sm font-semibold text-red-600">{error}</p>}</div>;
}
