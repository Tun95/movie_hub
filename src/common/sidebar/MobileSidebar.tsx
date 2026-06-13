import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Search,
  TrendingUp,
  Star,
  Calendar,
} from "lucide-react";

const MobileSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/search", label: "Search", icon: Search },
  ];

  const sections = [
    {
      label: "Popular",
      icon: TrendingUp,
      path: "/?section=popular",
      id: "popular",
    },
    {
      label: "Top Rated",
      icon: Star,
      path: "/?section=top-rated",
      id: "top-rated",
    },
    {
      label: "Upcoming",
      icon: Calendar,
      path: "/?section=upcoming",
      id: "upcoming",
    },
  ];

  // Close drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    sectionId: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    if (path === "/?section=popular") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-brand-dark/80 backdrop-blur-sm rounded-lg border border-gray-700 text-white hover:bg-brand-orange/20 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 z-50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-brand-dark z-50 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <div>
                  <h1 className="text-2xl font-black tracking-tighter">
                    Movie<span className="text-brand-orange">Hub</span>
                  </h1>
                  <p className="text-xs text-gray-500 mt-1 tracking-wide">
                    Discover your next favorite movie
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? "bg-brand-orange/10 text-brand-orange border-l-2 border-brand-orange"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      <item.icon size={20} />
                      <span className="text-base font-medium">
                        {item.label}
                      </span>
                    </NavLink>
                  ))}
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 px-4 mb-3">
                    Discover
                  </h3>
                  <div className="space-y-1">
                    {sections.map((section) => (
                      <NavLink
                        key={section.label}
                        to={section.path}
                        onClick={(e) =>
                          handleSectionClick(e, section.path, section.id)
                        }
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            isActive
                              ? "text-brand-orange bg-white/5"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`
                        }
                      >
                        <section.icon size={18} />
                        <span className="text-base">{section.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-800">
                <p className="text-2xs text-gray-500 text-center">
                  © 2026 MovieHub
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSidebar;
