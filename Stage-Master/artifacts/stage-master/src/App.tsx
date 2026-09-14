import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, Check, ChevronDown, Menu, Play, Quote, Sparkles, X } from 'lucide-react';

const patterns = [
  ['01', 'Reframe', 'Kill the nerves in one sentence by renaming what you’re feeling.'],
  ['02', 'Confidence Anchor', 'A physical trigger that drops you into your best state on command.'],
  ['03', 'Presupposition', 'Bake the yes into the grammar. Say “when”, never “if”.'],
  ['04', 'Embedded Commands', 'Plant the instruction inside an ordinary sentence. They never see it.'],
  ['05', 'Analog Marking', 'Make one line unforgettable with sound alone. Slower. Lower. Silence.'],
  ['06', 'Auditory Pacing', 'Meet their energy, then drag it upward. Never open at your peak.'],
  ['07', 'State Transfer', 'Whatever you feel, they catch. Decide it before you hit record.'],
  ['08', 'Nested Loops', 'Open a story, hold the ending hostage, and they cannot leave.'],
  ['09', 'Submodality Shifts', 'Direct the movie in their head. Before: dark and tight. After: bright and close.'],
  ['10', 'Pace-and-Lead', 'Three truths they already believe — then the pivot they can’t argue with.'],
  ['11', 'Future Pacing', 'Let them own the result before you ever say the price.'],
  ['12', 'The Swish', 'Overwrite the old self-image. Identity first, behaviour follows.'],
];

const modules = [
  { no: '01', title: 'Own the Room in Your Head', copy: 'Walk in already calm. The 90-second reset that kills the shake before you hit record — and the identity flip that stops it coming back.', tool: 'The Reframe + The Confidence Anchor' },
  { no: '02', title: 'Message Architecture', copy: 'Build any talk in 15 minutes flat with the HPPP skeleton. One idea, impossible to misunderstand, impossible to forget.', tool: 'Presupposition + Embedded Commands' },
  { no: '03', title: 'Voice & Delivery', copy: 'The 4 Dials that separate a voice people obey from a voice people scroll past. Flat and rushed ends here.', tool: 'Analog Marking + Auditory Pacing' },
  { no: '04', title: 'Camera Presence & Body Language', copy: 'Stop looking stiff on camera. Eye line, framing, hands, and the energy calibration that survives a webcam.', tool: 'Rapport Building + State Transfer' },
  { no: '05', title: 'Storytelling That Sells', copy: 'Bank 4 stories once, deploy them forever. The arc that makes a stranger trust you in 90 seconds.', tool: 'Nested Loops + Submodality Shifts' },
  { no: '06', title: 'Speaking to Sell', copy: 'The 8-Beat Webinar Spine and the 60-second pitch. Ask for the money without the sleaze — and without flinching.', tool: 'Pace-and-Lead + The Yes-Set + Future Pacing' },
  { no: '07', title: 'The 30-Day Practice System', copy: 'Ten minutes a day until it’s reflex. This is the module that makes the other six permanent instead of interesting.', tool: 'The Swish Pattern + Identity-Level Change' },
];

const assets = [
  ['📘', 'The Complete Course PDF', 'All 7 modules, 40+ pages, zero padding. Frameworks and word-for-word examples you can copy straight into your next talk.'],
  ['🎬', '7 Narrated Video Lessons', '2–3 minutes each. Watch one on your phone, use the pattern in your next recording. No 4-hour lecture to sit through.'],
  ['🧠', 'The 12 NLP Patterns', 'Named, explained, drilled. Anchoring, embedded commands, nested loops, future pacing, the Swish — the stuff nobody teaches you.'],
  ['📝', 'The StageMaster Workbook', 'Fill-in drills for every pattern. This is where it stops being something you read and becomes something you can do.'],
  ['⚡', '6 Quick-Reference Cheat Sheets', 'Open one 5 minutes before you go live. Sheet #6 is all 12 patterns on a single page — print it and stick it by your camera.'],
  ['📊', '16-Slide Companion Deck', 'The whole system as an editable PowerPoint. Study from it, or strip it and present it as your own training.'],
  ['✉️', 'Bonus: The Swipe Files', 'All 7 lesson scripts word-for-word plus a 7-email sequence. Templates you can model tonight instead of writing from scratch.'],
];

