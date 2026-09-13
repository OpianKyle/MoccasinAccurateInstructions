import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, Check, ChevronDown, Menu, Play, Quote, Sparkles, X } from 'lucide-react';

const modules = [
  { no: '01', title: 'The Speaker’s Foundation', copy: 'Build the inner authority that makes your words land before you ever take the mic.' },
  { no: '02', title: 'Clarity That Converts', copy: 'Turn what you know into a sharp point of view people can instantly understand.' },
  { no: '03', title: 'The Camera Is a Person', copy: 'Find your natural on-screen presence and stop performing at the lens.' },
  { no: '04', title: 'Stories With Stakes', copy: 'Use narrative tension to make your offer memorable, human and hard to ignore.' },
  { no: '05', title: 'The Stagecraft', copy: 'Own the room with movement, pace, pauses and a presence that reads from the back row.' },
  { no: '06', title: 'The Sales Conversation', copy: 'Speak about your work with calm conviction — without the awkward pitch voice.' },
  { no: '07', title: 'Your Signature Talk', copy: 'Assemble a talk you can deliver again and again, on camera or under lights.' },
];

const faqs = [
  ['Is this for beginners?', 'Yes. StageMaster starts at the foundations and gives you a repeatable way to practice. You do not need a stage, an audience or a polished personal brand to begin.'],
  ['How do I access the course?', 'After checkout, you receive immediate access to the seven lessons, workbook and cheat sheets. Learn at your own pace from any device.'],
  ['What is included with Reseller Rights?', 'The $147 license includes the complete StageMaster product and full reseller rights, so you can package and sell it as part of your own offer.'],
  ['How quickly will I feel more confident?', 'Most students notice a difference in their next recording. The deeper shift comes from using the practice prompts consistently across the seven modules.'],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleCheckout(tier: 'personal' | 'reseller') {
  const checkoutUrl = tier === 'personal'
    ? import.meta.env.VITE_WHOP_PERSONAL_CHECKOUT_URL
    : import.meta.env.VITE_WHOP_RESELLER_CHECKOUT_URL;
  if (checkoutUrl) window.location.assign(checkoutUrl);
  else scrollToId('pricing');
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="grain min-h-[100dvh] bg-[var(--paper)]">
      <header className={`site-nav fixed inset-x-0 top-0 z-20 text-white ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-5 lg:px-12">
          <button onClick={() => scrollToId('top')} data-testid="button-logo" className="flex items-center gap-3 text-left">
            <span className="grid h-9 w-9 place-items-center border border-[var(--gold)] text-sm font-bold text-[var(--gold)]">SM</span>
            <span className="display-font text-sm font-bold uppercase tracking-[.17em]">Stage<span className="text-[var(--gold)]">Master</span></span>
          </button>
          <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[.18em] md:flex">
            <button onClick={() => scrollToId('method')} data-testid="link-method" className="line-link">The method</button>
            <button onClick={() => scrollToId('inside')} data-testid="link-inside" className="line-link">Inside the course</button>
            <button onClick={() => scrollToId('pricing')} data-testid="link-pricing" className="line-link">Pricing</button>
          </nav>
          <button onClick={() => scrollToId('pricing')} data-testid="button-nav-cta" className="hidden items-center gap-3 bg-[var(--gold)] px-5 py-3 text-[10px] font-bold uppercase tracking-[.16em] text-[var(--navy)] transition hover:bg-[#e8c574] md:flex">
            Get StageMaster <ArrowRight size={14} />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu" className="md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {menuOpen && <div className="border-t border-white/10 bg-[var(--navy)] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5 text-xs font-semibold uppercase tracking-[.18em]">
            {['method', 'inside', 'pricing'].map((id) => <button key={id} onClick={() => { setMenuOpen(false); scrollToId(id); }} data-testid={`link-mobile-${id}`} className="text-left">{id === 'inside' ? 'Inside the course' : id === 'method' ? 'The method' : 'Pricing'}</button>)}
            <button onClick={() => { setMenuOpen(false); scrollToId('pricing'); }} data-testid="button-mobile-cta" className="btn-gold mt-1 px-4 py-3 text-left">Start speaking with intention <ArrowRight className="ml-2 inline" size={14} /></button>
          </div>
        </div>}
      </header>

      <main id="top">
        <section className="relative isolate flex min-h-[760px] items-end overflow-hidden bg-[var(--navy)] pb-16 pt-32 text-white sm:min-h-[850px] lg:min-h-[900px] lg:pb-24">
          <img src="/stage-master-hero.png" alt="Confident speaker addressing an audience under warm stage lights" className="hero-image absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center]" />
          <div className="hero-sheen absolute inset-0 -z-10" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-[var(--navy)] to-transparent" />
          <div className="mx-auto w-full max-w-[1380px] px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="reveal mb-7 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.28em] text-[var(--gold)]"><span className="h-px w-12 bg-[var(--gold)]" />A speaking system for people with something to say</div>
              <h1 className="reveal reveal-delay-1 display-font max-w-4xl text-5xl font-extrabold leading-[.96] sm:text-7xl lg:text-[6.9rem]">Make your <span className="text-[var(--gold)]">voice</span><br />the reason they stay.</h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-xl text-lg leading-relaxed text-slate-200 sm:text-xl">StageMaster is the practical path from “I know my stuff” to speaking with confidence on camera, on stages and in the sales conversations that grow your business.</p>
              <div className="reveal reveal-delay-3 mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <button onClick={() => handleCheckout('personal')} data-testid="button-hero-buy" className="btn-gold flex items-center gap-4 px-7 py-4 text-xs font-bold uppercase tracking-[.15em]">Start StageMaster <ArrowRight size={16} /></button>
                <button onClick={() => scrollToId('inside')} data-testid="button-hero-inside" className="btn-outline flex items-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-[.15em]"><Play size={14} fill="currentColor" /> See what’s inside</button>
              </div>
            </div>
            <div className="reveal reveal-delay-3 mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-5 text-[10px] font-semibold uppercase tracking-[.19em] text-slate-300">
              <span>7 video lessons</span><span>Workbook + cheat sheets</span><span>Lifetime access</span>
            </div>
          </div>
          <div className="absolute bottom-8 right-6 hidden items-center gap-3 text-[10px] uppercase tracking-[.2em] text-white/65 lg:flex"><span className="vertical-label">Scroll to find your voice</span><ArrowDown size={15} className="text-[var(--gold)]" /></div>
        </section>

        <section id="method" className="relative overflow-hidden bg-[var(--paper)] py-24 lg:py-36">
          <div className="mx-auto grid max-w-[1380px] items-center gap-16 px-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 lg:px-12">
            <div className="reveal relative">
              <div className="absolute -left-6 top-3 h-28 w-px bg-[var(--gold)]" />
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[.26em] text-[var(--blue)]">The StageMaster method</p>
              <h2 className="display-font max-w-xl text-4xl font-extrabold leading-[1.02] sm:text-6xl">Confidence is not a personality trait.</h2>
              <p className="mt-8 max-w-lg text-base leading-8 text-slate-600">It is a skill you can rehearse. StageMaster replaces vague advice with a clear framework for what to say, how to say it and why people remember it.</p>
              <button onClick={() => scrollToId('pricing')} data-testid="button-method-cta" className="mt-9 flex items-center gap-3 text-xs font-bold uppercase tracking-[.17em] text-[var(--blue-deep)]">Get the complete framework <ArrowRight size={16} /></button>
            </div>
            <div className="reveal reveal-delay-1 grid grid-cols-2 gap-px bg-[var(--line)]">
              {[
                ['01', 'Clarity', 'Know your point before you reach for the polish.'],
                ['02', 'Connection', 'Make the person watching feel like you see them.'],
                ['03', 'Command', 'Use the room, the lens and the pause on purpose.'],
                ['04', 'Conversion', 'Let your message make the next step feel obvious.'],
              ].map(([no, title, copy]) => <div key={no} className="group bg-[var(--paper)] p-6 sm:p-9">
                <span className="number-outline display-font text-4xl font-bold">{no}</span>
                <h3 className="mt-8 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
                <div className="mt-7 h-px w-8 bg-[var(--gold)] transition-all group-hover:w-16" />
              </div>)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[var(--navy)] py-24 text-white lg:py-32">
          <div className="mx-auto grid max-w-[1380px] items-center gap-12 px-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-24 lg:px-12">
            <div className="reveal order-2 lg:order-1">
              <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--gold)]">For the online entrepreneur</p>
              <h2 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.02] sm:text-6xl">You built the business.<br /><span className="text-[var(--gold)]">Now be seen leading it.</span></h2>
              <p className="mt-8 max-w-lg text-base leading-8 text-slate-300">Your expertise already has value. The gap is often the moment you hit record, step onto a stage or hear yourself explain the offer out loud. This is where that gap closes.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                {['Camera confidence', 'Keynote presence', 'Sales conversations'].map((item) => <span key={item} className="border border-white/20 px-4 py-2 text-xs text-slate-200">{item}</span>)}
              </div>
            </div>
            <div className="reveal reveal-delay-1 order-1 lg:order-2">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -bottom-5 -left-5 h-full w-full border border-[var(--gold)]/50" />
                <img src="/stage-master-coach.png" alt="StageMaster coach in a recording studio" className="relative aspect-[4/5] w-full object-cover object-center" />
                <div className="absolute bottom-5 left-5 bg-[var(--gold)] px-4 py-3 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--navy)]">The work is in the reps</div>
              </div>
            </div>
          </div>
        </section>

        <section id="inside" className="bg-[#e9edf1] py-24 lg:py-36">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
            <div className="reveal flex flex-col justify-between gap-6 border-b border-[var(--line)] pb-10 sm:flex-row sm:items-end">
              <div><p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--blue)]">Inside the course</p><h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.03] sm:text-6xl">Seven lessons.<br /><span className="text-[var(--blue)]">One unmistakable voice.</span></h2></div>
              <p className="max-w-xs text-sm leading-6 text-slate-600">Short, focused lessons you can put into practice before your next post, pitch or presentation.</p>
            </div>
            <div className="mt-3">
              {modules.map((module, index) => <div key={module.no} className={`reveal reveal-delay-${Math.min(index % 4, 3)} group grid grid-cols-[48px_1fr] items-center gap-4 border-b border-[var(--line)] py-7 transition-colors hover:bg-white/60 sm:grid-cols-[80px_1fr_1fr_24px] sm:gap-6`}>
                <span className="display-font text-sm font-bold text-[var(--gold)]">{module.no}</span>
                <h3 className="text-xl font-bold sm:text-2xl">{module.title}</h3>
                <p className="col-start-2 max-w-md text-sm leading-6 text-slate-600 sm:col-start-auto">{module.copy}</p>
                <ArrowRight size={17} className="hidden text-[var(--blue)] transition-transform group-hover:translate-x-2 sm:block" />
              </div>)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[var(--gold)] py-20">
          <div className="absolute -right-20 -top-32 text-[260px] font-black leading-none text-white/10">“</div>
          <div className="relative mx-auto grid max-w-[1380px] gap-10 px-6 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:px-12">
            <p className="reveal text-[10px] font-bold uppercase tracking-[.26em] text-[var(--navy)]">A better kind of practice</p>
            <blockquote className="reveal reveal-delay-1 max-w-3xl text-3xl font-bold leading-tight text-[var(--navy)] sm:text-5xl">“You don’t need to become a different person to speak well. You need a structure that lets the real you come through.”</blockquote>
          </div>
        </section>

        <section className="bg-[var(--paper)] py-24 lg:py-36">
          <div className="mx-auto grid max-w-[1380px] items-center gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:px-12">
            <div className="reveal relative">
              <img src="/stage-master-workbook.png" alt="StageMaster workbook, cue cards and pen on a desk" className="aspect-[4/3] w-full object-cover shadow-premium" />
              <div className="absolute -bottom-6 -right-4 bg-[var(--blue)] px-6 py-5 text-white sm:-right-8"><div className="text-3xl font-extrabold">7 + 7</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[.19em] text-blue-100">lessons + practical tools</div></div>
            </div>
            <div className="reveal reveal-delay-1">
              <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--green)]">More than watching</p>
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.04] sm:text-6xl">Your voice gets stronger when you use it.</h2>
              <p className="mt-7 text-base leading-8 text-slate-600">Alongside each lesson, you get a workbook and cheat sheets designed to get you out of passive learning and into the next real conversation.</p>
              <ul className="mt-8 space-y-4 text-sm font-semibold">
                {['Reflection prompts that sharpen your message', 'On-camera drills for your next recording', 'A signature talk outline you can keep refining'].map((item) => <li key={item} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--green)] text-white"><Check size={14} /></span>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[var(--navy)] py-24 text-white lg:py-36">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
            <div className="reveal text-center"><p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--gold)]">Choose your next stage</p><h2 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold leading-[1.03] sm:text-6xl">A small investment in a bigger presence.</h2><p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-slate-300">Start with the skills. Leave with a voice people can recognize, trust and remember.</p></div>
            <div className="mx-auto mt-14 grid max-w-4xl gap-5 lg:grid-cols-2">
              <div className="pricing-card reveal reveal-delay-1 border border-white/20 bg-white/[.06] p-7 sm:p-9">
                <div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-slate-300">Personal use</p><h3 className="mt-4 text-2xl font-bold">StageMaster</h3></div><Sparkles className="text-[var(--gold)]" size={21} /></div>
                <div className="mt-7 flex items-end gap-2"><span className="text-6xl font-extrabold">$47</span><span className="pb-2 text-sm text-slate-400">one time</span></div>
                <ul className="mt-7 space-y-3 border-t border-white/15 pt-6 text-sm text-slate-200">{['7 video lessons', 'StageMaster workbook', 'Practical cheat sheets', 'Lifetime personal access'].map((item) => <li key={item} className="flex items-center gap-3"><Check size={15} className="text-[var(--gold)]" />{item}</li>)}</ul>
                <button onClick={() => handleCheckout('personal')} data-testid="button-buy-personal" className="btn-gold mt-9 flex w-full items-center justify-between px-5 py-4 text-xs font-bold uppercase tracking-[.15em]">Get personal access <ArrowRight size={16} /></button>
              </div>
              <div className="pricing-card reveal reveal-delay-2 relative border-2 border-[var(--gold)] bg-[#f5f1e7] p-7 text-[var(--navy)] sm:p-9">
                <span className="absolute right-6 top-0 -translate-y-1/2 bg-[var(--gold)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.18em]">Best for business</span>
                <div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--blue)]">Full reseller rights</p><h3 className="mt-4 text-2xl font-bold">StageMaster Pro</h3></div><Sparkles className="text-[var(--blue)]" size={21} /></div>
                <div className="mt-7 flex items-end gap-2"><span className="text-6xl font-extrabold">$147</span><span className="pb-2 text-sm text-slate-500">one time</span></div>
                <ul className="mt-7 space-y-3 border-t border-[var(--navy)]/15 pt-6 text-sm">{['Everything in Personal Use', 'Full reseller rights', 'Sell it as part of your own offer', 'Keep 100% of your sales'].map((item) => <li key={item} className="flex items-center gap-3"><Check size={15} className="text-[var(--green)]" />{item}</li>)}</ul>
                <button onClick={() => handleCheckout('reseller')} data-testid="button-buy-reseller" className="mt-9 flex w-full items-center justify-between bg-[var(--blue)] px-5 py-4 text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-[var(--blue-deep)]">Get reseller rights <ArrowRight size={16} /></button>
              </div>
            </div>
            <p className="mt-8 text-center text-[10px] uppercase tracking-[.15em] text-slate-400">Secure checkout hosted by Whop · Instant digital access</p>
          </div>
        </section>

        <section className="bg-[var(--paper)] py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1000px] gap-14 px-6 lg:grid-cols-[.75fr_1.25fr] lg:px-12">
            <div className="reveal"><p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--blue)]">Questions, answered</p><h2 className="mt-5 text-4xl font-extrabold leading-[1.04] sm:text-5xl">Before you take the mic.</h2></div>
            <div className="reveal reveal-delay-1">
              {faqs.map(([question, answer], index) => <div key={question} className="border-b border-[var(--line)]">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} data-testid={`button-faq-${index}`} className="flex w-full items-center justify-between gap-5 py-6 text-left text-base font-bold"><span>{question}</span><ChevronDown size={18} className={`shrink-0 text-[var(--blue)] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>
                <div className={`faq-content ${openFaq === index ? 'is-open' : ''}`}><div className="faq-inner"><p className="pb-6 pr-8 text-sm leading-7 text-slate-600">{answer}</p></div></div>
              </div>)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[var(--blue)] py-24 text-white lg:py-32">
          <div className="absolute -right-20 top-10 text-[300px] font-black leading-none text-white/[.07]">SM</div>
          <div className="relative mx-auto max-w-[900px] px-6 text-center lg:px-12">
            <Quote className="mx-auto text-[var(--gold)]" size={30} />
            <h2 className="reveal mt-7 text-4xl font-extrabold leading-[1.04] sm:text-6xl">The room is waiting<br />for your version of the story.</h2>
            <p className="reveal reveal-delay-1 mx-auto mt-7 max-w-xl text-base leading-7 text-blue-100">You do not need more permission. You need a message, a method and the courage to press record.</p>
            <button onClick={() => handleCheckout('personal')} data-testid="button-final-cta" className="btn-gold reveal reveal-delay-2 mx-auto mt-9 flex items-center gap-4 px-7 py-4 text-xs font-bold uppercase tracking-[.15em]">Start StageMaster <ArrowRight size={16} /></button>
          </div>
        </section>
      </main>
      <footer className="bg-[var(--navy)] px-6 py-8 text-white lg:px-12">
        <div className="mx-auto flex max-w-[1380px] flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="display-font text-sm font-bold uppercase tracking-[.17em]">Stage<span className="text-[var(--gold)]">Master</span></div>
          <p className="text-[10px] uppercase tracking-[.16em] text-slate-400">Mastering public speaking for online entrepreneurs</p>
          <button onClick={() => scrollToId('top')} data-testid="button-back-top" className="text-[10px] font-bold uppercase tracking-[.16em] text-[var(--gold)]">Back to top ↑</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
