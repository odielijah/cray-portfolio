"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Logo from "@/components/logo";

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            <motion.div
              className="w-25"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Logo />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isVisible && children}
    </>
  );
}
