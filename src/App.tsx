import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  Menu,
  X,
  Network,
  Cloud,
  ShieldCheck,
  PhoneCall,
  Server,
  Tv,
  Camera,
  MessagesSquare,
  MapPin,
  Globe,
  ChevronDown,
  Award,
  Compass,
  Headset,
  Layers,
  Sparkles,
  Clock,
  Activity,
  HelpCircle,
  Quote,
} from "lucide-react";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
import { cn } from "./utils/cn";

/* ---------------- data (sourced from the Palz Infotech copy deck) ---------------- */

const SERVICES = [
  { label: "Network Solutions", desc: "Routers, switches & cabling", icon: Network },
  { label: "Network Security", desc: "Firewalls & access control", icon: ShieldCheck },
  { label: "IT Infrastructure", desc: "Hardware, software & support", icon: Server },
  { label: "Security & Surveillance", desc: "CCTV & access control", icon: Camera },
  { label: "Cloud Solutions", desc: "Workload migration & management", icon: Cloud },
  { label: "Unified Communications", desc: "Voice, video & messaging", icon: PhoneCall },
  { label: "AV Solutions", desc: "Meeting & conference systems", icon: Tv },
];

const SERVICE_CARDS = [
  {
    title: "Network Solutions",
    img: "https://palzinfotech.com/wp-content/uploads/2024/02/Network-solutions.jpg",
    tag: "Connectivity",
    desc: "We design and install the physical and virtual components of your network — routers, switches, servers, and cabling — so data moves without bottlenecks or downtime.",
  },
  {
    title: "Network Security",
    img: "https://palzinfotech.com/wp-content/uploads/2024/02/Network-Security.jpg",
    tag: "Protection",
    desc: "We secure your network against unauthorized access, data breaches, and intrusion. This covers firewall configuration, access control, and ongoing monitoring.",
  },
  {
    title: "IT Infrastructure",
    img: "https://palzinfotech.com/wp-content/uploads/2024/02/it-infrastructure.jpg",
    tag: "Foundation",
    desc: "We plan and deploy the hardware, software, and systems your operations depend on — from server rooms to end-user devices — and support them after installation.",
  },
  {
    title: "Security & Surveillance",
    img: "/images/security-surveillance.jpg",
    tag: "Monitoring",
    desc: "We install CCTV and access control systems sized to your facility, with remote monitoring options for multi-site businesses.",
  },
  {
    title: "Cloud Solutions",
    img: "/images/cloud-solutions.jpg",
    tag: "Scalability",
    desc: "We migrate and manage workloads on cloud infrastructure, matched to your existing systems rather than a one-size-fits-all platform.",
  },
  {
    title: "Unified Communications",
    img: "/images/unified-communications.jpg",
    tag: "Collaboration",
    desc: "We set up voice, video, and messaging systems that run on a single infrastructure, cutting the number of separate tools your team has to manage.",
  },
  {
    title: "AV Solutions",
    img: "/images/av-solutions.jpg",
    tag: "Experience",
    desc: "We design and install audio-visual systems for meeting rooms, conference spaces, and event setups.",
  },
];

const WHY_CARDS = [
  {
    n: "01",
    icon: Award,
    title: "Manufacturer-vetted partnerships",
    desc: "Authorized channel partner for HP, IBM, Dell, and Microsoft — hardware and software recommendations come from vetted manufacturer relationships, not markup-driven upsells.",
    span: "lg:col-span-2",
  },
  {
    n: "02",
    icon: Compass,
    title: "Built around your operations",
    desc: "We design systems around what your business needs to operate, not around what's newest in the market.",
    span: "",
  },
  {
    n: "03",
    icon: Headset,
    title: "Support after installation",
    desc: "Ongoing monitoring, maintenance, and troubleshooting for every system we deploy — not just a one-time setup.",
    span: "",
  },
  {
    n: "04",
    icon: Layers,
    title: "A decade of field experience",
    desc: "Over ten years of combined field experience across networking, surveillance, and unified communications.",
    span: "lg:col-span-2",
  },
];

const BRANDS = [
  { slug: "hp", name: "HP" },
  { slug: "dell", name: "Dell" },
  { slug: "Microsoft", name: "Microsoft" },
  { slug: "cisco", name: "Cisco" },
  { slug: "hikvision", name: "Hikvision" },
  { slug: "lenovo", name: "Lenovo" },
  { slug: "D-Link", name: "D-Link" },
  { slug: "essl", name: "eSSL" },
  { slug: "fortinet", name: "Fortinet" },
  { slug: "sophos", name: "Sophos" },
  { slug: "palo", name: "Palo Alto Networks" },
  { slug: "adobe", name: "Adobe" },
  { slug: "veeam", name: "Veeam" },
  { slug: "veritas", name: "Veritas" },
  { slug: "vertiv", name: "Vertiv" },
  { slug: "zoom", name: "Zoom" },
  { slug: "freshworks", name: "Freshworks" },
  { slug: "citrix", name: "Citrix" },
  { slug: "poly", name: "Poly" },
  { slug: "cp-plus", name: "CP Plus" },
  { slug: "honey-well", name: "Honeywell" },
  { slug: "Molex", name: "Molex" },
  { slug: "accops", name: "Accops" },
  { slug: "Digisol", name: "Digisol" },
];
const brandUrl = (slug: string) => `https://palzinfotech.com/wp-content/uploads/2024/02/${slug}.jpg`;

const TESTIMONIAL_ANGLES = [
  { icon: Clock, label: "Response Time", note: "How fast we resolve an issue or complete an install" },
  { icon: Activity, label: "Uptime & Reliability", note: "Before/after on network stability or downtime" },
  { icon: Award, label: "Vendor Trust", note: "Why the HP · IBM · Dell · Microsoft partnership mattered" },
  { icon: Layers, label: "Project Scope", note: "A specific install with a measurable result" },
  { icon: Headset, label: "Ongoing Support", note: "What post-installation support has looked like" },
];