const audiences = [
  ['Coaches & consultants', 'Stop “thinking about it” calls. Pace them, lead them, and ask for the money without your voice going thin.'],
  ['Course creators & Whop sellers', 'Record lessons people actually finish — or skip the building entirely and resell StageMaster as your own product.'],
  ['Agency owners & freelancers', 'Walk into the pitch as the obvious choice instead of the cheapest quote. Certainty closes; hedging doesn’t.'],
  ['Content creators', 'Hook them in the first 3 seconds, hold them with an open loop, and land the CTA while they’re still leaning in.'],
];

const faqs = [
  ['What exactly do I get after paying?', 'Everything, instantly — the full 7-module course PDF, 7 narrated video lessons, the workbook, 6 cheat sheets, the 16-slide companion deck, and the bonus swipe files. No drip-feed, no “module two unlocks next week”. Reseller Rights buyers also get the license, done-for-you sales copy, and a 7-email buyer sequence.'],
  ['How fast will I actually see a difference?', 'Start with Module 1 and you can use the first pattern in your next recording tonight. The 30-day practice system turns the ideas into a reflex with ten minutes a day.'],
  ['Do I need to know anything about NLP?', 'No. Every pattern is named, explained in plain language, and drilled with practical examples. You can start from zero.'],
  ['Isn’t NLP manipulative?', 'The patterns make true things land harder; they do not rescue a bad offer. Use them to sell something that actually works, to people it is actually right for.'],
  ['I’m shy / I hate my voice. Will this still work?', 'Yes. These tools live in the words and the sound, not in your personality. They work whether you are confident or terrified.'],
  ['Should I just get Personal Use, or the Reseller Rights?', 'Choose Personal Use for your own speaking and selling. Choose Reseller Rights if you want the complete product, sales copy, and email sequence to sell as your own and keep 100% of every sale.'],
  ['Is this a subscription?', 'No. It is one payment, with instant delivery and lifetime access.'],
  ['What if it’s not for me?', 'You can review the course, videos, workbook, and patterns immediately and decide whether the system fits the way you sell and speak.'],
];

