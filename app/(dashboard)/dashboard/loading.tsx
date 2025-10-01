"use client";

import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      {/* spinner */}
      <motion.div
        className="w-12 h-12 border-4 border-gray-300 border-t-violet-900 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