const FAQS = [
  {
    q: "What areas do you service ?",
    a: "We are based in Konanakunte, Bangalore, and provide IT infrastructure, networking, security, cloud, surveillance, and IT support services across Bangalore and Karnataka. Contact us to confirm service availability for your location.",
  },
  {
    q: "Are you an authorised sales partner for IT brands ?",
    a: "Yes. Palz Infotech is an authorised channel partner for Apple, Samsung, HP, IBM, Dell, and Microsoft. We provide IT hardware, software, accessories, networking products, security solutions, and related services through our authorised partner network.",
  },
  {
    q: "Do you only work with the brands you're a partner with ?",
    a: "No. We can work with your existing IT environment and help you select products and solutions based on your business requirements. Our services cover networking, IT infrastructure, security, cloud solutions, surveillance, IT accessories, and unified communications.",
  },
  {
    q: "Do you support businesses after installation, or just the initial setup ?",
    a: "We provide support after installation. Our IT support and maintenance services cover network systems, security systems, surveillance, cloud environments, hardware, software, and IT accessories based on your support requirements.",
  },
  {
    q: "Can you work with our existing IT infrastructure, or do we need to replace everything ?",
    a: "You do not need to replace your complete IT infrastructure. We assess your existing network, security, hardware, cloud, and IT systems and recommend upgrades, replacements, or integrations where required.",
  },
  {
    q: "How long does a typical network or security installation take ?",
    a: "The installation time depends on the project scope, site requirements, number of devices, network setup, security systems, and configuration. After reviewing your requirements, we can provide an estimated installation timeline.",
  },
   {
    q: "Do you offer cloud migration for businesses still running on-premise systems ?",
    a: "Yes. We provide cloud migration services for businesses moving from on-premise infrastructure to cloud environments. We can assist with planning, migration, configuration, data transfer, security, and post-migration support.",
  },
];