const navItems = [
  ['nlp-edge', 'The NLP Edge'],
  ['inside', 'What’s Inside'],
  ['reseller', 'Reseller Rights'],
  ['pricing', 'Pricing'],
  ['faq', 'FAQ'],
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
          <nav className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[.16em] md:flex">
            {navItems.map(([id, label]) => <button key={id} onClick={() => scrollToId(id)} data-testid={`link-${id}`} className="line-link">{label}</button>)}
          </nav>
          <button onClick={() => scrollToId('pricing')} data-testid="button-nav-cta" className="hidden items-center gap-3 bg-[var(--gold)] px-5 py-3 text-[10px] font-bold uppercase tracking-[.16em] text-[var(--navy)] transition hover:bg-[#e8c574] md:flex">
            Get it now — $47 <ArrowRight size={14} />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu" className="md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {menuOpen && <div className="border-t border-white/10 bg-[var(--navy)] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5 text-xs font-semibold uppercase tracking-[.18em]">
            {navItems.map(([id, label]) => <button key={id} onClick={() => { setMenuOpen(false); scrollToId(id); }} data-testid={`link-mobile-${id}`} className="text-left">{label}</button>)}
            <button onClick={() => { setMenuOpen(false); scrollToId('pricing'); }} data-testid="button-mobile-cta" className="btn-gold mt-1 px-4 py-3 text-left">Get it now — $47 <ArrowRight className="ml-2 inline" size={14} /></button>
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
              <div className="reveal mb-7 inline-flex items-center gap-3 rounded-full border border-[var(--gold)]/40 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[.08em] text-[var(--gold)]"><span className="h-2 w-2 rounded-full bg-[var(--green)]" />Keynotes · YouTube · Masterminds — one skill unlocks all three</div>
              <h1 className="reveal reveal-delay-1 display-font max-w-4xl font-extrabold sm:text-7xl lg:text-[6.4rem] is-visible text-[80px]">Are You Struggling With Public Speaking? <span className="text-[var(--gold)]">Turn Your Voice Into A High-Ticket Asset.</span></h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-xl text-lg leading-relaxed text-slate-200 sm:text-xl">Improve your public speaking with <strong>12 proven NLP strategies</strong> — then monetise your expertise through keynote speaking, stronger YouTube content and exclusive masterminds.</p>
              <ul className="reveal reveal-delay-2 mt-6 max-w-xl space-y-2 text-sm leading-6 text-slate-200">
                <li className="flex gap-3"><span className="text-[var(--gold)]">•</span><span><strong>Average client on our courses lands $15k gigs</strong> in speaking & mastermind revenue.</span></li>
                <li className="flex gap-3"><span className="text-[var(--gold)]">•</span><span>Or <strong>resell it and keep 100%</strong> of the profit — license just $147.</span></li>
              </ul>
              <p className="reveal reveal-delay-2 mt-5 max-w-xl text-xs leading-5 text-slate-300">Results vary and depend on your own expertise, audience and effort. No specific income is promised or guaranteed.</p>
              <div className="reveal reveal-delay-3 mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <button onClick={() => handleCheckout('personal')} data-testid="button-hero-buy" className="btn-gold flex items-center gap-4 px-7 py-4 text-xs font-bold uppercase tracking-[.15em]">Get The Course <ArrowRight size={16} /></button>
                <button onClick={() => scrollToId('reseller')} data-testid="button-hero-inside" className="btn-outline flex items-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-[.15em]">Or own & resell it — $147 <ArrowRight size={14} /></button>
              </div>
            </div>
            <div className="reveal reveal-delay-3 mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-5 text-[10px] font-semibold uppercase tracking-[.19em] text-slate-300">
              <span>In your hands in 5 minutes</span><span>Pay once, never again</span><span>Yours for life</span>
            </div>
          </div>
          <div className="absolute bottom-8 right-6 hidden items-center gap-3 text-[10px] uppercase tracking-[.2em] text-white/65 lg:flex"><span className="vertical-label">Scroll to find your voice</span><ArrowDown size={15} className="text-[var(--gold)]" /></div>
        </section>

        <section className="relative overflow-hidden bg-[#e9edf1] py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1380px] items-center gap-14 px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-12">
            <div className="reveal relative">
              <img src="/stage-master-opportunity.jpg" alt="Keynote speaker facing an audience under a warm spotlight" className="aspect-[4/3] w-full object-cover shadow-premium" />
              <div className="absolute -bottom-6 -right-4 bg-[var(--gold)] px-6 py-5 text-[var(--navy)] sm:-right-8"><div className="text-3xl font-extrabold">$15k</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[.19em]">average client gig claim</div></div>
            </div>
            <div className="reveal reveal-delay-1">
              <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--blue)]">The opportunity nobody hands you</p>
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.04] sm:text-6xl">Speaking isn’t a soft skill. It’s a paid one.</h2>
              <p className="mt-7 text-base leading-8 text-slate-600">The people booking stages, filling masterminds and closing high-ticket calls aren’t smarter than you. They just learned to deliver. Here’s what that skill unlocks — and what it costs you to keep putting it off.</p>
              <div className="mt-9 grid gap-px bg-[var(--line)] sm:grid-cols-3">
                {[
                  ['$500 – $5,000', 'Paid keynote or talk', 'Event organisers pay for a speaker who can hold a room for 40 minutes. One booking, many times this course.'],
                  ['$1,000 – $10,000', 'Workshop or training day', 'Companies buy training constantly. The content is your expertise — the delivery is what gets you rebooked.'],
                  ['$3,000+ per member', 'Mastermind or group program', 'People pay to be in a room with someone who speaks with authority. That room is built on one skill.'],
                ].map(([amount, title, copy]) => <div key={title} className="bg-[#e9edf1] p-5 sm:p-6">
                  <div className="text-2xl font-extrabold text-[var(--blue)]">{amount}</div>
                  <h3 className="mt-3 text-sm font-bold">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{copy}</p>
                </div>)}
              </div>
              <div className="mt-7 border-l-2 border-[var(--gold)] pl-5">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--blue)]">Every close you’re losing</p>
                <h3 className="mt-2 text-xl font-bold">Webinars & high-ticket calls</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Same traffic, same offer, sharper delivery. The difference between a 4% and a 12% close rate is how you talk.</p>
              </div>
              <p className="mt-7 text-xl font-bold leading-tight text-[var(--navy)]">One paid gig. One full mastermind seat. One extra close. Any single one of them makes $47 look like nothing.</p>
              <p className="mt-4 text-xs leading-5 text-slate-500">Figures shown are typical market rates for paid speaking and group programs, not a promise of income. What you earn depends entirely on your own expertise, audience and effort. What StageMaster gives you is the delivery skill — and at $147 you can also sell the product itself and keep every cent.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={() => scrollToId('pricing')} data-testid="button-opportunity-skill" className="btn-gold flex items-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-[.15em] text-[var(--navy)]">Get The Skill — $47 <ArrowRight size={15} /></button>
                <button onClick={() => scrollToId('reseller')} data-testid="button-opportunity-reseller" className="flex items-center gap-3 border border-[var(--blue)] px-6 py-4 text-xs font-bold uppercase tracking-[.15em] text-[var(--blue)] transition hover:bg-[var(--blue)] hover:text-white">Get Reseller Rights — $147 <ArrowRight size={15} /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[var(--paper)] py-24 lg:py-36">
          <img src="/stage-master-silence-cost.jpg" alt="" aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-full w-[52%] object-cover opacity-[.17] mix-blend-multiply" />
          <div className="relative z-10 mx-auto grid max-w-[1380px] items-center gap-16 px-6 lg:grid-cols-[.85fr_1.15fr] lg:gap-24 lg:px-12">
            <div className="reveal relative">
              <div className="absolute -left-6 top-3 h-28 w-px bg-[var(--gold)]" />
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[.26em] text-[var(--blue)]">What silence is actually costing you</p>
              <h2 className="display-font max-w-xl text-4xl font-extrabold leading-[1.02] sm:text-6xl">You’re not being out-worked. You’re being out-talked.</h2>
              <p className="mt-8 max-w-lg text-base leading-8 text-slate-600">And it’s invisible, which is what makes it brutal. Nobody sends you an invoice for the deals you never closed. You just quietly earn less than you should:</p>
              <button onClick={() => scrollToId('nlp-edge')} data-testid="button-method-cta" className="mt-9 flex items-center gap-3 text-xs font-bold uppercase tracking-[.17em] text-[var(--blue-deep)]">See the unfair advantage <ArrowRight size={16} /></button>
            </div>
            <div className="reveal reveal-delay-1 grid gap-px bg-[var(--line)] sm:grid-cols-3">
              {[
                 ['The reel you didn’t record', 'It’s still sitting in your notes app. Somebody less qualified than you posted theirs today — and got the client you were going to pitch next month.'],
                 ['The webinar where they left', 'Forty people showed up. Nine were still there at the offer. You didn’t lose them on price. You lost them at minute four, when your voice went flat.'],
                ['The pitch you replayed at 2am', 'You knew the answer. It came out tangled, apologetic, hedged. They went with the person who sounded certain — not the person who was right.'],
              ].map(([title, copy]) => <div key={title} className="group bg-[var(--paper)] p-6 sm:p-8">
                <span className="text-2xl" aria-hidden="true">⚠️</span>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
                <div className="mt-7 h-px w-8 bg-[var(--gold)] transition-all group-hover:w-16" />
              </div>)}
            </div>
            <p className="reveal reveal-delay-2 mt-8 max-w-3xl text-sm font-semibold leading-7 text-slate-600">Here’s the part that should bother you: this is the one skill that compounds every single day you fix it — and quietly costs you every day you don’t.</p>
          </div>
        </section>

        <section id="nlp-edge" className="relative overflow-hidden bg-[var(--navy)] py-24 text-white lg:py-32">
          <img src="/stage-master-nlp-edge.jpg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="pointer-events-none absolute inset-0 bg-[var(--navy)]/80" />
          <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-12">
            <div className="reveal max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--gold)]">The unfair advantage</p>
              <h2 className="mt-6 text-4xl font-extrabold leading-[1.02] sm:text-6xl">Some people say something ordinary and the room leans in. It was never charisma.</h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300">It’s 12 patterns. They have names. They can be learned in an afternoon and they work whether you’re confident or terrified — because they live in the words and the sound, not in your personality. Every speaking course on the internet skips them. StageMaster installs one pair per module.</p>
            </div>
            <div className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
              {patterns.map(([no, title, copy]) => <div key={no} className="reveal group bg-[var(--navy)] p-6 sm:p-8">
                <span className="display-font text-sm font-bold text-[var(--gold)]">{no}</span>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
                <div className="mt-7 h-px w-8 bg-[var(--gold)] transition-all group-hover:w-16" />
              </div>)}
            </div>
            <p className="reveal mt-10 max-w-3xl text-sm leading-7 text-slate-300"><strong className="text-white">One rule, and it’s non-negotiable: every pattern here makes TRUE things land harder.</strong> They won’t rescue a bad offer — nothing will. Use them to sell something that actually works, to people it’s actually right for. That’s the whole line, and it’s exactly why they keep working.</p>
          </div>
        </section>

        <section id="inside" className="bg-[#e9edf1] py-24 lg:py-36">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
            <div className="reveal grid gap-8 border-b border-[var(--line)] pb-10 lg:grid-cols-[1fr_300px] lg:items-end">
              <div><p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--blue)]">The curriculum</p><h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.03] sm:text-6xl">7 modules.<br /><span className="text-[var(--blue)]">Zero theory. Usable tonight.</span></h2></div>
              <div>
                <img src="/stage-master-curriculum.jpg" alt="Seven blank curriculum cards arranged on a desk" className="h-32 w-full object-cover shadow-premium" />
                <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">Every module gives you a skill and the NLP pattern that makes it bite. Start at Module 1 and you’ll have something you can use on your next recording in under 40 minutes.</p>
              </div>
            </div>
            <div className="mt-3">
              {modules.map((module, index) => <div key={module.no} className={`reveal reveal-delay-${Math.min(index % 4, 3)} group grid grid-cols-[48px_1fr] items-center gap-4 border-b border-[var(--line)] py-7 transition-colors hover:bg-white/60 sm:grid-cols-[80px_1fr_1fr_24px] sm:gap-6`}>
                <span className="display-font text-sm font-bold text-[var(--gold)]">{module.no}</span>
                <h3 className="text-xl font-bold sm:text-2xl">{module.title}</h3>
                <p className="col-start-2 max-w-md text-sm leading-6 text-slate-600 sm:col-start-auto">{module.copy}</p>
                <p className="col-start-2 text-xs font-semibold leading-5 text-[var(--blue)] sm:col-start-3">NLP tool · {module.tool}</p>
                <ArrowRight size={17} className="hidden text-[var(--blue)] transition-transform group-hover:translate-x-2 sm:block" />
              </div>)}
            </div>
            <div className="reveal mt-10 flex flex-col items-start justify-between gap-5 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center">
              <p className="text-sm font-semibold text-slate-600">All 7 modules unlock the second you pay. No drip-feed, no waiting for “week two”.</p>
              <button onClick={() => scrollToId('pricing')} data-testid="button-curriculum-cta" className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.17em] text-[var(--blue-deep)]">Unlock All 7 Now <ArrowRight size={16} /></button>
            </div>
          </div>
        </section>

        <section id="reseller" className="relative overflow-hidden bg-[var(--gold)] py-24 lg:py-32">
          <img src="/stage-master-reseller.jpg" alt="" aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-full w-[48%] object-cover opacity-[.18] mix-blend-multiply" />
          <div className="absolute -right-20 -top-32 text-[260px] font-black leading-none text-white/10">100%</div>
          <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-12">
            <div className="reveal max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--navy)]">The part nobody else offers — Reseller Rights</p>
              <h2 className="mt-6 text-4xl font-extrabold leading-[1.02] text-[var(--navy)] sm:text-6xl">Buy it once. Sell it forever. Keep every single cent.</h2>
              <p className="mt-8 max-w-3xl text-base leading-8 text-[var(--navy)]/80">Building a digital product from scratch costs you three months and a few thousand rand in design, video, and copy. Or you pay $147 today and own a finished one — course, videos, workbook, cheat sheets, sales copy, email sequence. List it tonight at any price you like and keep 100% of every sale. No royalties. No revenue share. No monthly fees. Ever.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                ['1', 'Unlock the license', 'Get the whole package plus done-for-you sales copy, a 7-email buyer sequence, and listing templates.'],
                ['2', 'List it tonight', 'Whop, Gumroad, Stan Store, Payhip, your own site — wherever. The copy that sells it is already written for you.'],
                ['3', 'Keep every cent', 'You set the price. The money lands in your account. Forever, with nothing owed back to anyone.'],
              ].map(([no, title, copy]) => <div key={no} className="reveal border border-[var(--navy)]/20 bg-white/20 p-6 sm:p-8">
                <span className="display-font text-4xl font-bold text-[var(--navy)]">{no}</span>
                <h3 className="mt-6 text-xl font-bold text-[var(--navy)]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--navy)]/75">{copy}</p>
              </div>)}
            </div>
            <div className="reveal mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <p className="max-w-2xl text-sm font-semibold leading-6 text-[var(--navy)]/75">Do the math once: 4 sales at $47 and your license is paid off. Sale five onwards is profit on a product you didn’t have to build.</p>
              <button onClick={() => handleCheckout('reseller')} data-testid="button-reseller-section-cta" className="flex items-center gap-3 bg-[var(--navy)] px-6 py-4 text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-[var(--blue-deep)]">Claim Reseller Rights — $147 <ArrowRight size={16} /></button>
            </div>
            <p className="mt-6 text-xs text-[var(--navy)]/65">Your results depend entirely on your own effort and audience — no income is guaranteed.</p>
            <p className="mt-3 text-sm font-semibold text-[var(--navy)]">Only $100 more than Personal Use — and it can pay for itself this week.</p>
          </div>
        </section>

        <section className="bg-[var(--paper)] py-24 lg:py-36">
          <div className="mx-auto grid max-w-[1380px] items-center gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:px-12">
            <div className="reveal relative">
              <img src="/stage-master-workbook.png" alt="StageMaster workbook, cue cards and pen on a desk" className="aspect-[4/3] w-full object-cover shadow-premium" />
              <div className="absolute -bottom-6 -right-4 bg-[var(--blue)] px-6 py-5 text-white sm:-right-8"><div className="text-3xl font-extrabold">7 assets</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[.19em] text-blue-100">delivered instantly</div></div>
            </div>
            <div className="reveal reveal-delay-1">
              <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--green)]">In your hands in 2 minutes ⚡</p>
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.04] sm:text-6xl">What hits your download folder today</h2>
              <p className="mt-7 text-base leading-8 text-slate-600">Seven assets. One price. Delivered before you finish your coffee.</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {assets.map(([icon, title, copy]) => <div key={title} className="border-t border-[var(--line)] pt-4">
                  <div className="text-2xl" aria-hidden="true">{icon}</div>
                  <h3 className="mt-3 text-sm font-bold">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{copy}</p>
                </div>)}
              </div>
              <button onClick={() => scrollToId('pricing')} data-testid="button-assets-cta" className="mt-9 flex items-center gap-3 text-xs font-bold uppercase tracking-[.17em] text-[var(--blue-deep)]">Send me the whole package — $47 <ArrowRight size={16} /></button>
            </div>
          </div>
        </section>

        <section id="pricing" className="relative overflow-hidden bg-[var(--navy)] py-24 text-white lg:py-36">
          <img src="/stage-master-pricing.jpg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="pointer-events-none absolute inset-0 bg-[var(--navy)]/80" />
          <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-12">
            <div className="reveal text-center"><p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--gold)]">One payment. Everything. Now.</p><h2 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-[1.03] sm:text-6xl">Learn it for $47 — or own it and sell it for $147.</h2><p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-slate-300">No subscription. No upsell wall. You pay once and the whole thing is yours, in your download folder, tonight.</p></div>
            <div className="reveal mx-auto mt-10 grid max-w-4xl gap-3 border-y border-white/15 py-6 sm:grid-cols-4 sm:gap-0">
              {[
                ['A speaking coach for one hour', '$150+'],
                ['A single NLP persuasion workshop', '$300+'],
                ['A done-for-you digital product', '$2,000+'],
                ['StageMaster — all of it, today', '$47'],
              ].map(([label, amount], index) => <div key={label} className={`px-4 py-2 ${index > 0 ? 'sm:border-l sm:border-white/15' : ''}`}>
                <p className="text-xs leading-5 text-slate-400">{label}</p>
                <p className={`mt-2 text-2xl font-extrabold ${index === 3 ? 'text-[var(--gold)]' : 'text-white'}`}>{amount}</p>
              </div>)}
            </div>
            <div className="mx-auto mt-14 grid max-w-4xl gap-5 lg:grid-cols-2">
              <div className="pricing-card reveal reveal-delay-1 border border-white/20 bg-white/[.06] p-7 sm:p-9">
                <div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-slate-300">For the founder who’s done sounding unsure</p><h3 className="mt-4 text-2xl font-bold">Personal Use</h3></div><Sparkles className="text-[var(--gold)]" size={21} /></div>
                <div className="mt-7 flex items-end gap-2"><span className="text-6xl font-extrabold">$47</span><span className="pb-2 text-sm text-slate-400">one-time, not monthly</span></div>
                <ul className="mt-7 space-y-3 border-t border-white/15 pt-6 text-sm text-slate-200">{['Complete 7-module course PDF (40+ pages)', 'All 12 NLP patterns — named & drilled', '7 narrated video lessons', 'StageMaster Workbook', '6 quick-reference cheat sheets', '16-slide companion deck (PPTX)', 'Bonus swipe files', 'Instant download • lifetime access'].map((item) => <li key={item} className="flex items-center gap-3"><Check size={15} className="text-[var(--gold)]" />{item}</li>)}</ul>
                <button onClick={() => handleCheckout('personal')} data-testid="button-buy-personal" className="btn-gold mt-9 flex w-full items-center justify-between px-5 py-4 text-xs font-bold uppercase tracking-[.15em]">Get Instant Access <ArrowRight size={16} /></button>
              </div>
              <div className="pricing-card reveal reveal-delay-2 relative border-2 border-[var(--gold)] bg-[#f5f1e7] p-7 text-[var(--navy)] sm:p-9">
                <span className="absolute right-6 top-0 -translate-y-1/2 bg-[var(--gold)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.18em]">Most popular — it can pay for itself</span>
                <div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--blue)]">Master it — then sell it as your own and keep 100%.</p><h3 className="mt-4 text-2xl font-bold">Reseller Rights</h3></div><Sparkles className="text-[var(--blue)]" size={21} /></div>
                <div className="mt-7 flex items-end gap-2"><span className="text-6xl font-extrabold">$147</span><span className="pb-2 text-sm text-slate-500">one-time, not monthly</span></div>
                <ul className="mt-7 space-y-3 border-t border-[var(--navy)]/15 pt-6 text-sm">{['Everything in Personal Use', 'Full Reseller Rights license', 'Sell on Whop, Gumroad, Stan Store & more', 'Keep 100% of every sale — no royalties', 'Done-for-you sales page copy', '7-email buyer sequence to plug in', 'Set your own price, forever'].map((item) => <li key={item} className="flex items-center gap-3"><Check size={15} className="text-[var(--green)]" />{item}</li>)}</ul>
                <button onClick={() => handleCheckout('reseller')} data-testid="button-buy-reseller" className="mt-9 flex w-full items-center justify-between bg-[var(--blue)] px-5 py-4 text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-[var(--blue-deep)]">Unlock Reseller Rights <ArrowRight size={16} /></button>
              </div>
            </div>
            <p className="mt-8 text-center text-[10px] uppercase tracking-[.15em] text-slate-400">🔒 Secure checkout via Whop · Files delivered the second payment clears</p>
          </div>
        </section>

        <section className="bg-[var(--paper)] py-24 lg:py-32">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
            <div className="reveal max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--blue)]">Who it’s for</p>
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.04] sm:text-6xl">If your income depends on your mouth, this is the highest-ROI $47 you’ll spend.</h2>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[.15em] text-[var(--blue)]">Built for people who sell with their voice 🚀</p>
            </div>
            <div className="mt-12 grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
              <img src="/stage-master-audience.jpg" alt="Online entrepreneurs talking together in a bright workshop" className="reveal h-full min-h-[280px] w-full object-cover shadow-premium" />
              <div className="grid gap-px bg-[var(--line)] sm:grid-cols-2">
                {audiences.map(([title, copy]) => <div key={title} className="reveal bg-[var(--paper)] p-6 sm:p-8">
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{copy}</p>
                </div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[var(--paper)] py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1000px] gap-14 px-6 lg:grid-cols-[.75fr_1.25fr] lg:px-12">
            <div className="reveal">
              <img src="/stage-master-faq.jpg" alt="Studio microphone and notebook on a pale desk" className="mb-8 aspect-[4/3] w-full object-cover shadow-premium" />
              <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[var(--blue)]">Before you decide</p>
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.04] sm:text-5xl">Every objection, answered straight.</h2>
            </div>
            <div className="reveal reveal-delay-1">
              {faqs.map(([question, answer], index) => <div key={question} className="border-b border-[var(--line)]">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} data-testid={`button-faq-${index}`} className="flex w-full items-center justify-between gap-5 py-6 text-left text-base font-bold"><span>{question}</span><ChevronDown size={18} className={`shrink-0 text-[var(--blue)] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>
                <div className={`faq-content ${openFaq === index ? 'is-open' : ''}`}><div className="faq-inner"><p className="pb-6 pr-8 text-sm leading-7 text-slate-600">{answer}</p></div></div>
              </div>)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[var(--blue)] py-24 text-white lg:py-32">
          <img src="/stage-master-final-stage.jpg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="pointer-events-none absolute inset-0 bg-[var(--blue)]/75" />
          <div className="absolute -right-20 top-10 text-[300px] font-black leading-none text-white/[.07]">SM</div>
          <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center lg:px-12">
            <Quote className="mx-auto text-[var(--gold)]" size={30} />
            <p className="reveal mt-7 text-[10px] font-bold uppercase tracking-[.26em] text-blue-100">Two versions of the next 30 days</p>
            <h2 className="reveal mt-5 text-4xl font-extrabold leading-[1.04] sm:text-6xl">In 30 days you’ve either done nothing about this — or you’ve become the one they remember.</h2>
            <p className="reveal reveal-delay-1 mx-auto mt-7 max-w-xl text-base leading-7 text-blue-100">Nothing changes by reading this page twice. It changes when you watch Module 1 tonight and fire the anchor before your next recording. $47, paid once, for the skill every other skill you have depends on.</p>
            <div className="reveal reveal-delay-2 mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <button onClick={() => handleCheckout('personal')} data-testid="button-final-cta" className="btn-gold flex items-center justify-center gap-4 px-7 py-4 text-xs font-bold uppercase tracking-[.15em]">Start Tonight — $47 <ArrowRight size={16} /></button>
              <button onClick={() => handleCheckout('reseller')} data-testid="button-final-reseller-cta" className="btn-outline flex items-center justify-center gap-4 px-7 py-4 text-xs font-bold uppercase tracking-[.15em]">Own It & Resell It — $147 <ArrowRight size={16} /></button>
            </div>
            <p className="mt-7 text-[10px] uppercase tracking-[.15em] text-blue-100">Instant download · Pay once, never again · Yours for life</p>
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
