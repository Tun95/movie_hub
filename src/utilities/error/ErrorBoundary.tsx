import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Film, Search, TrendingUp, Star } from "lucide-react";

interface ErrorBoundaryProps {
  error?: {
    status?: number;
    statusText?: string;
    message?: string;
  };
}

function ErrorBoundary({ error }: ErrorBoundaryProps = {}) {
  const navigate = useNavigate();

  const is404 = error?.status === 404;
  const errorMessage = error?.message || "Something went wrong";
  const errorTitle = is404 ? "Page Not Found" : "Something Went Wrong";
  const errorDescription = is404
    ? "The page you're looking for doesn't exist or has been moved."
    : "We're having trouble loading this page. Please try again later.";

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    {
      id: "popular",
      label: "Popular",
      icon: TrendingUp,
      path: "/?section=popular",
    },
    {
      id: "top-rated",
      label: "Top Rated",
      icon: Star,
      path: "/?section=top-rated",
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: Film,
      path: "/?section=upcoming",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{errorTitle} | MovieHub</title>
        <meta name="description" content={errorDescription} />
      </Helmet>

      <div
        data-cy="error-boundary"
        className="fixed inset-0 overflow-y-auto bg-brand-dark font-sans"
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
          />
        </div>

        {/* Brand gradient background */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-green/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-brand-orange/5 to-transparent" />

        <div className="relative min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            {/* MovieHub Brand Header - Clickable */}
            <div className="text-center mb-8">
              <button
                onClick={handleLogoClick}
                className="inline-flex items-center space-x-2 mb-4 cursor-pointer group hover:opacity-80 transition"
                aria-label="Go to home"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <Film className="w-8 h-8 text-brand-orange" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tighter text-white group-hover:text-brand-orange transition">
                    Movie<span className="text-brand-orange">Hub</span>
                  </h1>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-brand-green font-bold">
                    Discover Your Next Favorite Movie
                  </p>
                </div>
              </button>
            </div>

            {/* Main content */}
            <div className="text-center space-y-8">
              {/* Error Illustration */}
              <div className="relative inline-block">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-8xl md:text-9xl font-bold text-brand-orange/10">
                    {is404 ? "404" : "500"}
                  </h1>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Search className="w-16 h-16 text-brand-orange/30" />
                  </motion.div>
                </div>
              </div>

              {/* Error message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {errorTitle}
                </h2>
                <p className="text-gray-400 max-w-md mx-auto">
                  {errorDescription}
                </p>
                {!is404 &&
                  errorMessage &&
                  errorMessage !== "Something went wrong" && (
                    <p className="text-sm text-gray-500 max-w-md mx-auto mt-2">
                      Error: {errorMessage}
                    </p>
                  )}
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 justify-center pt-4"
              >
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-200 gap-2 text-sm font-bold uppercase tracking-wider"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </button>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-orange text-white rounded-lg hover:bg-brand-green transition-all duration-200 gap-2 text-sm font-bold uppercase tracking-wider shadow-lg shadow-orange-900/20"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
              </motion.div>

              {/* Navigation links */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pt-8"
              >
                <p className="text-xs text-gray-500 mb-4 font-bold uppercase tracking-widest">
                  Explore Movies
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/search"
                    className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-brand-orange transition-colors px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:border-brand-orange font-bold uppercase tracking-wider"
                  >
                    <Search className="w-4 h-4" />
                    Search Movies
                  </Link>
                  {sections.map((section) => (
                    <Link
                      key={section.id}
                      to={section.path}
                      className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-brand-orange transition-colors px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:border-brand-orange font-bold uppercase tracking-wider"
                    >
                      <section.icon className="w-4 h-4" />
                      {section.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-2xs text-gray-500 font-bold uppercase tracking-widest">
                © {new Date().getFullYear()} MovieHub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorBoundary;
