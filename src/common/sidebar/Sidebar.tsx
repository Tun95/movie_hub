import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, TrendingUp, Star, Calendar } from "lucide-react";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

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

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    sectionId: string,
  ) => {
    e.preventDefault();
    if (path === "/?section=popular") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <aside className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-brand-dark/95 backdrop-blur-sm border-r border-gray-800 z-40">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-black tracking-tighter">
              Movie<span className="text-brand-orange">Hub</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1 tracking-wide">
              Discover your next favorite movie
            </p>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6">
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-brand-orange/10 text-brand-orange border-l-2 border-brand-orange"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* Discover Section */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 px-4 mb-3">
              Discover
            </h3>
            <div className="space-y-1">
              {sections.map((section, index) => (
                <motion.div
                  key={section.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
                >
                  <NavLink
                    to={section.path}
                    onClick={(e) =>
                      handleSectionClick(e, section.path, section.id)
                    }
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? "text-brand-orange bg-white/5"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    <section.icon size={16} />
                    <span className="text-sm">{section.label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800">
          <p className="text-2xs text-gray-500 text-center">© 2026 MovieHub</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