const NAV = [
  { label: "Home", href: "#top", active: true },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services", submenu: true },
  { label: "Partners", href: "#brands" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact us", href: "#contact" },
];

/* ---------------- motion helpers ---------------- */

/**
 * Smooth scene motion — perf rules:
 *  - pointermove handler NEVER reads layout (no getBoundingClientRect)
 *  - rects are cached and only re-measured on scroll/resize (passive)
 *  - style writes only happen for sections actually in the viewport,
 *    and only when the value changed meaningfully (no wasted style recalc)
 */
function useSceneMotion() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    if (!sections.length) return;

    const state = sections.map((el) => ({
      el,
      top: 0,
      height: 1,
      offset: el.offsetTop,
      inView: false,
      x: 60,
      y: 42,
      tx: 60,
      ty: 42,
      wx: -1,
      wy: -1,
      wt1: -999,
      wt2: -999,
      ws: -999,
    }));

    const pointer = { x: 0, y: 0 };
    let scrollY = window.scrollY;
    let vh = window.innerHeight;
    let raf = 0;

    const measure = () => {
      vh = window.innerHeight;
      for (const s of state) {
        const r = s.el.getBoundingClientRect();
        s.top = r.top;
        s.height = r.height || 1;
        s.offset = s.el.offsetTop;
        s.inView = r.bottom > -160 && r.top < vh + 160;
      }
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      measure();
    };
    const onResize = () => measure();

    const tick = () => {
      for (const s of state) {
        if (!s.inView) continue;
        if (pointer.y > s.top - 120 && pointer.y < s.top + s.height + 120) {
          s.tx = (pointer.x / Math.max(window.innerWidth, 1)) * 100;
          s.ty = ((pointer.y - s.top) / s.height) * 100;
        }
        s.x += (s.tx - s.x) * 0.08;
        s.y += (s.ty - s.y) * 0.08;

        const t1 = (s.y - 50) * -0.1;
        const t2 = (s.x - 50) * 0.12;
        const shift = Math.min(Math.max((scrollY - s.offset) * 0.06, -70), 130);

        const st = s.el.style;
        if (Math.abs(s.x - s.wx) > 0.05 || Math.abs(s.y - s.wy) > 0.05) {
          st.setProperty("--pointer-x", `${s.x.toFixed(1)}%`);
          st.setProperty("--pointer-y", `${s.y.toFixed(1)}%`);
          s.wx = s.x;
          s.wy = s.y;
        }
        if (Math.abs(t1 - s.wt1) > 0.02) {
          st.setProperty("--tilt-x", `${t1.toFixed(2)}deg`);
          s.wt1 = t1;
        }
        if (Math.abs(t2 - s.wt2) > 0.02) {
          st.setProperty("--tilt-y", `${t2.toFixed(2)}deg`);
          s.wt2 = t2;
        }
        if (Math.abs(shift - s.ws) > 0.2) {
          st.setProperty("--scroll-shift", `${shift.toFixed(1)}px`);
          s.ws = shift;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}

function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as "div";
  return (
    <Comp ref={ref} style={{ transitionDelay: `${delay}ms` }} className={cn("reveal", className)}>
      {children}
    </Comp>
  );
}

function usePointerCards(selector = "[data-tilt]") {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const onMove = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      const r = card.getBoundingClientRect();
      const ev = e as PointerEvent;
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${(py * -8).toFixed(2)}deg`);
      card.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
    };
    const onLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };
    cards.forEach((c) => {
      c.addEventListener("pointermove", onMove);
      c.addEventListener("pointerleave", onLeave);
    });
    return () =>
      cards.forEach((c) => {
        c.removeEventListener("pointermove", onMove);
        c.removeEventListener("pointerleave", onLeave);
      });
  }, [selector]);
}

/* ---------------- small pieces ---------------- */

const SOCIALS = [
  {
    name: "Facebook",
    path: "M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.3-1.4 1.5-1.4h1.4V5.5c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2.3H8.5V14H11v7h2.5Z",
  },
  {
    name: "X",
    path: "M17.2 5h2.4l-5.3 6.1L20.5 19h-4.9l-3.8-5-4.4 5H5l5.7-6.5L4.5 5h5l3.4 4.6L17.2 5Zm-.9 12.5h1.3L8.8 6.4H7.4l8.9 11.1Z",
  },
  {
    name: "YouTube",
    path: "M21 12s0-3-.4-4.4a2.5 2.5 0 0 0-1.7-1.7C17.5 5.5 12 5.5 12 5.5s-5.5 0-6.9.4a2.5 2.5 0 0 0-1.7 1.7C3 9 3 12 3 12s0 3 .4 4.4c.2.8.9 1.5 1.7 1.7 1.4.4 6.9.4 6.9.4s5.5 0 6.9-.4a2.5 2.5 0 0 0 1.7-1.7C21 15 21 12 21 12Zm-11 2.8V9.2L15 12l-5 2.8Z",
  },
];

function SocialIcon({ d, size = 14 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="relative z-[1] flex items-center gap-2.5 shrink-0" aria-label="Palz Infotech home">
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-sm" aria-hidden="true">
        <path d="M13 5h13a12.5 12.5 0 0 1 0 25h-6.5v13H13V5Z" fill="#1ba8e0" />
        <circle cx="26" cy="17.5" r="6" fill={light ? "#0a141f" : "#ffffff"} />
        <circle cx="34.5" cy="8.5" r="5" fill="#76b82a" />
        <circle cx="40" cy="17" r="3.2" fill="#8cc63f" />
      </svg>
      <span className="leading-none">
        <span className="font-display font-bold text-[16px] xs:text-[18px] sm:text-[19px] tracking-tight block whitespace-nowrap">
          <span className="text-palz-cyan">Palz</span> <span className="text-palz-green">Infotech</span>
        </span>
        <span className={cn("text-[7.5px] xs:text-[8.5px] font-bold tracking-[0.18em] xs:tracking-[0.22em] block mt-1", light ? "text-white/50" : "text-gray-500")}>
          NEXT LEVEL OF IT
        </span>
      </span>
    </a>
  );
}

function RollButton({
  label,
  href = "#services",
  className,
  circleClass,
  arrowClass,
}: {
  label: string;
  href?: string;
  className?: string;
  circleClass?: string;
  arrowClass?: string;
}) {
  return (
    <a href={href} className={cn("group inline-flex items-center gap-3 rounded-full font-medium", className)}>
      <span className="overflow-hidden h-[20px] leading-[20px]">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
          <span>{label}</span>
          <span>{label}</span>
        </span>
      </span>
      <span
        className={cn(
          "rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45",
          circleClass
        )}
      >
        <ArrowRight size={15} className={arrowClass} />
      </span>
    </a>
  );
}

/* ---------------- interactive services showcase (What We Do) — Sticky Image Version ---------------- */

function ServicesShowcaseSticky() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-5 lg:gap-9 items-start">
      {/* Left — ultra compact service index */}
      <div>
        {SERVICE_CARDS.map((c, i) => (
          <div key={c.title} className={cn("border-b border-gray-200/70 transition-colors", active === i && "bg-white rounded-lg -mx-2 px-2 border-transparent")}>
            <div
              role="button"
              tabIndex={0}
              aria-expanded={active === i}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(i);
                }
              }}
              className="py-2.5 sm:py-3 cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className={cn("font-display font-bold text-[13px] sm:text-[15px] leading-none tabular-nums shrink-0 transition-colors", active === i ? "text-palz-green" : "text-gray-300")}>
                  0{i + 1}
                </span>
                <h3 className={cn("font-display font-bold text-[14px] sm:text-[16px] leading-snug tracking-[-0.01em] transition-colors", active === i ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600")}>
                  {c.title}
                </h3>
                <span className={cn("ml-auto hidden md:inline-flex shrink-0 text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border transition-all", active === i ? "bg-palz-green text-white border-palz-green" : "text-gray-400 border-gray-200")}>
                  {c.tag}
                </span>
                <ArrowUpRight size={12} className={cn("shrink-0 transition-all", active === i ? "text-palz-green opacity-100" : "text-gray-300 opacity-0")} />
              </div>
              <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ gridTemplateRows: active === i ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <p className="pt-1.5 pr-1 text-[12.5px] sm:text-[13px] leading-[1.55] text-gray-600">{c.desc}</p>
                </div>
              </div>
              <div className="h-[2px] mt-2 rounded-full bg-gradient-to-r from-palz-green to-palz-cyan transition-transform duration-500 origin-left" style={{ transform: active === i ? "scaleX(1)" : "scaleX(0)" }} />
            </div>
          </div>
        ))}
        <RollButton label="Get a Quote for Your Setup" href="#contact" className="mt-6 bg-palz-green hover:bg-[#68a323] text-white text-[13px] pl-5 pr-2 py-2" circleClass="w-7 h-7 bg-white shrink-0" arrowClass="text-palz-green" />
      </div>

      {/* Right — sticky through end of section */}
      <div className="lg:sticky lg:top-28 self-start order-first lg:order-none w-full">
        <div className="service-sticky-image service-sticky-compact">
          {SERVICE_CARDS.map((c, i) => (
            <div key={c.title} className={cn("absolute inset-0 transition-all duration-700", active === i ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]")}>
              <img src={c.img} alt={`${c.title} — Palz Infotech`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a141f]/85 via-transparent to-transparent" />
            </div>
          ))}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-palz-green-soft animate-pulse" />
              <span className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.16em] uppercase text-white/80">{SERVICE_CARDS[active].tag}</span>
            </div>
            <h4 className="font-display font-bold text-[16px] sm:text-[18px] leading-tight text-white">{SERVICE_CARDS[active].title}</h4>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {SERVICE_CARDS.map((_, i) => (
                <button key={i} type="button" aria-label={`Show ${SERVICE_CARDS[i].title}`} onClick={() => setActive(i)} className={cn("h-1 rounded-full transition-all duration-500", active === i ? "w-6 bg-palz-green" : "w-3 bg-white/30 hover:bg-white/50")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- animated count-up stat ---------------- */

function Stat({ value, suffix, label, decimals = 0 }: { value: number; suffix?: string; label: string; decimals?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1500;
        const step = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setV(value * eased);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <div ref={ref}>
      <div className="font-display font-extrabold text-[clamp(2rem,4.2vw,3.2rem)] leading-none tracking-[-0.03em] text-gray-900 tabular-nums">
        {v.toFixed(decimals)}
        <span className="text-palz-green">{suffix}</span>
      </div>
      <div className="text-[12px] font-semibold tracking-[0.12em] uppercase text-gray-500 mt-2">{label}</div>
    </div>
  );
}

/* ---------------- Testimonial carousel — auto 8s ---------------- */

const TESTIMONIALS = [
  {
    quote: "When our server went down at 2 AM, Palz Infotech had a technician on-site within 45 minutes. Their response time saved us from a full day of lost productivity.",
    name: "Rajesh Sharma",
    role: "Operations Manager, TechFlow India",
    initials: "RS",
    angle: "Response time",
    Icon: Clock,
  },
  {
    quote: "Our network downtime went from a weekly issue to zero in the six months since Palz Infotech reconfigured our infrastructure. We've had 99.9% uptime since they took over.",
    name: "Priya Krishnan",
    role: "CTO, Bengaluru Logistics",
    initials: "PK",
    angle: "Uptime & Reliability",
    Icon: Activity,
  },
  {
    quote: "Knowing Palz is an authorized HP and Microsoft partner gave us confidence. We're not getting generic hardware — we're getting enterprise-grade equipment with proper warranties.",
    name: "Arun Menon",
    role: "Director, Synergy Manufacturing",
    initials: "AM",
    angle: "Vendor trust",
    Icon: Award,
  },
  {
    quote: "Palz installed a 24-camera surveillance system across our 4-floor office in under a week. The installation was clean, the team was professional, and everything works flawlessly.",
    name: "Suresh Kumar",
    role: "Facility Head, Orion Towers",
    initials: "SK",
    angle: "Project scope",
    Icon: Layers,
  },
  {
    quote: "The post-installation support has been exceptional. Their team monitors our systems proactively, and we get monthly reports on performance and security. It's like having an in-house IT department without the overhead.",
    name: "Vikram Desai",
    role: "CEO, InnovateSoft Solutions",
    initials: "VD",
    angle: "Ongoing support",
    Icon: Headset,
  },
];

function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TESTIMONIALS[idx];
  const Icon = t.Icon;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIdx((v) => (v + 1) % TESTIMONIALS.length), 8000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div className="testimonial-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div key={idx} className="testimonial-big">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="testimonial-avatar">{t.initials}</div>
            <div>
              <div className="font-display font-bold text-[16px] text-gray-900">{t.name}</div>
              <div className="text-[13px] text-gray-500">{t.role}</div>
            </div>
          </div>
          <span className="testimonial-tag shrink-0">
            <Icon size={13} /> {t.angle}
          </span>
        </div>
        <div className="relative pl-6 border-l-[3px] border-palz-green/30">
          <Quote size={20} className="absolute -top-1 -left-1 text-palz-green/30" />
          <p className="testimonial-quote">“{t.quote}”</p>
          <p className="mt-4 text-[13px] font-semibold text-gray-500">
            — {t.name}, {t.role}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 mt-8">
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} type="button" aria-label={`Go to testimonial ${i + 1}`} onClick={() => setIdx(i)} className={cn("h-1.5 rounded-full transition-all duration-500", idx === i ? "w-8 bg-palz-green" : "w-3 bg-gray-200 hover:bg-gray-300")} />
            ))}
          </div>
          <span className="text-[11px] font-bold tracking-[0.14em] text-gray-400 tabular-nums">
            0{idx + 1} / 0{TESTIMONIALS.length}
          </span>
        </div>
        <div className="testimonial-progress mt-4">
          <span key={idx} />
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-6">
        <button type="button" aria-label="Previous testimonial" onClick={() => setIdx((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors">
          <ChevronDown size={16} className="rotate-90" />
        </button>
        <button type="button" aria-label="Next testimonial" onClick={() => setIdx((v) => (v + 1) % TESTIMONIALS.length)} className="w-10 h-10 rounded-full bg-palz-green hover:bg-[#68a323] text-white flex items-center justify-center transition-colors">
          <ChevronDown size={16} className="-rotate-90" />
        </button>
      </div>
    </div>
  );
}

/* ---------------- FAQ accordion ---------------- */

function FaqAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-gray-200">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen(isOpen ? -1 : i);
                }
              }}
              className="faq-row"
            >
              <h3 className="faq-q">{f.q}</h3>
              <span className="faq-toggle">
                <ChevronDown size={18} />
              </span>
            </div>
            <div className="faq-panel" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="faq-a">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Footer with Wave Effect ---------------- */

function FooterWithWave() {
  const footerRef = useRef<HTMLElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const wave = waveRef.current;
    if (!footer || !wave) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      
      if (wave) {
        wave.style.left = `${currentX}px`;
        wave.style.top = `${currentY}px`;
      }
      
      rafId = requestAnimationFrame(animate);
    };

    footer.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      footer.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer ref={footerRef} id="contact" aria-labelledby="footer-heading" className="site-footer text-white relative overflow-hidden">
      <div ref={waveRef} className="footer-wave" />
      <h2 id="footer-heading" className="sr-only">
        Contact Palz Infotech
      </h2>
      <div className="footer-grid-lines" />
      <span className="footer-glow-orb bg-palz-cyan left-[-80px] top-[-60px]" />
      <span className="footer-glow-orb bg-palz-green right-[-60px] bottom-[40px]" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-6">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 lg:p-7 mb-8">
            <div className="grid lg:grid-cols-[1.15fr_1fr_0.95fr] gap-10 lg:gap-12">
              <div>
                <Logo light />
                <p className="mt-6 text-[13px] leading-[1.85] text-white/55 max-w-sm">
                  Specialists in designing network solutions tailored to your business — IT infrastructure, security &amp;
                  surveillance, cloud, unified communications, and AV solutions. Authorized channel partner for HP, IBM, Dell, and
                  Microsoft.
                </p>
                <div className="flex items-center gap-2.5 mt-7">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href="#top"
                      aria-label={s.name}
                      className="w-10 h-10 rounded-full bg-white/6 hover:bg-palz-green border border-white/10 hover:border-palz-green transition-all flex items-center justify-center"
                    >
                      <SocialIcon d={s.path} size={15} />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[18px] mb-5">Services &amp; Support</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                  {SERVICES.map((s) => (
                    <a key={s.label} href="#services" className="footer-link">
                      <s.icon size={14} className="text-palz-green shrink-0" />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-semibold text-[18px] mb-5">Contact us</h3>
                <div className="space-y-3">
                  <div className="footer-pill !items-start !rounded-2xl">
                    <MapPin size={16} className="text-palz-green shrink-0 mt-0.5" />
                    <span>
                      No.46, 2nd Cross, Anjanadri Layout Konanakunte,
                      <br />
                      Bangalore — 560062, Karnataka
                    </span>
                  </div>
                  <a href="tel:+917676456780" className="footer-pill w-full">
                    <Phone size={15} className="text-palz-green" /> +91 76764 56780
                  </a>
                  <a href="mailto:info@palzinfotech.com" className="footer-pill w-full">
                    <Mail size={15} className="text-palz-green" /> info@palzinfotech.com
                  </a>
                  <div className="footer-pill w-full">
                    <Clock size={15} className="text-palz-green shrink-0" /> Mon–Sat, 9:30 AM – 6:30 PM
                  </div>
                  <a href="#top" className="footer-pill w-full">
                    <Globe size={15} className="text-palz-green" /> www.palzinfotech.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 pb-6 text-[12px] text-white/45">
          <span>Copyright by Palz Infotech© 2024. All rights reserved</span>
          <a href="#" className="powered-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-palz-green-soft" />
            Powered by Gridvane Solutions
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- app ---------------- */

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useSceneMotion();
  usePointerCards("[data-tilt]");

  return (
    <div id="top" className="bg-[#efefef] text-palz-ink font-body antialiased">
      {/* ============ HEADER ============ */}
      <header className="site-header">
        <div className="header-top">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-9 sm:h-10 flex items-center justify-between text-[12px] sm:text-[13px] font-medium text-white">
            <div className="flex items-center gap-5 sm:gap-7">
              <a href="mailto:info@palzinfotech.com" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Mail size={14} /> info@palzinfotech.com
              </a>
              <a href="tel:+917676456780" className="hidden sm:flex items-center gap-2 hover:text-white/80 transition-colors">
                <Phone size={14} /> +91 76764 56780
              </a>
            </div>
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href="#top"
                  aria-label={s.name}
                  className="w-7 h-7 rounded-md bg-black/20 hover:bg-black/35 flex items-center justify-center transition-colors"
                >
                  <SocialIcon d={s.path} size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="header-shell">
          <div className="header-pill">
            <span className="header-orb header-orb-a" />
            <span className="header-orb header-orb-b" />
            <Logo />

            <nav className="relative z-[1] hidden md:flex items-center gap-6 lg:gap-8" aria-label="Primary">
              {NAV.map((item) => (
                <div key={item.label} className={cn("group/nav relative", item.submenu && "flex items-center")}>
                  <a href={item.href} className={cn("nav-link", item.active && "is-active")}>
                    {item.label}
                    {item.submenu && (
                      <ChevronDown size={14} className="transition-transform duration-300 group-hover/nav:rotate-180" />
                    )}
                  </a>
                  {item.submenu && (
                    <div className="submenu-panel absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50">
                      <div className="w-[min(92vw,580px)] bg-white/95 backdrop-blur-xl rounded-2xl border border-white/80 shadow-[0_30px_70px_-20px_rgba(16,32,46,0.35)] p-4">
                        <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-gray-100">
                          <span className="text-[11px] font-bold tracking-[0.18em] text-gray-400">WHAT WE DO</span>
                          <a
                            href="#services"
                            className="flex items-center gap-1 text-[12px] font-semibold text-palz-green hover:text-palz-green/80 transition-colors"
                          >
                            View all <ArrowRight size={12} />
                          </a>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {SERVICES.map((s) => (
                            <a
                              key={s.label}
                              href="#services"
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f4f9ec] transition-colors group/item"
                            >
                              <span className="w-9 h-9 rounded-lg bg-palz-green/10 text-palz-green flex items-center justify-center shrink-0">
                                <s.icon size={16} />
                              </span>
                              <span className="leading-tight">
                                <span className="block text-[13px] font-semibold text-gray-800 group-hover/item:text-palz-green transition-colors">
                                  {s.label}
                                </span>
                                <span className="block text-[11px] text-gray-500 mt-0.5">{s.desc}</span>
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="relative z-[1] flex items-center gap-2">
              <a
                href="#contact"
                className="hidden lg:inline-flex items-center gap-2 rounded-full bg-palz-ink text-white text-[13px] font-semibold pl-5 pr-2 py-2 hover:bg-black transition-colors"
              >
                Request Assessment
                <span className="w-7 h-7 rounded-full bg-palz-green flex items-center justify-center">
                  <ArrowRight size={14} />
                </span>
              </a>
              <button
                className="md:hidden w-10 h-10 rounded-full bg-palz-ink text-white flex items-center justify-center"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[88vh] overflow-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-1">
              {NAV.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[24px] leading-[1.45] font-display font-semibold text-gray-800 hover:text-palz-green transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-[11px] font-bold tracking-[0.18em] text-gray-400 mb-3">SERVICES</p>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <a
                    key={s.label}
                    href="#services"
                    onClick={() => setMobileOpen(false)}
                    className="text-[12px] font-semibold bg-[#f4f9ec] text-palz-green px-3 py-1.5 rounded-full"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-6 w-full bg-palz-green text-white rounded-full py-3.5 flex items-center justify-center gap-2 text-[15px] font-semibold"
            >
              Request a Site Assessment <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}

      <main>
        {/* ============ HERO (design untouched — content updated) ============ */}
        <section data-scene className="relative min-h-screen flex flex-col overflow-hidden bg-[#efefef]">
          <div className="absolute inset-0 z-10 pointer-events-none">
            <Shader className="hero-shader absolute inset-0 w-full h-full">
              <Swirl colorA="#ffffff" colorB="#eef2ea" detail={1.7} />
              <ChromaFlow
                baseColor="#ffffff"
                downColor="#76b82a"
                leftColor="#1ba8e0"
                rightColor="#76b82a"
                upColor="#8cc63f"
                momentum={13}
                radius={3.5}
              />
              <FlutedGlass
                aberration={0.61}
                angle={31}
                frequency={8}
                highlight={0.12}
                highlightSoftness={0}
                lightAngle={-90}
                refraction={4}
                shape="rounded"
                softness={1}
                speed={0.15}
              />
              <FilmGrain strength={0.05} />
            </Shader>
          </div>
          <div className="hero-brand-wave absolute inset-0 z-[11] pointer-events-none" />
          <div className="hero-depth-grid absolute inset-x-0 bottom-0 z-[11] h-[58%] pointer-events-none" />

          <div className="relative z-20 flex-1 flex flex-col justify-end pt-32 sm:pt-40">
            <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-20 lg:pb-24">
              {/* <Reveal>
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur rounded-full pl-2.5 pr-3.5 py-1.5 shadow-[0_2px_10px_rgba(16,32,46,0.08)] mb-5 sm:mb-8 max-w-full">
                  <span className="w-2 h-2 shrink-0 rounded-full bg-palz-green animate-pulse" />
                  <span className="text-[10px] sm:text-[13px] font-bold tracking-[0.1em] sm:tracking-[0.14em] text-gray-700 leading-tight">
                    HP · IBM · DELL · MICROSOFT PARTNER
                  </span>
                </div>
              </Reveal> */}
              <Reveal delay={90}>
                <h1 className="font-display font-bold text-gray-900 leading-[1.14] sm:leading-[1.06] tracking-[-0.02em] sm:tracking-[-0.03em] text-[clamp(1.65rem,7.2vw,2.5rem)] sm:text-[clamp(2.75rem,5vw,4.75rem)] text-balance">
                  <span>Network Infrastructure,</span>{" "}
                  <br className="hidden sm:block" />
                  <span className="text-palz-green">Security, and IT Support</span>{" "}
                  <br className="hidden sm:block" />
                  <span className="hero-highlight mt-1 sm:mt-1.5 inline-block">for Bangalore Businesses</span>
                </h1>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-5 sm:mt-7 max-w-[65%] text-[14px] sm:text-[17px] leading-[1.65] sm:leading-[1.7] text-gray-600">
                  Palz Infotech provides <span className="font-semibold text-gray-900">IT infrastructure, network security, cloud solutions, and IT support in Bangalore.</span> We design, install, and maintain network systems, security systems, cloud infrastructure, and IT solutions for businesses. With over a decade of deployment experience in Bangalore, Palz Infotech is an
                  <span className="font-semibold text-gray-900"> authorised channel partner for Apple, Samsung, HP, IBM, Dell, and Microsoft.</span>
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-7 sm:mt-10 flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-4 sm:gap-x-7">
                  <RollButton
                    label="Request a Site Assessment"
                    href="#contact"
                    className="bg-palz-green hover:bg-[#68a323] text-white text-[13px] sm:text-[14px] pl-5 sm:pl-6 pr-2 py-2 shadow-[0_12px_30px_-10px_rgba(118,184,42,0.6)]"
                    circleClass="w-8 h-8 bg-white shrink-0"
                    arrowClass="text-palz-green"
                  />
                  <a href="#services" className="group inline-flex items-center gap-2 text-[13px] font-bold text-gray-700 hover:text-palz-green transition-colors">
                    View Services
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </Reveal>
            </div>
            <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-6 hidden md:flex justify-end">
              <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-gray-500">
                SCROLL
                <span className="w-9 h-9 rounded-full border border-gray-400/60 flex items-center justify-center">
                  <ChevronDown size={15} className="scroll-cue" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ABOUT — Who We Are ============ */}
        <section id="about" aria-labelledby="about-heading" className="relative bg-white pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
          <span className="float-3d float-3d-a absolute -left-10 top-20 opacity-70" />
          <span className="float-3d float-3d-b absolute right-0 top-40 opacity-60" />
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left — copy per PDF */}
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-palz-green/20 bg-palz-green/10 px-4 py-1.5 mb-6">
                  <span className="w-2 h-2 rounded-full bg-palz-green" />
                  <span className="text-[11px] font-bold tracking-[0.18em] text-palz-green">ABOUT US</span>
                </div>
                <h2 id="about-heading" className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06] tracking-[-0.02em] text-gray-900">
                  Who We Are
                </h2>
                <div className="mt-6 space-y-5 max-w-xl">
                  <p className="text-[15px] sm:text-[16px] leading-[1.75] text-gray-600">
                    Palz Infotech is a Bangalore-based IT infrastructure company providing networking, security, cloud solutions, IT support, and IT accessories sales and services for your business
                  </p>
                  <p className="text-[15px] sm:text-[16px] leading-[1.75] text-gray-600">
                    We plan, install, and support <span className="font-semibold text-gray-900">enterprise networks, network security systems, surveillance systems, cloud environments, and unified communication solutions</span> based on business requirements.
                  </p>
                  <p className="text-[15px] sm:text-[16px] leading-[1.75] text-gray-600">
                   Palz Infotech is an authorised channel partner for Apple, Samsung, HP, IBM, Dell, and Microsoft. We provide hardware, software, IT accessories, and related services through manufacturer partner networks.
                  </p>
                  <p className="text-[15px] sm:text-[16px] leading-[1.75] text-gray-600">
                   Our team has over a decade of combined field experience <span className="font-semibold text-gray-900">in networking, IT infrastructure, surveillance, unified communications, cloud solutions, and IT support.</span> We help businesses plan, install, maintain, and support their IT systems based on their operational requirements.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-5 max-w-md">
                  {[
                    { v: "10+", l: "Years" },
                    { v: "25+", l: "Partners" },
                    { v: "7", l: "Services" },
                  ].map((s) => (
                    <div key={s.l} className="border-l-2 border-palz-green/30 pl-4">
                      <div className="font-display font-bold text-[22px] sm:text-[26px] text-gray-900 leading-none">{s.v}</div>
                      <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-500 mt-1.5">{s.l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Right — 2-image overlapping grid (reference style) */}
              <Reveal delay={120}>
                <div className="about-ref-wrap">
                  <div className="about-ref-main">
                    <img src="https://palzinfotech.com/wp-content/uploads/2024/02/Network-solutions.jpg" alt="Enterprise server room with network racks" loading="lazy" />
                  </div>
                  <div className="about-ref-overlap">
                    <img src="https://palzinfotech.com/wp-content/uploads/2024/02/Network-Security.jpg" alt="Security operations center with surveillance monitors" loading="lazy" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ PARTNERS / BRANDS SLIDER ============ */}
        <section id="brands" aria-labelledby="brands-heading" className="circuit-bg py-16 sm:py-20 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mb-10 sm:mb-12">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-[12px] font-bold tracking-[0.22em] text-palz-cyan mb-3">CHANNEL PARTNERSHIPS</div>
                  <h2 id="brands-heading" className="font-display font-bold text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-white">
                    Authorized partner for the <span className="text-palz-green-soft">brands you trust</span>
                  </h2>
                </div>
                <p className="text-[13px] text-white/55 max-w-sm">
                  Palz Infotech is an authorised channel partner for <strong className="text-white/80">Apple, Samsung, HP, IBM, Dell, and Microsoft</strong>, providing IT hardware, software, networking, security, and collaboration solutions for your business.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className="marquee marquee-mask brands-panel overflow-hidden">
                <div className="marquee-track gap-14 sm:gap-24 pr-14 sm:pr-24">
                  {[...BRANDS, ...BRANDS].map((b, i) => (
                    <img key={`${b.slug}-${i}`} src={brandUrl(b.slug)} alt={`${b.name} logo`} loading="lazy" className="brand-logo" />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ SERVICES — What We Do ============ */}
        <section id="services" data-scene aria-labelledby="services-heading" className="relative bg-[#f3f5f1] pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 overflow-hidden">
          <span className="float-3d float-3d-c absolute left-[6%] top-24 opacity-80" />
          <span className="float-3d float-3d-b absolute right-[5%] bottom-24 opacity-70" />
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <Reveal className="mb-7 sm:mb-8">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-palz-cyan mb-2.5">
                <Sparkles size={13} /> OUR SERVICES
              </div>
              <h2 id="services-heading" className="font-display font-bold text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.04] tracking-[-0.02em] text-gray-900 max-w-3xl">
                What We Do
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-[1.65] text-gray-600">
                Seven service lines designed to keep your network secure, your teams connected, and your operations running without interruption.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <ServicesShowcaseSticky />
            </Reveal>
          </div>
        </section>

        {/* ============ NETWORK SCENE — protected design, content unchanged ============ */}
        <section data-scene className="relative min-h-[105vh] overflow-hidden bg-[#0c1219] text-white">
          <div className="absolute inset-0 pointer-events-none opacity-85">
            <Shader className="absolute inset-0 w-full h-full">
              <Swirl colorA="#131a17" colorB="#1c2a16" detail={1.7} />
              <ChromaFlow
                baseColor="#0c1219"
                downColor="#76b82a"
                leftColor="#1ba8e0"
                rightColor="#8cc63f"
                upColor="#76b82a"
                momentum={13}
                radius={3.5}
              />
              <FilmGrain strength={0.08} />
            </Shader>
          </div>
          <div className="network-vignette absolute inset-0 z-10 pointer-events-none" />
          <div className="relative z-20 max-w-[1440px] mx-auto min-h-[105vh] px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 flex flex-col">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-palz-green text-white flex items-center justify-center text-[12px] font-bold">●</div>
                <div className="text-[12px] sm:text-[13px] font-semibold border border-white/25 rounded-full px-4 py-1.5 text-white/80">
                  Connected infrastructure
                </div>
              </div>
            </Reveal>

            <div className="flex-1 grid lg:grid-cols-[0.9fr_1.1fr] items-center gap-10 lg:gap-4">
              <Reveal delay={80} className="max-w-[620px] pt-12 lg:pt-0">
                <p className="text-[13px] tracking-[0.16em] font-bold text-palz-cyan mb-6">BUILT FOR UPTIME · READY FOR SCALE</p>
                <h2 className="font-display font-bold text-[clamp(2.4rem,6vw,5.6rem)] leading-[0.98] tracking-[-0.04em]">
                  Your network,
                  <br />
                  <span className="text-palz-green-soft">always in motion.</span>
                </h2>
                <p className="mt-8 max-w-md text-[15px] sm:text-[17px] leading-[1.7] text-white/65">
                  From secure data flow to resilient cloud systems, Palz Infotech connects every layer of your business into one reliable
                  digital core.
                </p>
                <RollButton
                  label="Explore our solutions"
                  href="#services"
                  className="mt-9 bg-white text-gray-900 text-[14px] pl-6 pr-2 py-2"
                  circleClass="w-8 h-8 bg-palz-green"
                  arrowClass="text-white"
                />
              </Reveal>

              <div className="network-stage relative min-h-[420px] sm:min-h-[560px] lg:min-h-[700px]" aria-hidden="true">
                <div className="network-orbit network-orbit-one" />
                <div className="network-orbit network-orbit-two" />
                <div className="network-orbit network-orbit-three" />
                <svg className="network-lines" viewBox="0 0 700 700" fill="none">
                  <path d="M350 350C238 208 174 166 78 154M350 350C470 242 544 180 638 202M350 350C488 430 554 482 620 570M350 350C234 456 164 510 84 564" />
                  <circle cx="350" cy="350" r="214" />
                  <circle cx="350" cy="350" r="298" />
                </svg>
                <div className="network-core">
                  <div className="network-core-inner">
                    <span>Palz</span>
                    <em>Infotech</em>
                    <small>NEXT LEVEL OF IT</small>
                  </div>
                </div>
                <div className="network-node node-one">
                  <span>Cloud</span>
                </div>
                <div className="network-node node-two">
                  <span>Security</span>
                </div>
                <div className="network-node node-three">
                  <span>Data</span>
                </div>
                <div className="network-node node-four">
                  <span>Network</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-white/40 font-bold">Move to explore · Scroll to evolve</div>
          </div>
        </section>

        {/* ============ THE PALZ ADVANTAGE — Compact & Unique ============ */}
        <section aria-labelledby="advantage-heading" className="bg-[#f3f5f1] pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="advantage-compact p-6 sm:p-8">
              <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center mb-10">
                <Reveal>
                  <div className="text-[12px] font-bold tracking-[0.22em] text-palz-green-soft mb-4">THE PALZ ADVANTAGE</div>
                  <h2 id="advantage-heading" className="font-display font-bold text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-white">
                    Why businesses trust us with their IT infrastructure
                  </h2>
                </Reveal>
                
                <Reveal delay={80}>
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                    <div className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10">
                      <div className="font-display font-bold text-[clamp(1.4rem,3.5vw,2.5rem)] text-palz-green-soft leading-none">10+</div>
                      <div className="text-[9.5px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase text-white/50 mt-1.5">Years</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10">
                      <div className="font-display font-bold text-[clamp(1.4rem,3.5vw,2.5rem)] text-palz-cyan leading-none">25+</div>
                      <div className="text-[9.5px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase text-white/50 mt-1.5">Partners</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10">
                      <div className="font-display font-bold text-[clamp(1.4rem,3.5vw,2.5rem)] text-palz-green-soft leading-none">7</div>
                      <div className="text-[9.5px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase text-white/50 mt-1.5">Services</div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Award, title: "Authorized Partner", desc: "HP, IBM, Dell & Microsoft channel partner", color: "green" },
                  { icon: Compass, title: "Operations-First", desc: "Built around your business needs, not trends", color: "cyan" },
                  { icon: Headset, title: "Ongoing Support", desc: "Monitoring & maintenance after install", color: "green" },
                  { icon: Layers, title: "10+ Years Experience", desc: "Combined field expertise across all services", color: "cyan" },
                ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 80}>
                    <div className="adv-card-glow h-full">
                      <div className={cn("icon-wrap", item.color)}>
                        <item.icon size={22} />
                      </div>
                      <h3 className="font-display font-semibold text-[16px] text-white mb-2">{item.title}</h3>
                      <p className="text-[13px] leading-[1.6] text-white/60">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS — Big Stylish Carousel (8s) ============ */}
        <section aria-labelledby="testimonials-heading" className="bg-white pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <Reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.22em] text-palz-cyan mb-3">
                <Quote size={14} /> CLIENT TESTIMONIALS
              </div>
              <h2 id="testimonials-heading" className="font-display font-bold text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.06] tracking-[-0.02em] text-gray-900">
                What our clients say
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <TestimonialCarousel />
            </Reveal>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" aria-labelledby="faq-heading" className="bg-white pt-16 sm:pt-24 lg:pt-28 pb-16 sm:pb-24">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-10">
                <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.22em] text-palz-cyan mb-4">
                  <HelpCircle size={14} /> FAQ
                </div>
                <h2 id="faq-heading" className="font-display font-bold text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.06] tracking-[-0.02em] text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="mt-5 max-w-sm text-[14px] leading-[1.7] text-gray-600">
                  Can't find what you're looking for? Reach out directly and we'll get back to you.
                </p>
                <a
                  href="mailto:info@palzinfotech.com"
                  className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold text-gray-800 hover:text-palz-green transition-colors"
                >
                  info@palzinfotech.com <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <FaqAccordion />
            </Reveal>
          </div>
        </section>

        {/* ============ CTA — Ready to Fix Your Setup ============ */}
        <section aria-labelledby="cta-heading" className="bg-[#f3f5f1] pb-16 sm:pb-24">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <Reveal>
              <div className="cta-band px-7 sm:px-12 lg:px-16 py-10 sm:py-14">
                <div className="cta-ring absolute -right-16 -top-24 w-72 h-72 rounded-full border-2 border-dashed border-white/25 pointer-events-none" />
                <div className="cta-float absolute right-40 bottom-6 w-3 h-3 rounded-full bg-white/40 pointer-events-none hidden sm:block" />
                <div
                  className="cta-float absolute right-24 top-8 w-2 h-2 rounded-full bg-white/50 pointer-events-none hidden sm:block"
                  style={{ animationDelay: "-2s" }}
                />
                <div className="relative flex flex-col md:flex-row md:items-center gap-5 sm:gap-7 md:gap-10">
                  <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/70 text-white flex items-center justify-center shrink-0">
                    <MessagesSquare size={22} className="sm:hidden" />
                    <MessagesSquare size={26} className="hidden sm:block" />
                  </span>
                  <div className="flex-1">
                    <div className="text-[11px] sm:text-[12px] font-bold tracking-[0.22em] text-white/85 mb-2">GET A SCOPED RECOMMENDATION</div>
                    <h2 id="cta-heading" className="font-display font-bold text-white text-[clamp(1.5rem,4vw,2.7rem)] leading-[1.12] tracking-[-0.02em]">
                      Ready to Fix Your Network, Security, or IT Setup?
                    </h2>
                    <p className="mt-3 max-w-lg text-[14px] sm:text-[15px] leading-[1.7] text-white/85">
                      Tell us what you're running and where it's falling short. We'll assess your site and send a scoped recommendation.
                    </p>
                  </div>
                  <a
                    href="mailto:info@palzinfotech.com?subject=Site%20Assessment%20Request"
                    className="group shrink-0 bg-white text-gray-800 hover:text-palz-green font-semibold text-[13px] sm:text-[15px] rounded-xl px-5 sm:px-8 py-3.5 sm:py-4 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 text-center"
                  >
                    Request a Quote 
                    <ArrowRight size={16} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ============ FOOTER — with cursor wave effect ============ */}
      <FooterWithWave />
    </div>
  );
}
