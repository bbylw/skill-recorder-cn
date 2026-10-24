import { useReveal } from './lib/reveal';
import { Hero, SiteNav } from './sections/Hero';
import { HowItWorks } from './sections/HowItWorks';
import { Showcase } from './sections/Showcase';
import { Features } from './sections/Features';
import { Capture } from './sections/Capture';
import { Faq } from './sections/Faq';
import { Install } from './sections/Install';
import { Cta } from './sections/Cta';
import { Foot } from './sections/Foot';

export default function App() {
  useReveal();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        跳到主要内容
      </a>

      <span id="top" />
      <SiteNav />
      <Hero />

      <main id="main">
        <HowItWorks />
        <Showcase />
        <Features />
        <Capture />
        <Faq />
        <Install />
        <Cta />
      </main>

      <Foot />
    </>
  );
}
