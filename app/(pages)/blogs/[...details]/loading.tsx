"use client"

import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* animated soft background blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <motion.div
          animate={{ x: [ -50, 50, -50 ], y: [ -30, 30, -30 ] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute -left-32 -top-16 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-500 opacity-20 blur-3xl"
        />
        <motion.div
          animate={{ x: [ 40, -40, 40 ], y: [ 20, -20, 20 ] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          className="absolute -right-32 -bottom-16 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-emerald-400 opacity-20 blur-3xl"
        />
      </motion.div>

      {/* glass card container */}
      <div className="relative z-10 max-w-md w-full px-6 py-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center gap-6">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center shadow-lg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L19 8v8l-7 6-7-6V8l7-6z" fill="white" opacity="0.95" />
              </svg>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">Loading</h3>
              <p className="text-sm text-white/60">Getting things ready, hang tight!</p>
            </div>
          </div>

          {/* animated dots + subtle text */}
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center gap-3" aria-hidden>
              <motion.span
                className="w-3 h-3 rounded-full bg-white/85"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: 0 }}
              />
              <motion.span
                className="w-3 h-3 rounded-full bg-white/70"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: 0.15 }}
              />
              <motion.span
                className="w-3 h-3 rounded-full bg-white/50"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: 0.3 }}
              />
            </div>

            {/* progress bar that breathes */}
            <div className="w-full">
              <div className="h-2 w-full rounded-full bg-white/6 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-white/90 to-white/40 shadow-sm"
                  initial={{ width: "6%" }}
                  animate={{ width: ["6%", "38%", "68%", "92%", "76%", "92%"] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                />
              </div>
            </div>

            <div className="text-xs text-white/60">Preparing your personalized experience…</div>
          </div>

          {/* micro animation for bottom - floating card */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-2 w-full"
          >
            <div className="flex items-center justify-between text-white/60 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-white/4 flex items-center justify-center">✓</div>
                <div>Optimizing assets</div>
              </div>
            </div>
          </motion.div>

          <div className="sr-only" aria-live="polite">Loading...</div>
        </div>
      </div>
    </div>
  );
}

