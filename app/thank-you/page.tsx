import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ThankYouContent } from "@/components/ThankYouContent";
import { siteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: `Thank You | ${siteContent.title}`,
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <main className="min-h-screen overflow-hidden bg-soft"><Header /><ThankYouContent /></main>;
}
