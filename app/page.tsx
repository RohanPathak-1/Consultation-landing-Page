import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Benefits } from "@/components/Benefits";
import { Process } from "@/components/Process";
import { Urgency } from "@/components/Urgency";
import { CTAForm } from "@/components/CTAForm";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Problem />
      <Benefits />
      <Process />
      <Urgency />
      <CTAForm />
    </main>
  );
}
