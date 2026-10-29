import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

export function normalizeWhatsappNumber(input: string, country: CountryCode) {
  const value = input.trim();
  const parsed = value.startsWith("+")
    ? parsePhoneNumberFromString(value)
    : parsePhoneNumberFromString(value, country);

  if (!parsed || !parsed.isValid() || parsed.country !== country) return null;
  return parsed.number;
}
