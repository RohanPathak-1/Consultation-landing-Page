"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { CountryCode } from "libphonenumber-js";
import { useI18n } from "@/components/I18nProvider";
import { InternationalPhoneField } from "@/components/InternationalPhoneField";
import { Reveal } from "@/components/Reveal";
import { DEMO_COMPLETION_KEY } from "@/lib/demoFlow";
import { normalizeWhatsappNumber } from "@/lib/phone";

type FormData = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  website?: string;
  message?: string;
};

const inputClass = "mt-2 min-h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-blue-100 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-100";

export function CTAForm() {
  const router = useRouter();
  const { language, copy } = useI18n();
  const [country, setCountry] = useState<CountryCode>("NP");
  const formCopy = copy.form;

  const schema = useMemo(() => z.object({
    fullName: z.string().trim().min(2, formCopy.errors.fullName),
    email: z.string().trim().email(formCopy.errors.email),
    whatsapp: z.string().trim().min(1, formCopy.errors.whatsapp),
    businessName: z.string().trim().min(2, formCopy.errors.businessName),
    website: z.string().trim().refine((value) => !value || /^https?:\/\/.+/i.test(value), formCopy.errors.website).optional(),
    message: z.string().trim().optional(),
  }), [formCopy]);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
  });

  const onSubmit = (data: FormData) => {
    const normalizedWhatsapp = normalizeWhatsappNumber(data.whatsapp, country);

    if (!normalizedWhatsapp) {
      setError("whatsapp", { type: "validate", message: formCopy.errors.whatsapp }, { shouldFocus: true });
      return;
    }

    window.sessionStorage.setItem(DEMO_COMPLETION_KEY, "true");
    router.push("/thank-you", { scroll: true });
  };

  return (
    <section id="form" className="section-space bg-soft">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <Reveal className="lg:sticky lg:top-8">
          <p className="eyebrow">{formCopy.eyebrow}</p><h2 className="section-title">{formCopy.heading}</h2><p className="mt-4 text-lg leading-8 text-slate-600">{formCopy.subheading}</p>
          <div className="mt-7 flex flex-wrap gap-2">{formCopy.chips.map((chip) => <span key={chip} className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-brand">{chip}</span>)}</div>
        </Reveal>

        <Reveal delay={100}>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-soft sm:p-8 lg:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label={formCopy.fields.fullName.label} name="fullName" error={errors.fullName?.message} requiredLabel={formCopy.required}><input {...register("fullName")} id="fullName" autoComplete="name" placeholder={formCopy.fields.fullName.placeholder} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} className={inputClass} /></FormField>
              <FormField label={formCopy.fields.email.label} name="email" error={errors.email?.message} requiredLabel={formCopy.required}><input {...register("email")} id="email" type="email" inputMode="email" autoComplete="email" placeholder={formCopy.fields.email.placeholder} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={inputClass} /></FormField>
              <div className="sm:col-span-2"><FormField label={formCopy.fields.whatsapp.label} name="whatsapp" error={errors.whatsapp?.message} requiredLabel={formCopy.required}><InternationalPhoneField country={country} onCountryChange={setCountry} language={language} labels={{ country: formCopy.fields.country.label, search: formCopy.fields.country.search, noResults: formCopy.fields.country.noResults }} input={<input {...register("whatsapp")} id="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder={formCopy.fields.whatsapp.placeholder} aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined} className="min-h-14 min-w-0 flex-1 rounded-r-xl px-3 text-base text-ink outline-none placeholder:text-slate-400 sm:px-4" />} /></FormField></div>
              <FormField label={formCopy.fields.businessName.label} name="businessName" error={errors.businessName?.message} requiredLabel={formCopy.required}><input {...register("businessName")} id="businessName" autoComplete="organization" placeholder={formCopy.fields.businessName.placeholder} aria-invalid={Boolean(errors.businessName)} aria-describedby={errors.businessName ? "businessName-error" : undefined} className={inputClass} /></FormField>
              <FormField label={formCopy.fields.website.label} name="website" error={errors.website?.message}><input {...register("website")} id="website" type="url" inputMode="url" autoComplete="url" placeholder={formCopy.fields.website.placeholder} aria-invalid={Boolean(errors.website)} aria-describedby={errors.website ? "website-error" : undefined} className={inputClass} /></FormField>
              <div className="sm:col-span-2"><FormField label={formCopy.fields.message.label} name="message" error={errors.message?.message}><textarea {...register("message")} id="message" rows={4} placeholder={formCopy.fields.message.placeholder} className={`${inputClass} min-h-32 py-4`} /></FormField></div>
            </div>
            <button type="submit" className="primary-cta mt-7 w-full">{formCopy.submit}<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></button>
            <p className="mt-4 flex items-start justify-center gap-2 text-center text-sm font-semibold leading-6 text-slate-500"><LockKeyhole className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />{formCopy.trust}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FormField({ label, name, error, requiredLabel, children }: { label: string; name: string; error?: string; requiredLabel?: string; children: React.ReactNode }) {
  return <div><label htmlFor={name} className="text-sm font-extrabold text-ink">{label}{requiredLabel && <><span className="ml-1 text-brand" aria-hidden="true">*</span><span className="sr-only"> ({requiredLabel})</span></>}</label>{children}{error && <p id={`${name}-error`} role="alert" className="mt-2 text-sm font-semibold text-red-600">{error}</p>}</div>;
}
