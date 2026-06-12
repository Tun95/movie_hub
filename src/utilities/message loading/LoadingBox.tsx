import { motion } from "framer-motion";

function LoadingBox() {
  return (
    <div
      data-cy="loading-box"
      className="fixed inset-0 flex justify-center items-center min-h-screen bg-brand-dark z-[100] font-sans"
    >
      {/* MovieHub Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 20 L30 0 L50 20 L30 40 Z' fill='%23f8921e'/%3E%3Ccircle cx='30' cy='30' r='8' fill='%2300a708'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Brand gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl"></div>

      <div className="relative flex flex-col items-center">
        {/* Loader design with brand colors */}
        <div className="relative mb-8">
          {/* Rotating circle with brand orange */}
          <motion.div
            className="w-20 h-20 rounded-full border-4 border-brand-orange/20 border-t-brand-orange"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />

          {/* Center icon - Film reel */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-brand-orange"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-3">
          <div>
            <h2 className="text-2xl font-black tracking-tighter text-white">
              Movie<span className="text-brand-orange">Hub</span>
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-green font-bold mt-1">
              Discover Your Next Favorite Movie
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 mt-4">
            <span className="text-gray-400 text-sm font-medium">Loading</span>
            <div className="flex space-x-1">
              <motion.div
                className="w-1.5 h-1.5 bg-brand-green rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-1.5 h-1.5 bg-brand-green rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-1.5 h-1.5 bg-brand-green rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>

          <p className="text-gray-500 text-2xs font-bold uppercase tracking-widest">
            Fetching the latest movies...
          </p>
        </div>

        {/* Progress indicator with brand colors */}
        <div className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-green to-brand-orange rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Subtle status message */}
        <div className="mt-6">
          <p className="text-3xs text-gray-500 font-mono">
            🎬 Curating the best cinematic experiences
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -500px 0;
          }
          100% {
            background-position: 500px 0;
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingBox;
