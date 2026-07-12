// "use client";

// import Image from "next/image";
// import { useCallback, useEffect, useRef } from "react";
// import gsap from "gsap";
// import confetti from "canvas-confetti";

// type WishCardProps = {
//   title: string;
//   message: string;
//   category: string;
//   image?: string;
// };

// export default function WishCard({
//   title,
//   message,
//   category,
//   image,
// }: WishCardProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLDivElement>(null);
//   const categoryRef = useRef<HTMLSpanElement>(null);
//   const messageBoxRef = useRef<HTMLDivElement>(null);
//   const messageLinesRef = useRef<HTMLParagraphElement>(null);
//   const imageContainerRef = useRef<HTMLDivElement>(null);
//   const heartRef = useRef<HTMLDivElement>(null);
//   const heartStreamRef = useRef<HTMLDivElement>(null);
  
//   // Extra elements for background animation
//   const glowRef = useRef<HTMLDivElement>(null);
//   const particlesRef = useRef<HTMLDivElement>(null);

//   // Confetti Blast Effect
//   const triggerConfetti = () => {
//     const duration = 3 * 1000;
//     const end = Date.now() + duration;

//     const frame = () => {
//       confetti({
//         particleCount: 3,
//         angle: 60,
//         spread: 55,
//         origin: { x: 0, y: 0.8 },
//         colors: ["#f43f5e", "#ec4899", "#f59e0b", "#3b82f6"],
//       });
//       confetti({
//         particleCount: 3,
//         angle: 120,
//         spread: 55,
//         origin: { x: 1, y: 0.8 },
//         colors: ["#f43f5e", "#ec4899", "#f59e0b", "#3b82f6"],
//       });

//       if (Date.now() < end) {
//         requestAnimationFrame(frame);
//       }
//     };
//     frame();
//   };

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       triggerConfetti();

//       // --- Background Bokeh Particles Animation ---
//       const particles = particlesRef.current?.children;
//       if (particles) {
//         Array.from(particles).forEach((p) => {
//           gsap.set(p, {
//             x: Math.random() * window.innerWidth,
//             y: Math.random() * window.innerHeight,
//             scale: Math.random() * 1.5 + 0.5,
//             opacity: Math.random() * 0.4 + 0.1,
//           });
          
//           // Continuous random floating motion
//           gsap.to(p, {
//             x: `+=${Math.random() * 200 - 100}`,
//             y: `+=${Math.random() * 200 - 100}`,
//             duration: Math.random() * 6 + 6,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut",
//           });
//         });
//       }

//       // --- Moving Glowing Aura behind the Card ---
//       if (glowRef.current) {
//         gsap.to(glowRef.current, {
//           rotate: 360,
//           duration: 12,
//           repeat: -1,
//           ease: "none",
//         });
//       }

//       const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

//       // 1. Parent Card Entry
//       tl.fromTo(
//         containerRef.current,
//         { opacity: 0, y: 80, scale: 0.95 },
//         { opacity: 1, y: 0, scale: 1, duration: 1.2 }
//       );

//       // 2. Title & Category reveal
//       tl.fromTo(
//         [titleRef.current, categoryRef.current],
//         { opacity: 0, y: -30, filter: "blur(8px)" },
//         { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.2 },
//         "-=0.6"
//       );

//       // 3. Heart Box scale-up & pulse infinite loop
//       tl.fromTo(
//         heartRef.current,
//         { scale: 0, opacity: 0 },
//         {
//           scale: 1,
//           opacity: 0.15,
//           duration: 1,
//           ease: "back.out(2)",
//           onComplete: () => {
//             gsap.to(heartRef.current, {
//               scale: 1.12,
//               duration: 0.8,
//               yoyo: true,
//               repeat: -1,
//               ease: "power1.inOut",
//             });
//           },
//         },
//         "-=0.4"
//       );

//       // 4. Message Box dynamic scaling & text fade
//       tl.fromTo(
//         messageBoxRef.current,
//         { scaleX: 0, opacity: 0 },
//         { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.inOut" },
//         "-=0.5"
//       );

//       tl.fromTo(
//         messageLinesRef.current,
//         { opacity: 0, y: 15, letterSpacing: "-1px" },
//         { opacity: 1, y: 0, letterSpacing: "0px", duration: 1.2 },
//         "-=0.3"
//       );

