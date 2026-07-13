"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { Copy, Check } from "lucide-react";

type BirthdayElegantProps = {
  title: string;
  message: string;
  category: string;
  image?: string;
};

export default function BirthdayElegant({
  title,
  message,
  category,
  image,
}: BirthdayElegantProps) {
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
        // Elevated color palette to complement luxury gold/amber themes
        colors: ["#d97706", "#f59e0b", "#fbbf24", "#fff7ed"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#d97706", "#f59e0b", "#fbbf24", "#fff7ed"],
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
              // Custom luxurious golden/champagne micro-sparks instead of standard emojis
              const heartIcons = ["✨", "✦", "🍁", "⚜"];
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
      console.log(error)
    }
  }, [title, message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4 bg-radial from-zinc-900 via-zinc-950 to-black overflow-x-hidden relative select-none antialiased">
      
      {/* 1. Background Particles & Premium Blurs */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 max-h-screen opacity-70">
        <div className="absolute w-96 h-96 rounded-full bg-amber-500/5 blur-3xl mix-blend-screen top-1/4 left-1/4" />
        <div className="absolute w-80 h-80 rounded-full bg-zinc-800/20 blur-3xl mix-blend-multiply bottom-1/4 right-1/4" />
        <div className="absolute w-64 h-64 rounded-full bg-yellow-600/5 blur-3xl top-10 right-10" />
      </div>

      {/* Success Floating Toast feedback */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-zinc-900/90 text-amber-100 px-5 py-3 rounded-full shadow-2xl transition-all duration-400 backdrop-blur-xl border border-amber-500/30 text-xs font-semibold tracking-widest uppercase ${copied ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}`}>
        <Check className="w-3.5 h-3.5 text-amber-400" />
        Link copied securely
      </div>

      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center z-10 group/card px-1 sm:px-0">
        
        {/* 2. Ambient Neon Glowing Backlight */}
        <div 
          ref={glowRef} 
          className="absolute -inset-4 rounded-[3rem] opacity-30 blur-3xl bg-linear-to-tr from-amber-600 via-zinc-800 to-yellow-500 z-0 pointer-events-none scale-102 transition-opacity duration-700 group-hover/card:opacity-40"
        />

        {/* MAIN CARD CONTAINER */}
        <div
          ref={containerRef}
          style={{ perspective: 1000 }}
          className="w-full rounded-[2.5rem] border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-3xl p-6 sm:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.03)] space-y-10 relative overflow-hidden z-10 transition-all duration-500 hover:shadow-[0_40px_100px_-15px_rgba(217,119,6,0.08)] hover:-translate-y-1"
        >
          {/* Subtle Premium Geometry */}
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
          <div className="absolute bottom-4 left-6 text-xs text-amber-500/10 tracking-widest font-serif pointer-events-none select-none">M M X X V I</div>

          {/* HEADER SECTION */}
          <div className="flex flex-col items-center text-center space-y-4 pb-4">
            <span
              ref={categoryRef}
              className="inline-block px-4 py-1.5 text-[9px] font-bold tracking-[0.3em] uppercase rounded-full bg-amber-500/5 text-amber-400/90 border border-amber-500/20 shadow-inner"
            >
              {category}
            </span>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-6xl font-normal tracking-tight bg-linear-to-b from-amber-100 via-amber-300 to-amber-600 bg-clip-text text-transparent drop-shadow-md pb-2 font-serif"
            >
              {title}
            </h1>
            
            {/* Golden Elegant Divider */}
            <div className="w-16 h-[1px] bg-linear-to-r from-transparent via-amber-400/40 to-transparent my-1" />
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
                className="relative rounded-2xl p-2 shadow-2xl border border-zinc-800 bg-zinc-950 backdrop-blur-md z-10 transition-all duration-500 group-hover/frame:border-amber-500/30 shadow-black/80"
              >
                {/* Internal Luxury Border Ring */}
                <div className="absolute inset-3 border border-amber-500/10 rounded-xl pointer-events-none z-20 transition-all duration-500 group-hover/frame:border-amber-500/20" />
                
                <div className="overflow-hidden rounded-xl relative bg-zinc-950">
                  <Image
                    src={image}
                    alt={title}
                    width={850}
                    height={450}
                    className="max-h-64 sm:max-h-85 w-full object-contain mx-auto transition-transform duration-1000 ease-out group-hover/frame:scale-102"
                    priority
                  />
                  {/* High-end cinematic dark overlay mesh */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10 pointer-events-none mix-blend-multiply" />
                </div>
              </div>
            </div>
          )}

          {/* MESSAGE QUOTE CONTAINER */}
          <div className="relative flex items-center justify-center pt-2">
            <div
              ref={heartRef}
              className="absolute z-0 pointer-events-none opacity-0 select-none text-amber-500/5 filter drop-shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-48 h-48 sm:w-64 sm:h-64"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>

            <div
              ref={messageBoxRef}
              className={`w-full z-10 px-8 py-8 border border-zinc-800/60 bg-linear-to-b from-zinc-900/40 to-zinc-950/40 backdrop-blur-xs rounded-2xl relative group/quote shadow-inner ${
                isLongMessage ? "max-h-60 overflow-y-auto custom-scrollbar" : "h-auto"
              }`}
            >
              {/* Premium Top Open Quote */}
              <span className="absolute top-2 left-4 text-4xl font-serif text-amber-500/10 select-none">❝</span>
              
              <p
                ref={messageLinesRef}
                className="whitespace-pre-wrap leading-relaxed text-zinc-300 font-normal text-base sm:text-lg text-center italic px-4 py-2 font-serif selection:bg-amber-500/20 selection:text-amber-200"
              >
                {message}
              </p>
              
              {/* Premium Bottom Close Quote */}
              <span className="absolute bottom-0 right-4 text-4xl font-serif text-amber-500/10 select-none">❞</span>
            </div>
          </div>

          {/* UTILITY ACTION REGION */}
          <div className="flex justify-center items-center pt-4 border-t border-zinc-800/40">
            <button
              type="button"
              onClick={handleCopyOrShareLink}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-amber-500/20 bg-zinc-950/50 backdrop-blur-md text-xs font-semibold tracking-widest text-amber-300 uppercase hover:bg-linear-to-b hover:from-amber-400 hover:to-amber-600 hover:text-zinc-950 hover:border-transparent transition-all duration-300 shadow-xl active:scale-98 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              Share Magic Link
            </button>
          </div>
        </div>

        {/* 3. MINIMAL LUXURY FOOTER */}
        <div className="mt-8 text-center text-[10px] tracking-[0.2em] text-zinc-600 font-medium select-none pointer-events-none uppercase">
          Made with <span className="text-amber-600 inline-block mx-0.5">⚜</span> using <span className="text-zinc-400 font-semibold tracking-normal normal-case">WishAura</span>
        </div>
      </div>
    </div>
  );
}