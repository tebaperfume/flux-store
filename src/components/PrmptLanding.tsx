import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroLeft from "../assets/prmpt-hero-left.jpg";
import heroRight from "../assets/prmpt-hero-right.jpg";

const WHATSAPP_NUMBER = "201063272632";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi FLUX! I'm interested in the Archive Collection.")}`;
const WHATSAPP_ORDER_URL = (product: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi FLUX! I'd like to order: ${product}`)}`;

gsap.registerPlugin(ScrollTrigger);

const LEFT_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4";
const RIGHT_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4";

const IMAGES = [
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104530_521b2f85-c0f3-4d0e-9704-b578315b4cb9.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103711_76ccdb8b-5043-4f47-9c54-4379713393ea.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103728_394f6a1b-85e2-4386-a4f6-408472a0a5b7.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103739_86743e0e-16a7-4bee-bf38-dd67985344dc.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103748_b2215dc8-a3a7-470d-b19a-5b87fa7d0c37.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103758_e919ce72-5c9d-4b87-9be6-d7647b34825c.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103808_013583d0-3386-4547-9832-37c7d8edb3ac.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103937_a0c49d0a-33eb-4ead-aea6-c1baf241acbc.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103956_d18ed8fd-7b6f-4b86-91f9-20010fe38670.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104034_ba5a9963-87ff-4008-a545-6bd686c088b5.png&w=1920&q=85",
];

const SYMBOLS = ["8", "$", "^^", "%", "/"];

const PRICE = 97.33;
const formatPrice = (n: number) => "$" + n.toFixed(2).replace(".", ",");
const productName = (id: number) => `FLUX PIECE ${String(id + 1).padStart(2, "0")}`;

function buildLayout(count: number, cols: number): number[] {
  const cells: number[] = [];
  let idx = 0;
  let r = 0;
  while (idx < count) {
    const row: number[] = new Array(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = idx++;
    if (idx < count && r % 3 === 0) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = idx++;
    }
    cells.push(...row);
    r++;
  }
  return cells;
}

const easing = [0.25, 0.1, 0.25, 1] as const;

export default function PrmptLanding() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const leftVidRef = useRef<HTMLVideoElement>(null);
  const rightVidRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const buyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const symbolRef = useRef<HTMLSpanElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const activeSideRef = useRef<"left" | "right">("right");
  const [cols, setCols] = useState(4);
  const [isTouch, setIsTouch] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [addedId, setAddedId] = useState<number | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"form" | "processing" | "done">("form");
  const [orderNumber, setOrderNumber] = useState(
    () => "FLX-" + Math.floor(1000 + Math.random() * 9000),
  );

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setAddedId(id);
  };
  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };
  const setQty = (id: number, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => ({ ...prev, [id]: qty }));
  };
  const clearCart = () => setCart({});
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [, qty]) => sum + qty * PRICE, 0);

  useEffect(() => {
    if (addedId === null) return;
    const t = setTimeout(() => setAddedId(null), 1400);
    return () => clearTimeout(t);
  }, [addedId]);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setCols(w < 640 ? 2 : w < 1024 ? 3 : 4);
      setIsTouch(w < 1024 || matchMedia("(pointer: coarse)").matches);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Escape key + scroll lock when any modal is open
  const anyModalOpen = showAbout || showCart || showPrivacy || showOrder || showCheckout;
  useEffect(() => {
    const closeAll = () => {
      setShowAbout(false);
      setShowCart(false);
      setShowPrivacy(false);
      setShowOrder(false);
      setShowCheckout(false);
    };
    if (anyModalOpen) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeAll();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [anyModalOpen]);

  // Custom cursor
  useEffect(() => {
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTouch]);

  // Video load fade-in
  useEffect(() => {
    const l = leftVidRef.current;
    const r = rightVidRef.current;
    const c = canvasRef.current;
    if (!l || !r || !c) return;
    let loaded = 0;
    const check = () => {
      loaded++;
      if (loaded >= 2) c.style.opacity = "1";
    };
    l.addEventListener("loadeddata", check);
    r.addEventListener("loadeddata", check);
    return () => {
      l.removeEventListener("loadeddata", check);
      r.removeEventListener("loadeddata", check);
    };
  }, []);

  // Video interaction: desktop scrub / mobile alternate
  useEffect(() => {
    const l = leftVidRef.current;
    const r = rightVidRef.current;
    if (!l || !r) return;
    if (isTouch) {
      const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      l.style.display = "block";
      r.style.display = "none";
      const playLeft = () => {
        r.style.display = "none";
        l.style.display = "block";
        l.currentTime = 0;
        l.play().catch(() => {});
      };
      const playRight = () => {
        l.style.display = "none";
        r.style.display = "block";
        r.currentTime = 0;
        r.play().catch(() => {});
      };
      l.addEventListener("ended", playRight);
      r.addEventListener("ended", playLeft);
      playLeft();
      return () => {
        l.removeEventListener("ended", playRight);
        r.removeEventListener("ended", playLeft);
      };
    }

    let mx = window.innerWidth / 2;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
    };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      const w = window.innerWidth;
      const center = w / 2;
      const dz = Math.max(30, w * 0.05);
      const dx = mx - center;
      if (Math.abs(dx) <= dz) {
        // dead zone
        const active = activeSideRef.current === "left" ? l : r;
        if (!active.seeking) active.currentTime = 0;
      } else if (dx < 0) {
        // left of center => show RIGHT video
        activeSideRef.current = "right";
        l.style.display = "none";
        r.style.display = "block";
        const range = center - dz;
        const dist = Math.min(range, -dx - dz);
        const progress = Math.max(0, Math.min(1, dist / range));
        if (r.duration && !r.seeking) r.currentTime = progress * r.duration;
      } else {
        activeSideRef.current = "left";
        r.style.display = "none";
        l.style.display = "block";
        const range = center - dz;
        const dist = Math.min(range, dx - dz);
        const progress = Math.max(0, Math.min(1, dist / range));
        if (l.duration && !l.seeking) l.currentTime = progress * l.duration;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  // Scroll driver
  useEffect(() => {
    const panel = panelRef.current;
    const wrap = wrapRef.current;
    const spacer = spacerRef.current;
    if (!panel || !wrap || !spacer) return;

    const recalc = () => {
      const vh = window.innerHeight;
      const maxScroll = Math.max(0, wrap.scrollHeight - vh);
      spacer.style.height = vh + maxScroll + 2 * vh + "px";
      return { vh, maxScroll };
    };
    let { vh, maxScroll } = recalc();

    const st = ScrollTrigger.create({
      trigger: spacer,
      start: "top top",
      end: () => `+=${vh}`,
      scrub: true,
      onUpdate: (self) => {
        panel.style.transform = `translateY(${(1 - self.progress) * 100}vh)`;
      },
    });

    let lastSymbol = 0;
    const cards = () => Array.from(wrap.querySelectorAll<HTMLElement>(".bp-card"));

    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      const w = window.innerWidth;

      // videos visibility
      if (canvasRef.current) {
        canvasRef.current.style.visibility = y > vh ? "hidden" : "visible";
      }
      if (posterRef.current) {
        posterRef.current.style.visibility = y > vh ? "hidden" : "visible";
      }

      // panel + wrap positioning
      let panelOffset = 0;
      if (y <= vh) {
        panelOffset = vh - y;
        wrap.style.transform = "translateY(0px)";
      } else {
        panelOffset = 0;
        wrap.style.transform = `translateY(${-(y - vh)}px)`;
      }

      // cards
      for (const card of cards()) {
        const rect = card.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;
        if (bottom <= 0 || top >= vh) {
          card.style.transform = "scale(0)";
          continue;
        }
        const enter = Math.min(1, (vh - top) / (vh * 0.6));
        const exit = Math.min(1, bottom / (vh * 0.4));
        const s = Math.max(0, Math.min(enter, exit));
        card.style.transform = `scale(${s})`;
      }
      // suppress unused warning
      void panelOffset;

      // outro
      const outroStart = vh + maxScroll;
      const outroRange = vh - 100;
      const p = Math.max(0, Math.min(1, (y - outroStart) / outroRange));
      if (overlayRef.current) overlayRef.current.style.opacity = String(p);
      if (footerRef.current) footerRef.current.style.opacity = String(p);
      if (infoRef.current) {
        const off = Number(infoRef.current.dataset.outroOffset || 166);
        infoRef.current.style.transform = `translateY(${-p * off}px)`;
      }
      if (buyRef.current) {
        buyRef.current.style.transform = `scale(${p})`;
      }

      // symbol randomize
      const now = performance.now();
      if (y > 10 && now - lastSymbol > 80 && symbolRef.current) {
        lastSymbol = now;
        symbolRef.current.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      }
      void w;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      const r = recalc();
      vh = r.vh;
      maxScroll = r.maxScroll;
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    // recalc after images load
    const t = setTimeout(onResize, 500);
    const t2 = setTimeout(onResize, 2000);

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [cols]);

  const layout = buildLayout(IMAGES.length, cols);
  const font = { fontFamily: '"Inter Tight", sans-serif', fontWeight: 500 };

  return (
    <div
      id="scroll-spacer"
      ref={spacerRef}
      style={{
        position: "relative",
        userSelect: "none",
        background: "#fff",
        height: "500vh",
        cursor: isTouch ? "auto" : "none",
      }}
    >
      {/* Custom cursor */}
      {!isTouch && (
        <div
          ref={cursorRef}
          style={{
            position: "fixed",
            pointerEvents: "none",
            zIndex: 50,
            transform: "translate(-50%, -50%)",
            mixBlendMode: "exclusion",
            left: 0,
            top: 0,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22.75" stroke="white" strokeWidth="2.5" fill="none" />
            <path
              d="M24 10 L24 38 M14 18 L34 18 M14 30 L34 30 M18 14 L30 34 M30 14 L18 34"
              stroke="white"
              strokeWidth="1.5"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>
      )}

      {/* Instant poster (fallback while videos load) */}
      <div
        ref={posterRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: `url(${heroRight}) center / cover no-repeat`,
        }}
      />

      {/* Video canvas */}
      <div
        id="main-canvas"
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <video
          ref={leftVidRef}
          src={LEFT_VIDEO}
          poster={heroLeft}
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "none",
          }}
        />
        <video
          ref={rightVidRef}
          src={RIGHT_VIDEO}
          poster={heroRight}
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Mobile canvas offset override */}
      <style>{`
        @media (max-width: 1023px) {
          #main-canvas {
            top: 220px !important;
            inset: auto !important;
            left: 0 !important;
            width: 100vw !important;
            height: calc(100vh - 220px) !important;
          }
        }
      `}</style>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing, delay: 0 }}
        className="fixed"
        style={{
          zIndex: 20,
          mixBlendMode: "exclusion",
          top: "var(--pad-y)",
          left: "var(--pad-x)",
          width: "var(--logo-w)",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg viewBox="0 0 280 110" fill="white" style={{ width: "100%", height: "auto" }}>
          <text
            x="0"
            y="88"
            fontFamily='"Inter Tight", sans-serif'
            fontWeight="500"
            fontSize="110"
            letterSpacing="-6"
            fill="white"
          >
            FLUX
          </text>
          <circle cx="260" cy="20" r="14" stroke="white" strokeWidth="2" fill="none" />
          <text
            x="260"
            y="26"
            textAnchor="middle"
            fontFamily='"Inter Tight", sans-serif'
            fontWeight="500"
            fontSize="16"
            fill="white"
          >
            R
          </text>
        </svg>
      </motion.div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing, delay: 0.3 }}
        className="fixed pointer-events-none"
        style={{
          zIndex: 20,
          mixBlendMode: "exclusion",
          left: "var(--pad-x)",
          top: "var(--caption-top)",
          width: "var(--caption-w)",
          color: "#fff",
          fontSize: 12,
          lineHeight: "140%",
          letterSpacing: "-0.04em",
          ...font,
        }}
      >
        When switching between videos near the center, do not reset currentTime to 0 abruptly. Add a
        small dead zone: if cursor is within +/-50px of center, keep both videos at currentTime = 0
        and show whichever was last active.
      </motion.div>

      {/* Header nav */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing, delay: 0.15 }}
        className="fixed flex items-center justify-between"
        style={{
          zIndex: 20,
          mixBlendMode: "exclusion",
          top: "var(--pad-y)",
          right: "var(--pad-x)",
          height: 30,
          width: "var(--nav-w)",
          color: "#fff",
          pointerEvents: "auto",
          ...font,
        }}
      >
        <span
          className="hidden sm:inline cursor-pointer"
          style={{ fontSize: 15, textTransform: "uppercase", ...font }}
          onClick={() => setShowAbout(true)}
        >
          ABOUT
        </span>
        <div className="flex items-center" style={{ gap: "var(--nav-gap)" }}>
          <svg
            viewBox="0 0 40 40"
            fill="none"
            className="cursor-pointer"
            style={{ width: "var(--burger)", height: "var(--burger)" }}
            onClick={() => setShowAbout(true)}
          >
            <path d="M0 14H40" stroke="white" strokeWidth="2.5" />
            <path d="M0 26H40" stroke="white" strokeWidth="2.5" />
          </svg>
          <span
            className="cursor-pointer flex items-center gap-2"
            style={{ fontSize: "var(--cart-fs)", ...font }}
            onClick={() => setShowCart(true)}
          >
            [ CART ]
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 18,
                  height: 18,
                  padding: "0 5px",
                  borderRadius: 999,
                  background: "#25D366",
                  color: "#000",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {cartCount}
              </motion.span>
            )}
          </span>
        </div>
      </motion.div>

      {/* Product info */}
      <motion.div
        id="outro-info"
        ref={infoRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: easing, delay: 0.45 }}
        className="fixed pointer-events-none flex flex-col items-center"
        data-outro-offset={typeof window !== "undefined" && window.innerWidth < 1024 ? 132 : 166}
        style={{
          zIndex: 20,
          mixBlendMode: "exclusion",
          color: "#fff",
          ...font,
        }}
      >
        <div
          className="flex flex-col items-start"
          style={{
            width: "var(--info-top-w)",
            marginBottom: "var(--info-mb)",
          }}
        >
          <div
            className="relative"
            style={{ width: "var(--circle-sz)", height: "var(--circle-sz)" }}
          >
            <svg viewBox="0 0 40 40" style={{ width: "100%", height: "100%" }}>
              <circle
                cx="20"
                cy="20"
                r="18.75"
                stroke="white"
                strokeWidth="var(--circle-stroke)"
                fill="none"
              />
            </svg>
            <span
              id="circle-symbol"
              ref={symbolRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                fontSize: "var(--circle-fs)",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: "#fff",
                ...font,
              }}
            >
              8
            </span>
          </div>
          <div
            style={{
              fontSize: "var(--label-fs)",
              lineHeight: "100%",
              textAlign: "center",
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              marginTop: 12,
              width: "100%",
              ...font,
            }}
          >
            ARCHIVE COLLECTION
            <br />
            "FLUX"
          </div>
        </div>
        <div
          style={{
            fontSize: "var(--price-fs)",
            lineHeight: "100%",
            textAlign: "center",
            letterSpacing: "-0.04em",
            ...font,
          }}
        >
          $97,33
        </div>
      </motion.div>

      {/* View button */}
      <div
        id="outro-buy"
        ref={buyRef}
        className="fixed flex items-center justify-center"
        onClick={() => setShowOrder(true)}
        style={{
          zIndex: 20,
          mixBlendMode: "exclusion",
          background: "#fff",
          borderRadius: 1335,
          transform: "scale(0)",
          transformOrigin: "right bottom",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: "var(--view-fs)",
            letterSpacing: "-0.04em",
            color: "#fff",
            mixBlendMode: "exclusion",
            ...font,
          }}
        >
          view
        </span>
      </div>

      {/* Black panel with gallery */}
      <div
        ref={panelRef}
        style={{
          position: "fixed",
          inset: 0,
          background: "#000",
          zIndex: 10,
          transform: "translateY(100vh)",
        }}
      >
        <div
          ref={wrapRef}
          style={{
            width: "100%",
            paddingTop: "min(400px, 40vh)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: 0,
            }}
          >
            {layout.map((imgIdx, i) => {
              if (imgIdx === -1) {
                return <div key={i} style={{ aspectRatio: "2 / 3" }} />;
              }
              const col = i % cols;
              const isLeftHalf = col < cols / 2;
              const id = imgIdx;
              const inCart = (cart[id] || 0) > 0;
              const justAdded = addedId === id;
              return (
                <div
                  key={i}
                  className="bp-card"
                  style={{
                    aspectRatio: "2 / 3",
                    transform: "scale(0)",
                    transformOrigin: isLeftHalf ? "right bottom" : "left bottom",
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={IMAGES[imgIdx]}
                    alt={productName(id)}
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                    onClick={() => addToCart(id)}
                  />
                  <div
                    onClick={() => addToCart(id)}
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(255,255,255,0.92)",
                      color: "#000",
                      borderRadius: 999,
                      padding: "7px 14px",
                      fontSize: 12,
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                      ...font,
                      fontWeight: 600,
                    }}
                  >
                    {justAdded ? (
                      <span className="flex items-center gap-1">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ color: "#16a34a" }}
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Added
                      </span>
                    ) : inCart ? (
                      <span className="flex items-center gap-1">In cart ({cart[id]})</span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* White overlay */}
      <div
        id="outro-overlay"
        ref={overlayRef}
        className="fixed pointer-events-none"
        style={{ inset: 0, background: "#fff", opacity: 0, zIndex: 12 }}
      />

      {/* Footer */}
      <div
        id="outro-footer"
        ref={footerRef}
        className="fixed flex"
        style={{
          left: 16,
          bottom: "var(--footer-b)",
          right: 16,
          mixBlendMode: "exclusion",
          opacity: 0,
          gap: "var(--footer-gap)",
          color: "#fff",
          fontSize: "var(--footer-fs)",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          justifyContent: "var(--footer-justify)",
          pointerEvents: "auto",
          ...font,
        }}
      >
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer"
        >
          FLUX (R) 2026
        </span>
        <span className="cursor-pointer" onClick={() => setShowPrivacy(true)}>
          PRIVACY POLICY
        </span>
      </div>

      {/* Responsive vars */}
      <style>{`
        #scroll-spacer {
          --pad-x: 16px;
          --pad-y: 16px;
          --logo-w: 124px;
          --caption-top: 118px;
          --caption-w: calc(100vw - 32px);
          --nav-w: auto;
          --nav-gap: 20px;
          --burger: 24px;
          --cart-fs: 13px;
          --circle-sz: 20px;
          --circle-stroke: 2;
          --circle-fs: 10px;
          --label-fs: 20px;
          --price-fs: 60px;
          --view-fs: 72px;
          --info-top-w: 252px;
          --info-mb: 12px;
          --footer-b: 24px;
          --footer-gap: 0px;
          --footer-fs: 11px;
          --footer-justify: space-between;
        }
        @media (min-width: 640px) {
          #scroll-spacer {
            --logo-w: 266px;
            --caption-top: 180px;
            --caption-w: calc(50vw - 48px);
          }
        }
        @media (min-width: 1024px) {
          #scroll-spacer {
            --pad-x: 32px;
            --pad-y: 32px;
            --logo-w: 355px;
            --caption-top: 244px;
            --caption-w: 692px;
            --nav-w: 330px;
            --nav-gap: 50px;
            --burger: 30px;
            --cart-fs: 15px;
            --circle-sz: 30px;
            --circle-stroke: 2.5;
            --circle-fs: 15px;
            --label-fs: 30px;
            --price-fs: 80px;
            --view-fs: 110px;
            --info-top-w: 100%;
            --info-mb: 32px;
            --footer-b: 32px;
            --footer-gap: 80px;
            --footer-fs: 13px;
            --footer-justify: flex-start;
          }
        }
        #outro-info {
          right: 0;
          left: 0;
          bottom: 48px;
          width: 100%;
        }
        @media (min-width: 1024px) {
          #outro-info {
            right: 32px;
            left: auto;
            bottom: 80px;
            width: 330px;
          }
        }
        #outro-buy {
          left: 16px;
          right: 16px;
          bottom: 60px;
          height: 100px;
        }
        @media (min-width: 1024px) {
#outro-buy {
          left: auto;
          right: 32px;
          bottom: 32px;
          width: 330px;
          height: 174px;
        }
      `}</style>

      {/* Floating WhatsApp button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact us on WhatsApp"
        style={{
          position: "fixed",
          right: "var(--pad-x)",
          top: "calc(var(--pad-y) + 46px)",
          zIndex: 40,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(37, 211, 102, 0.4)",
        }}
      >
        <svg viewBox="0 0 32 32" width="24" height="24" fill="white">
          <path d="M16 3C9.1 3 3.5 8.6 3.5 15.5c0 2.2.6 4.3 1.7 6.2L3.4 29l7.5-1.8c1.7.8 3.5 1.3 5.4 1.3h0c6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3zm0 22.6c-2 0-3.9-.6-5.5-1.6L10 23.8l-3.4.8.9-3.3c-1.1-1.6-1.7-3.5-1.7-5.5C5.8 9.8 10.4 5.2 16 5.2S26.2 9.8 26.2 15.5 21.6 25.6 16 25.6zm5.9-8.2c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.1-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.4 5.4 4.8.7.3 1.3.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z" />
        </svg>
      </motion.a>

      {/* About modal */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAbout(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: easing }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#000",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 24,
                padding: "40px 32px",
                maxWidth: 480,
                width: "100%",
                ...font,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>FLUX</div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: "170%",
                  letterSpacing: "-0.02em",
                  opacity: 0.85,
                  marginBottom: 24,
                }}
              >
                FLUX is a scroll-driven archive collection. Each piece is a statement — limited,
                numbered, and released only once. Browse the archive and find something that speaks
                to you.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#25D366",
                  color: "#fff",
                  padding: "12px 22px",
                  borderRadius: 999,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                <svg viewBox="0 0 32 32" width="18" height="18" fill="white">
                  <path d="M16 3C9.1 3 3.5 8.6 3.5 15.5c0 2.2.6 4.3 1.7 6.2L3.4 29l7.5-1.8c1.7.8 3.5 1.3 5.4 1.3h0c6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3zm0 22.6c-2 0-3.9-.6-5.5-1.6L10 23.8l-3.4.8.9-3.3c-1.1-1.6-1.7-3.5-1.7-5.5C5.8 9.8 10.4 5.2 16 5.2S26.2 9.8 26.2 15.5 21.6 25.6 16 25.6zm5.9-8.2c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.1-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.4 5.4 4.8.7.3 1.3.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z" />
                </svg>
                Chat on WhatsApp
              </a>
              <button
                onClick={() => setShowAbout(false)}
                style={{
                  display: "block",
                  marginTop: 20,
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  opacity: 0.6,
                  fontSize: 13,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCart(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: easing }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                color: "#000",
                borderRadius: 24,
                padding: "32px 28px",
                maxWidth: 480,
                width: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                ...font,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Your Cart</div>

              {cartCount === 0 ? (
                <>
                  <p style={{ fontSize: 15, lineHeight: "170%", opacity: 0.7, marginBottom: 24 }}>
                    Your cart is currently empty. Tap any piece in the archive to add it.
                  </p>
                  <button
                    onClick={() => setShowCart(false)}
                    style={{
                      width: "100%",
                      background: "#000",
                      color: "#fff",
                      border: "none",
                      borderRadius: 12,
                      padding: "14px 0",
                      fontSize: 15,
                      cursor: "pointer",
                    }}
                  >
                    Browse the Collection
                  </button>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      marginBottom: 20,
                    }}
                  >
                    {Object.entries(cart).map(([idStr, qty]) => {
                      const id = Number(idStr);
                      return (
                        <div
                          key={id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: 12,
                            border: "1px solid #eee",
                            borderRadius: 14,
                          }}
                        >
                          <img
                            src={IMAGES[id]}
                            alt={productName(id)}
                            loading="lazy"
                            decoding="async"
                            style={{
                              width: 52,
                              height: 72,
                              objectFit: "cover",
                              borderRadius: 8,
                              flexShrink: 0,
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                letterSpacing: "0.02em",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {productName(id)}
                            </div>
                            <div style={{ fontSize: 13, opacity: 0.6, marginTop: 2 }}>
                              {formatPrice(PRICE)}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              border: "1px solid #eee",
                              borderRadius: 999,
                              padding: "4px 8px",
                            }}
                          >
                            <button
                              onClick={() => setQty(id, qty - 1)}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                fontSize: 16,
                                color: "#000",
                                padding: "0 2px",
                              }}
                            >
                              −
                            </button>
                            <span style={{ fontSize: 13, minWidth: 16, textAlign: "center" }}>
                              {qty}
                            </span>
                            <button
                              onClick={() => setQty(id, qty + 1)}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                fontSize: 16,
                                color: "#000",
                                padding: "0 2px",
                              }}
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(id)}
                            aria-label="Remove item"
                            style={{
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                              color: "#999",
                              fontSize: 16,
                              padding: 4,
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      padding: "16px 0",
                      borderTop: "1px solid #eee",
                      borderBottom: "1px solid #eee",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 14,
                        opacity: 0.7,
                      }}
                    >
                      <span>Items ({cartCount})</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 14,
                        opacity: 0.7,
                      }}
                    >
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 17,
                        fontWeight: 600,
                      }}
                    >
                      <span>Total</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCheckoutStep("form");
                      setOrderNumber("FLX-" + Math.floor(1000 + Math.random() * 9000));
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    style={{
                      width: "100%",
                      background: "#000",
                      color: "#fff",
                      border: "none",
                      borderRadius: 12,
                      padding: "14px 0",
                      fontSize: 15,
                      cursor: "pointer",
                    }}
                  >
                    Checkout — {formatPrice(cartTotal)}
                  </button>
                </>
              )}

              <button
                onClick={() => setShowCart(false)}
                style={{
                  width: "100%",
                  marginTop: 10,
                  background: "transparent",
                  color: "#000",
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: "12px 0",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPrivacy(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: easing }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                color: "#000",
                borderRadius: 24,
                padding: "40px 32px",
                maxWidth: 480,
                width: "100%",
                ...font,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>Privacy Policy</div>
              <p style={{ fontSize: 14, lineHeight: "170%", opacity: 0.7, marginBottom: 8 }}>
                FLUX respects your privacy. We don't sell or share your personal data with third
                parties. Orders are handled privately via WhatsApp conversation with our team.
              </p>
              <p style={{ fontSize: 14, lineHeight: "170%", opacity: 0.7 }}>
                Questions? Reach us any time on WhatsApp.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 20,
                  background: "#25D366",
                  color: "#fff",
                  padding: "12px 22px",
                  borderRadius: 999,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                Contact Us
              </a>
              <button
                onClick={() => setShowPrivacy(false)}
                style={{
                  display: "block",
                  marginTop: 20,
                  background: "transparent",
                  border: "none",
                  color: "#000",
                  opacity: 0.6,
                  fontSize: 13,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order modal */}
      <AnimatePresence>
        {showOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOrder(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ duration: 0.35, ease: easing }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#000",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 24,
                padding: "40px 32px",
                maxWidth: 520,
                width: "100%",
                textAlign: "center",
                ...font,
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>
                ARCHIVE COLLECTION
              </div>
              <div style={{ fontSize: 16, opacity: 0.6, marginBottom: 20 }}>
                &ldquo;FLUX&rdquo; — Limited Release
              </div>
              <img
                src={IMAGES[0]}
                alt="FLUX archive piece"
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  maxWidth: 380,
                  aspectRatio: "2/3",
                  objectFit: "cover",
                  borderRadius: 16,
                  margin: "0 auto 24px",
                  display: "block",
                }}
              />
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  marginBottom: 28,
                }}
              >
                {formatPrice(PRICE)}
              </div>
              <button
                onClick={() => {
                  addToCart(0);
                  setShowOrder(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  background: "#fff",
                  color: "#000",
                  border: "none",
                  borderRadius: 999,
                  padding: "16px 0",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginBottom: 12,
                }}
              >
                Add to Cart — {formatPrice(PRICE)}
              </button>
              <a
                href={WHATSAPP_ORDER_URL("FLUX Archive Collection — $97,33")}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  width: "100%",
                  background: "#25D366",
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "16px 0",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                Order via WhatsApp
              </a>
              <span
                onClick={() => setShowOrder(false)}
                style={{
                  display: "block",
                  marginTop: 16,
                  fontSize: 13,
                  opacity: 0.6,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Close
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout modal (fake payment) */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCheckout(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 70,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(12px, 3vw, 24px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 24 }}
              transition={{ duration: 0.3, ease: easing }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                color: "#000",
                borderRadius: "clamp(18px, 3vw, 24px)",
                padding: "clamp(24px, 5vw, 36px) clamp(20px, 4vw, 28px)",
                maxWidth: 440,
                width: "100%",
                minHeight: "min(400px, 70dvh)",
                maxHeight: "calc(100dvh - 24px)",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                boxSizing: "border-box",
                ...font,
              }}
            >
              {checkoutStep === "form" && (
                <>
                  <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Checkout</div>
                  <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 20 }}>
                    {cartCount} item{cartCount === 1 ? "" : "s"} — Total{" "}
                    <b>{formatPrice(cartTotal)}</b> · Demo payment (no real charge)
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <input
                      placeholder="Cardholder name"
                      defaultValue="FLUX CUSTOMER"
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "clamp(10px, 2vw, 12px)",
                        padding: "clamp(13px, 3vw, 15px) 14px",
                        fontSize: 16,
                        outline: "none",
                        boxSizing: "border-box",
                        width: "100%",
                        WebkitAppearance: "none",
                        appearance: "none",
                      }}
                    />
                    <input
                      placeholder="4242 4242 4242 4242"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "clamp(10px, 2vw, 12px)",
                        padding: "clamp(13px, 3vw, 15px) 14px",
                        fontSize: 16,
                        outline: "none",
                        boxSizing: "border-box",
                        width: "100%",
                        WebkitAppearance: "none",
                        appearance: "none",
                      }}
                    />
                    <div style={{ display: "flex", gap: 12 }}>
                      <input
                        placeholder="MM / YY"
                        autoComplete="cc-exp"
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "clamp(10px, 2vw, 12px)",
                          padding: "clamp(13px, 3vw, 15px) 14px",
                          fontSize: 16,
                          outline: "none",
                          boxSizing: "border-box",
                          width: "50%",
                          WebkitAppearance: "none",
                          appearance: "none",
                        }}
                      />
                      <input
                        placeholder="CVC"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "clamp(10px, 2vw, 12px)",
                          padding: "clamp(13px, 3vw, 15px) 14px",
                          fontSize: 16,
                          outline: "none",
                          boxSizing: "border-box",
                          width: "50%",
                          WebkitAppearance: "none",
                          appearance: "none",
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCheckoutStep("processing");
                      setTimeout(() => setCheckoutStep("done"), 1800);
                    }}
                    style={{
                      width: "100%",
                      marginTop: 20,
                      background: "#000",
                      color: "#fff",
                      border: "none",
                      borderRadius: 999,
                      padding: "15px 0",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Pay {formatPrice(cartTotal)}
                  </button>
                  <span
                    onClick={() => setShowCheckout(false)}
                    style={{
                      display: "block",
                      marginTop: 14,
                      textAlign: "center",
                      fontSize: 13,
                      opacity: 0.6,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Cancel
                  </span>
                </>
              )}

              {checkoutStep === "processing" && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "4px solid #eee",
                      borderTopColor: "#000",
                      margin: "0 auto 18px",
                    }}
                  />
                  <div style={{ fontSize: 15 }}>Processing payment…</div>
                  <div style={{ fontSize: 12, opacity: 0.5, marginTop: 6 }}>
                    Demo checkout — nothing is charged
                  </div>
                </div>
              )}

              {checkoutStep === "done" && (
                <div style={{ textAlign: "center", padding: "10px 0" }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "#16a34a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 18px",
                    }}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>Order Confirmed!</div>
                  <div style={{ fontSize: 13, opacity: 0.6, marginTop: 6 }}>
                    Order #{orderNumber} · {formatPrice(cartTotal)}
                  </div>
                  <a
                    href={WHATSAPP_ORDER_URL(
                      `FLUX order ${orderNumber} (${cartCount} item(s), ${formatPrice(cartTotal)})`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 20,
                      background: "#25D366",
                      color: "#fff",
                      border: "none",
                      borderRadius: 999,
                      padding: "14px 0",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    Confirm on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      clearCart();
                      setShowCheckout(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 12,
                      background: "transparent",
                      color: "#000",
                      border: "1px solid #ddd",
                      borderRadius: 999,
                      padding: "12px 0",
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