//       // 5. Image Pop & Floating Hearts around it
//       if (imageContainerRef.current) {
//         tl.fromTo(
//           imageContainerRef.current,
//           { opacity: 0, scale: 0.6, rotationY: 90 },
//           {
//             opacity: 1,
//             scale: 1,
//             rotationY: 0,
//             duration: 1.4,
//             ease: "elastic.out(1, 0.75)",
//             onComplete: () => {
//               const heartIcons = ["❤️", "💖", "💝", "💕"];
//               for (let i = 0; i < 12; i++) {
//                 const heartEl = document.createElement("div");
//                 heartEl.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
//                 heartEl.style.position = "absolute";
//                 heartEl.style.bottom = "-20px";
//                 heartEl.style.left = `${Math.random() * 90 + 5}%`;
//                 heartEl.style.fontSize = `${Math.random() * 16 + 16}px`;
//                 heartEl.style.opacity = "0";
//                 heartStreamRef.current?.appendChild(heartEl);

//                 gsap.to(heartEl, {
//                   y: -360,
//                   x: `+=${Math.sin(i) * 30}`,
//                   opacity: 0.8,
//                   scale: 1.3,
//                   duration: Math.random() * 3 + 2,
//                   repeat: -1,
//                   delay: Math.random() * 2,
//                   ease: "power1.out",
//                 });
//               }
//             }
//           },
//           "-=0.6"
//         );
//       }
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   const handleCopyOrShareLink = useCallback(async () => {
//     try {
//       const url = window.location.href;

//       if (typeof navigator.share === "function") {
//         await navigator.share({
//           title,
//           text: message,
//           url,
//         });
//         return;
//       }

//       if (typeof navigator.clipboard?.writeText === "function") {
//         await navigator.clipboard.writeText(url);
//         alert("Link copied to clipboard!");
//         return;
//       }

//       const input = document.createElement("input");
//       input.value = url;
//       document.body.appendChild(input);
//       input.select();
//       document.execCommand("copy");
//       document.body.removeChild(input);
//       alert("Link copied to clipboard!");
//     } catch {
//       alert("Could not share/copy the link.");
//     }
//   }, [title, message]);

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-zinc-50 via-white to-rose-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black overflow-hidden relative">
      
//       {/* 1. Dynamic Background Bokeh Particles */}
//       <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
//         <div className="absolute w-40 h-40 rounded-full bg-rose-300/30 blur-2xl" />
//         <div className="absolute w-52 h-52 rounded-full bg-amber-200/20 blur-2xl" />
//         <div className="absolute w-36 h-36 rounded-full bg-pink-300/30 blur-2xl" />
//         <div className="absolute w-60 h-60 rounded-full bg-purple-200/20 blur-3xl" />
//         <div className="absolute w-44 h-44 rounded-full bg-red-200/20 blur-2xl" />
//       </div>

//       {/* Outer wrapper to container relative mesh */}
//       <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center z-10">
        
//         {/* 2. Ambient Neon Glowing Backlight behind the main card */}
//         <div 
//           ref={glowRef} 
//           className="absolute -inset-4 rounded-3xl opacity-60 dark:opacity-40 blur-2xl bg-gradient-to-r from-rose-500 via-purple-500 to-amber-400 z-0 pointer-events-none scale-105"
//         />

//         {/* MAIN CARD CONTAINER */}
//         <div
//           ref={containerRef}
//           style={{ perspective: 1000 }}
//           className="w-full rounded-2xl border border-white/60 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-900/85 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] space-y-8 relative overflow-hidden z-10"
//         >
//           <div className="absolute top-4 left-6 text-xl animate-bounce">✨</div>
//           <div className="absolute bottom-6 right-6 text-xl animate-bounce delay-200">🎈</div>

//           <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b border-rose-100/40 dark:border-zinc-800/40 pb-6">
//             {/* TITLE & CATEGORY */}
//             <div className="text-center sm:text-left space-y-2 flex-1">
//               <h1
//                 ref={titleRef}
//                 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 bg-clip-text text-transparent drop-shadow-sm pb-1"
//               >
//                 {title}
//               </h1>

//               <span
//                 ref={categoryRef}
//                 className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
//               >
//                 {category}
//               </span>
//             </div>

//             {/* Action Button */}
//             <div className="flex-shrink-0">
//               <button
//                 type="button"
//                 onClick={handleCopyOrShareLink}
//                 className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-rose-100 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-sm font-semibold text-rose-700 dark:text-rose-200 hover:scale-105 active:scale-95 transition-all shadow-sm"
//               >
//                 Copy link to share this page
//               </button>
//             </div>
//           </div>

//           {/* MESSAGE & DECORATIVE HEART */}
//           <div className="relative flex items-center justify-center min-h-[140px] py-4">
//             <div
//               ref={heartRef}
//               className="absolute z-0 pointer-events-none opacity-0 select-none text-rose-500/10 dark:text-rose-500/5 filter drop-shadow-lg"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-48 h-48 sm:w-64 sm:h-64"
//               >
//                 <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
//               </svg>
//             </div>

//             <div
//               ref={messageBoxRef}
//               className="w-full z-10 px-6 py-6 border border-rose-100/30 dark:border-zinc-800/50 bg-rose-50/20 dark:bg-zinc-900/30 backdrop-blur-sm rounded-2xl shadow-inner"
//             >
//               <p
//                 ref={messageLinesRef}
//                 className="whitespace-pre-wrap leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium text-lg sm:text-xl text-center italic"
//               >
//                 “ {message} ”
//               </p>
//             </div>
//           </div>

//           {/* IMAGE ROTATION & FLOATING HEARTS STREAM */}
//           {image && (
//             <div className="relative w-full overflow-visible py-2">
//               <div 
//                 ref={heartStreamRef} 
//                 className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl" 
//               />

//               <div
//                 ref={imageContainerRef}
//                 className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 z-10"
//               >
//                 <Image
//                   src={image}
//                   alt={title}
//                   width={800}
//                   height={500}
//                   className="h-72 sm:h-85 w-full object-contain mx-auto transition-transform duration-700"
//                   priority
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";

type WishCardProps = {
  title: string;
  message: string;
  category: string;
  image?: string;
};

export default function WishCard({
  title,
  message,
  category,
  image,
}: WishCardProps) {
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
        alert("Link copied to clipboard!");
        return;
      }

      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      alert("Link copied to clipboard!");
    } catch {
      alert("Could not share/copy the link.");
    }
  }, [title, message]);

  return (
    <div className="flex items-center justify-center min-h-screen py-20 px-4 bg-gradient-to-br from-zinc-50 via-white to-rose-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black overflow-x-hidden relative">
      
      {/* Background Bokeh Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 max-h-screen">
        <div className="absolute w-32 h-32 rounded-full bg-rose-300/20 blur-2xl" />
        <div className="absolute w-40 h-40 rounded-full bg-amber-200/15 blur-2xl" />
        <div className="absolute w-28 h-28 rounded-full bg-pink-300/20 blur-2xl" />
        <div className="absolute w-48 h-48 rounded-full bg-purple-200/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center z-10">
        
        {/* Ambient Neon Glowing Backlight */}
        <div 
          ref={glowRef} 
          className="absolute -inset-2 rounded-3xl opacity-50 dark:opacity-30 blur-2xl bg-gradient-to-r from-rose-500 via-purple-500 to-amber-400 z-0 pointer-events-none scale-102"
        />

        {/* MAIN CARD CONTAINER */}
        <div
          ref={containerRef}
          style={{ perspective: 1000 }}
          className="w-full rounded-2xl border border-white/60 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-900/85 backdrop-blur-2xl p-5 sm:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] space-y-6 relative overflow-hidden z-10"
        >
          <div className="absolute top-3 left-5 text-lg animate-bounce">✨</div>
          <div className="absolute bottom-4 right-5 text-lg animate-bounce delay-200">🎈</div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 border-b border-rose-100/40 dark:border-zinc-800/40 pb-4">
            {/* TITLE & CATEGORY */}
            <div className="text-center sm:text-left space-y-1 flex-1">
              <h1
                ref={titleRef}
                className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 bg-clip-text text-transparent drop-shadow-sm pb-1"
              >
                {title}
              </h1>

              <span
                ref={categoryRef}
                className="inline-block px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
              >
                {category}
              </span>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={handleCopyOrShareLink}
                className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl border border-rose-100 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-xs font-semibold text-rose-700 dark:text-rose-200 hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                Copy link
              </button>
            </div>
          </div>

          {/* MESSAGE WITH CONDITIONAL SCROLL OVER 500 CHARS */}
          <div className="relative flex items-center justify-center py-2">
            <div
              ref={heartRef}
              className="absolute z-0 pointer-events-none opacity-0 select-none text-rose-500/10 dark:text-rose-500/5 filter drop-shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-36 h-36 sm:w-48 sm:h-48"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>

            <div
              ref={messageBoxRef}
              className={`w-full z-10 px-5 py-4 border border-rose-100/30 dark:border-zinc-800/50 bg-rose-50/20 dark:bg-zinc-900/30 backdrop-blur-sm rounded-xl shadow-inner custom-scrollbar ${
                isLongMessage ? "max-h-48 overflow-y-auto" : "h-auto"
              }`}
            >
              <p
                ref={messageLinesRef}
                className="whitespace-pre-wrap leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium text-base sm:text-lg text-center italic"
              >
                “ {message} ”
              </p>
            </div>
          </div>

          {/* IMAGE ROTATION & FLOATING HEARTS STREAM */}
          {image && (
            <div className="relative w-full overflow-visible py-1">
              <div 
                ref={heartStreamRef} 
                className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-xl" 
              />

              <div
                ref={imageContainerRef}
                className="relative rounded-xl overflow-hidden shadow-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 z-10"
              >
                <Image
                  src={image}
                  alt={title}
                  width={850}
                  height={450}
                  className="max-h-60 sm:max-h-72 w-full object-contain mx-auto transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}