"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback } from "react";

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
  // Container variant jo saare baccho (children) ko sequence wise trigger karega
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        staggerChildren: 0.6, // Har element ke beech ka delay (1by1 aane ke liye)
      },
    },
  };


  // Individual element ke animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
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


        // If share succeeds, no extra UI is usually needed.
        return;
      }

      if (typeof navigator.clipboard?.writeText === "function") {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        return;
      }

      // Fallback: create a temporary input for older browsers
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      alert("Link copied to clipboard!");
    } catch {
      // Keep silent to avoid blocking the UI; clipboard/share can fail on some browsers.
      alert("Could not share/copy the link.");
    }
  }, [title, message]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4 bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, transition: { duration: 0.3 } }} // Last me interaction ke liye floating feel
        className="mx-auto max-w-2xl w-full rounded-2xl border border-rose-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/85 backdrop-blur-md p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden"
      >
        {/* Decorative Background Glows for Gift Feel */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-rose-200/40 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-amber-200/40 blur-3xl rounded-full pointer-events-none" />

        <div className="flex items-start justify-between gap-4">
          {/* 1. TITLE (Sabse pehle aayega) */}
          <motion.div variants={itemVariants} className="text-center space-y-2 flex-1">
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 bg-clip-text text-transparent drop-shadow-sm pb-1"
            >
              {title}
            </motion.h1>

            {/* 2. CATEGORY (Title ke turant baad soft display) */}
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30">
              {category}
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex-shrink-0">
            <button
              type="button"
              onClick={handleCopyOrShareLink}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-rose-100 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-sm font-semibold text-rose-700 dark:text-rose-200 hover:bg-white dark:hover:bg-zinc-900 transition"
            >
              Copy link to share this page
            </button>
          </motion.div>
        </div>


        
        <motion.div 
          variants={itemVariants}
          className="relative px-4 py-3 border-l-4 border-rose-400 dark:border-rose-600 bg-rose-50/30 dark:bg-zinc-800/30 rounded-r-xl"
        >
          <p className="whitespace-pre-wrap leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium text-lg sm:text-xl text-center italic">
            “ {message} ”
          </p>
        </motion.div>

        
        {image && (
          <motion.div 
            variants={imageVariants}
            className="relative rounded-xl overflow-hidden shadow-md border border-zinc-100 dark:border-zinc-800 group"
          >
            <Image
              src={image}
              alt={title}
              width={800}
              height={500}
              className="h-72 sm:h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}