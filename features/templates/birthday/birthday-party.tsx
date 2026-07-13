"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { Copy, Check } from "lucide-react";

type BirthdayPartyProps = {
  title: string;
  message: string;
  category: string;
  image?: string;
};

export default function BirthdayParty({
  title,
  message,
  category,
  image,
}: BirthdayPartyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const messageLinesRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const heartStreamRef = useRef<HTMLDivElement>(null);
  
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // UI States for modern toast feedback
  const [copied, setCopied] = useState(false);

  // Check if the message is long (more than 500 characters)
  const isLongMessage = message.length > 500;

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#f43f5e", "#ec4899", "#f59e0b", "#3b82f6"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#f43f5e", "#ec4899", "#f59e0b", "#3b82f6"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      triggerConfetti();

      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((p) => {
          gsap.set(p, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 0.8,
            scale: Math.random() * 1.2 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
          });
          
          gsap.to(p, {
            x: `+=${Math.random() * 140 - 70}`,
            y: `+=${Math.random() * 140 - 70}`,
            duration: Math.random() * 6 + 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          rotate: 360,
          duration: 12,
          repeat: -1,
          ease: "none",
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 60, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2 }
      );

      tl.fromTo(
        [titleRef.current, categoryRef.current],
        { opacity: 0, y: -20, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.15 },
        "-=0.6"
      );

      tl.fromTo(
        heartRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.15,
          duration: 0.8,
          ease: "back.out(2)",
          onComplete: () => {
            gsap.to(heartRef.current, {
              scale: 1.1,
              duration: 0.8,
              yoyo: true,
              repeat: -1,
              ease: "power1.inOut",
            });
          },
        },
        "-=0.4"
      );

      tl.fromTo(
        messageBoxRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.7, ease: "power3.inOut" },
        "-=0.5"
      );

      tl.fromTo(
        messageLinesRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.3"
      );

      if (imageContainerRef.current) {
        tl.fromTo(
          imageContainerRef.current,
          { opacity: 0, scale: 0.7, rotationY: 45 },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
            onComplete: () => {
              const heartIcons = ["❤️", "💖", "💝", "💕"];
              for (let i = 0; i < 8; i++) {
                const heartEl = document.createElement("div");
                heartEl.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
                heartEl.style.position = "absolute";
                heartEl.style.bottom = "-20px";
                heartEl.style.left = `${Math.random() * 90 + 5}%`;
                heartEl.style.fontSize = `${Math.random() * 12 + 16}px`;
                heartEl.style.opacity = "0";
                heartStreamRef.current?.appendChild(heartEl);

                gsap.to(heartEl, {
                  y: -240,
                  x: `+=${Math.sin(i) * 20}`,
                  opacity: 0.7,
                  scale: 1.2,
                  duration: Math.random() * 2.5 + 2,
                  repeat: -1,
                  delay: Math.random() * 1.5,
                  ease: "power1.out",
                });
              }
            }
          },
          "-=0.5"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const showToastFeedback = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyOrShareLink = useCallback(async () => {
    try {
      const url = window.location.href;

      if (typeof navigator.share === "function") {
        await navigator.share({
          title,
          text: message,
          url,
        });
        return;
      }

      if (typeof navigator.clipboard?.writeText === "function") {
        await navigator.clipboard.writeText(url);
        showToastFeedback();
        return;
      }

      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      showToastFeedback();
    } catch(error) {
      // Graceful error state handling
      console.log(error)
    }
  }, [title, message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4 bg-radial from-zinc-50 via-zinc-100 to-rose-50/40 dark:from-zinc-950 dark:via-black dark:to-zinc-950/40 overflow-x-hidden relative select-none">
      
      {/* 1. Background Particles & Premium Blurs */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 max-h-screen">
        <div className="absolute w-48 h-48 rounded-full bg-rose-400/10 dark:bg-rose-500/5 blur-3xl mix-blend-multiply" />
        <div className="absolute w-64 h-64 rounded-full bg-amber-300/10 dark:bg-amber-500/5 blur-3xl mix-blend-screen" />
        <div className="absolute w-56 h-56 rounded-full bg-purple-400/10 dark:bg-purple-500/5 blur-3xl" />
      </div>

      {/* Success Floating Toast feedback */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-zinc-900/95 dark:bg-white text-white dark:text-zinc-950 px-4 py-2.5 rounded-full shadow-xl transition-all duration-300 backdrop-blur-md border border-white/10 text-sm font-semibold tracking-wide ${copied ? 'opacity-100 translate-y-2 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}`}>
        <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
        Link copied securely!
      </div>

      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center z-10 group/card">
        
        {/* 2. Ambient Neon Glowing Backlight */}
        <div 
          ref={glowRef} 
          className="absolute -inset-4 rounded-[2.5rem] opacity-40 dark:opacity-20 blur-3xl bg-linear-to-tr from-rose-500 via-pink-500 via-purple-500 to-amber-400 z-0 pointer-events-none scale-102 transition-opacity duration-500 group-hover/card:opacity-60"
        />

        {/* MAIN CARD CONTAINER */}
        <div
          ref={containerRef}
          style={{ perspective: 1000 }}
          // className="w-full rounded-[2rem] border border-white/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl p-6 sm:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08),_inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4),_inset_0_1px_0_rgba(255,255,255,0.05)] space-y-8 relative overflow-hidden z-10 transition-all duration-500 hover:shadow-[0_40px_80px_-12px_rgba(244,63,94,0.12)] hover:-translate-y-1"
          className="w-full rounded-[2rem] border border-white/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl p-6 sm:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] space-y-8 relative overflow-hidden z-10 transition-all duration-500 hover:shadow-[0_40px_80px_-12px_rgba(244,63,94,0.12)] hover:-translate-y-1"
        >
          <div className="absolute top-4 left-6 text-xl opacity-40 animate-pulse">✨</div>
          <div className="absolute bottom-6 right-6 text-xl opacity-40 animate-pulse delay-700">🎈</div>

          {/* HEADER SECTION */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 border-b border-zinc-200/40 dark:border-zinc-800/40 pb-6">
            <div className="text-center sm:text-left space-y-2 flex-1">
              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl font-black tracking-tight bg-linear-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-sm pb-1 font-serif"
              >
                {title}
              </h1>

              <span
                ref={categoryRef}
                className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-zinc-900/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-500/10"
              >
                {category}
              </span>
            </div>

            {/* Premium Share Pill Button */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={handleCopyOrShareLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-950 transition-all duration-300 shadow-sm shadow-zinc-200/50 hover:scale-105 active:scale-98 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Share Magic Link
              </button>
            </div>
          </div>

          {/* MESSAGE QUOTE CONTAINER */}
          <div className="relative flex items-center justify-center py-4">
            <div
              ref={heartRef}
              className="absolute z-0 pointer-events-none opacity-0 select-none text-rose-500/10 dark:text-rose-500/5 filter drop-shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-40 h-40 sm:w-56 sm:h-56"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>

            <div
              ref={messageBoxRef}
              className={`w-full z-10 px-6 py-6 border border-white/40 dark:border-zinc-800/40 bg-linear-to-b from-white/30 to-zinc-50/10 dark:from-zinc-900/30 dark:to-zinc-950/10 backdrop-blur-xs rounded-2xl shadow-inner relative group/quote ${
                isLongMessage ? "max-h-56 overflow-y-auto" : "h-auto"
              }`}
            >
              {/* Premium Top Open Quote */}
              <span className="absolute top-2 left-3 text-3xl font-serif text-rose-400/40 dark:text-rose-500/20 select-none">❝</span>
              
              <p
                ref={messageLinesRef}
                className="whitespace-pre-wrap leading-relaxed text-zinc-800 dark:text-zinc-200 font-medium text-base sm:text-lg text-center italic px-4 py-2 font-sans selection:bg-rose-100 dark:selection:bg-rose-950"
              >
                {message}
              </p>
              
              {/* Premium Bottom Close Quote */}
              <span className="absolute bottom-0 right-3 text-3xl font-serif text-rose-400/40 dark:text-rose-500/20 select-none">❞</span>
            </div>
          </div>

          {/* LUXURY PHOTOGRAPH FRAME HERO SECTION */}
          {image && (
            <div className="relative w-full overflow-visible py-2 group/frame">
              <div 
                ref={heartStreamRef} 
                className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl" 
              />

              <div
                ref={imageContainerRef}
                className="relative rounded-2xl p-2.5 shadow-2xl border border-white/60 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-950/80 backdrop-blur-md z-10 transition-all duration-500 group-hover/frame:shadow-rose-500/5 group-hover/frame:-translate-y-0.5"
              >
                <div className="overflow-hidden rounded-xl relative bg-zinc-900">
                  <Image
                    src={image}
                    alt={title}
                    width={850}
                    height={450}
                    className="max-h-64 sm:max-h-80 w-full object-contain mx-auto transition-transform duration-700 ease-out group-hover/frame:scale-103"
                    priority
                  />
                  {/* High-end cinematic color tint mesh */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. MINIMAL LUXURY FOOTER */}
        <div className="mt-6 text-center text-xs tracking-wider text-zinc-400 font-medium select-none pointer-events-none">
          Made with <span className="text-rose-500 animate-pulse inline-block">❤️</span> using <span className="text-zinc-600 dark:text-zinc-300 font-semibold">WishAura</span>
        </div>
      </div>
    </div>
  );
}