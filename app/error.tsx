"use client"

import type { RepeatType } from "framer-motion";
import { cubicBezier, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ErrorPage() {
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const floatTransition = shouldReduceMotion
    ? undefined
    : { repeat: Infinity, duration: 18, ease: cubicBezier( 0.42, 0, 0.58, 1 ), repeatType: "loop" as RepeatType };

  const floatTransition2 = shouldReduceMotion
    ? undefined
    : { repeat: Infinity, duration: 20, ease: cubicBezier( 0.42, 0, 0.58, 1 ), repeatType: "loop" as RepeatType };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {isMounted && !shouldReduceMotion ? (
          <>
            <motion.div
              animate={{ x: [-60, 60, -60], y: [-20, 20, -20] }}
              transition={floatTransition}
              className="absolute -top-32 left-1/3 w-96 h-96 rounded-full bg-gradient-to-tr from-red-600 to-purple-600 opacity-20 blur-3xl"
            />

            <motion.div
              animate={{ x: [40, -40, 40], y: [30, -30, 30] }}
              transition={floatTransition2}
              className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 opacity-20 blur-3xl"
            />
          </>
        ) : (

          <>
            <div className="absolute -top-32 left-1/3 w-96 h-96 rounded-full bg-gradient-to-tr from-red-600 to-purple-600 opacity-10 blur-3xl" />
            <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 opacity-10 blur-3xl" />
          </>
        )}
      </div>

      <div className="relative z-10 max-w-lg w-full px-8 py-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl text-center">
        {isMounted && !shouldReduceMotion ? (
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-6xl font-extrabold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent"
          >
            500
          </motion.h1>
        ) : (
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">500</h1>
        )}

        {isMounted && !shouldReduceMotion ? (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mt-4 text-xl font-semibold text-white"
          >
            Oops! Something went wrong
          </motion.h2>
        ) : (
          <h2 className="mt-4 text-xl font-semibold text-white">Oops! Something went wrong</h2>
        )}

        <p className="mt-2 text-white/60">An unexpected error has occurred. Please try again later.</p>

        {/* call to action */}
        {isMounted && !shouldReduceMotion ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium shadow-lg hover:opacity-90 transition"
            >
              Go Home
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg bg-white/10 text-white font-medium border border-white/20 hover:bg-white/20 transition"
            >
              Retry
            </button>
          </motion.div>
        ) : (
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium shadow-lg hover:opacity-90 transition"
            >
              Go Home
            </Link>

            <button
              onClick={() => typeof window !== "undefined" && window.location.reload()}
              className="px-6 py-3 rounded-lg bg-white/10 text-white font-medium border border-white/20 hover:bg-white/20 transition"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      <div className="sr-only" aria-live="assertive">
        Error occurred. Please try again.
      </div>
    </div>
  );
}
