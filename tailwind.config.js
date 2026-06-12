// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2ffea",
          100: "#e0f7d3",
          200: "#c2efb2",
          300: "#9fe68a",
          400: "#73d45c",
          500: "#018c01",
          600: "#017801",
          700: "#016401",
          800: "#015001",
          900: "#003c00",
          950: "#002800",
        },
        orange: {
          50: "#fff8e8",
          100: "#feedc7",
          200: "#fddb94",
          300: "#fcc45c",
          400: "#fbb032",
          500: "#f1b22e",
          600: "#d48f1f",
          700: "#b06b16",
          800: "#8c4e12",
          900: "#6e3c10",
          950: "#3e1f08",
        },
        brand: {
          green: "#00a708",
          dark: "#02250a",
          orange: "#f8921e",
          bg: "#f8fafc",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      screens: {
        "max-1200px": { max: "1200px" },
        "max-900px": { max: "900px" },
        "max-768px": { max: "768px" },
        "max-520px": { max: "520px" },
        "max-480px": { max: "480px" },
        "max-380px": { max: "380px" },
      },

      fontFamily: {
        sans: ["Lexend Deca", "Inter", "Arial", "Helvetica", "sans-serif"],
        lexend: ["Lexend Deca", "sans-serif"],
        heading: ["Lexend Deca", "Arial", "Helvetica", "sans-serif"],
        arial: ["Arial", "Helvetica", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        brand: ["Lexend Deca", "Montserrat", "sans-serif"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "3xs": ["0.5625rem", { lineHeight: "0.875rem" }],
      },

      letterSpacing: {
        "widest-2": "0.2em",
        "widest-3": "0.3em",
        "widest-4": "0.4em",
        "widest-5": "0.5em",
      },

      boxShadow: {
        "card-hover": "0 20px 25px -5px rgb(0 0 0 / 0.1)",
        "cta-green": "0 4px 14px 0 rgb(0 167 8 / 0.4)",
        glow: "0 0 20px rgba(0, 177, 64, 0.3)",
        "glow-lg": "0 0 40px rgba(0, 177, 64, 0.4)",
        "glow-xl": "0 0 60px rgba(0, 177, 64, 0.5)",
        "inner-glow": "inset 0 0 20px rgba(0, 177, 64, 0.1)",
        "hover-glow": "0 10px 40px rgba(0, 177, 64, 0.25)",
      },

      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #02250a 0%, #064e3b 100%)",
        "card-overlay-dark":
          "linear-gradient(to top, rgba(2,37,10,0.8), transparent)",
        "journal-cover": "linear-gradient(to bottom right, #02250a, #011a07)",
        "hero-accent": "linear-gradient(to bottom right, #00a708, #f8921e)",
      },

      aspectRatio: {
        "3/4": "3 / 4",
      },

      opacity: {
        5: "0.05",
        15: "0.15",
        60: "0.60",
      },

      blur: {
        "3xl": "64px",
      },

      zIndex: {
        40: "40",
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        auto: "auto",
      },

      backgroundSize: {
        "200%": "200% 200%",
        "300%": "300% 300%",
      },

      animation: {
        marquee: "marquee 20s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-down": "fadeInDown 0.6s ease-out forwards",
        "fade-in-left": "fadeInLeft 0.6s ease-out forwards",
        "fade-in-right": "fadeInRight 0.6s ease-out forwards",
        "fade-out": "fadeOut 0.5s ease-in-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "scale-out": "scaleOut 0.5s ease-in forwards",
        "scale-in-up": "scaleInUp 0.5s ease-out forwards",
        "scale-in-down": "scaleInDown 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "slide-down": "slideDown 0.5s ease-out forwards",
        "slide-left": "slideLeft 0.5s ease-out forwards",
        "slide-right": "slideRight 0.5s ease-out forwards",
        "bounce-in": "bounceIn 0.6s ease-out forwards",
        "bounce-in-up": "bounceInUp 0.6s ease-out forwards",
        "bounce-in-down": "bounceInDown 0.6s ease-out forwards",
        "rotate-in": "rotateIn 0.5s ease-out forwards",
        "rotate-in-left": "rotateInLeft 0.5s ease-out forwards",
        "rotate-in-right": "rotateInRight 0.5s ease-out forwards",
        "flip-in": "flipIn 0.6s ease-out forwards",
        "flip-in-x": "flipInX 0.6s ease-out forwards",
        "flip-in-y": "flipInY 0.6s ease-out forwards",
        "scroll-fade-in": "fadeIn 0.8s ease-out forwards",
        "scroll-fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "scroll-fade-in-down": "fadeInDown 0.8s ease-out forwards",
        "scroll-scale-in": "scaleIn 0.8s ease-out forwards",
        "scroll-slide-up": "slideUp 0.8s ease-out forwards",
        "stagger-fade-in": "fadeIn 0.5s ease-out forwards",
        "stagger-scale-in": "scaleIn 0.5s ease-out forwards",
        "stagger-slide-up": "slideUp 0.5s ease-out forwards",
        "hover-lift": "hoverLift 0.3s ease-out forwards",
        "hover-scale": "hoverScale 0.3s ease-out forwards",
        "hover-glow": "hoverGlow 2s ease-in-out infinite",
        "hover-shake": "hoverShake 0.5s ease-in-out",
        "hover-pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-medium": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "gradient-x": "gradientX 15s ease infinite",
        "gradient-y": "gradientY 15s ease infinite",
        "gradient-xy": "gradientXY 15s ease infinite",
        "gradient-text": "gradientText 3s ease infinite",
        "stat-in": "scaleIn 0.5s ease-out forwards",
        twinkle: "twinkle 2s ease-in-out infinite",
        "border-glow": "borderGlow 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        ripple: "ripple 1s ease-out infinite",
        loading: "loading 1.5s ease-in-out infinite",
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100vw)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        scaleOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.9)" },
        },
        scaleInUp: {
          "0%": { opacity: "0", transform: "scale(0.9) translateY(10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        scaleInDown: {
          "0%": { opacity: "0", transform: "scale(0.9) translateY(-10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        bounceInUp: {
          "0%": { transform: "translateY(30px) scale(0.9)", opacity: "0" },
          "50%": { transform: "translateY(-10px) scale(1.02)", opacity: "1" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        bounceInDown: {
          "0%": { transform: "translateY(-30px) scale(0.9)", opacity: "0" },
          "50%": { transform: "translateY(10px) scale(1.02)", opacity: "1" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        rotateIn: {
          "0%": { transform: "rotate(-10deg) scale(0.9)", opacity: "0" },
          "100%": { transform: "rotate(0) scale(1)", opacity: "1" },
        },
        rotateInLeft: {
          "0%": { transform: "rotate(-20deg) translateX(-20px)", opacity: "0" },
          "100%": { transform: "rotate(0) translateX(0)", opacity: "1" },
        },
        rotateInRight: {
          "0%": { transform: "rotate(20deg) translateX(20px)", opacity: "0" },
          "100%": { transform: "rotate(0) translateX(0)", opacity: "1" },
        },
        flipIn: {
          "0%": {
            transform: "perspective(400px) rotateX(90deg)",
            opacity: "0",
          },
          "40%": { transform: "perspective(400px) rotateX(-10deg)" },
          "70%": { transform: "perspective(400px) rotateX(10deg)" },
          "100%": {
            transform: "perspective(400px) rotateX(0deg)",
            opacity: "1",
          },
        },
        flipInX: {
          "0%": {
            transform: "perspective(400px) rotateX(90deg)",
            opacity: "0",
          },
          "40%": { transform: "perspective(400px) rotateX(-10deg)" },
          "70%": { transform: "perspective(400px) rotateX(10deg)" },
          "100%": {
            transform: "perspective(400px) rotateX(0deg)",
            opacity: "1",
          },
        },
        flipInY: {
          "0%": {
            transform: "perspective(400px) rotateY(90deg)",
            opacity: "0",
          },
          "40%": { transform: "perspective(400px) rotateY(-10deg)" },
          "70%": { transform: "perspective(400px) rotateY(10deg)" },
          "100%": {
            transform: "perspective(400px) rotateY(0deg)",
            opacity: "1",
          },
        },
        hoverLift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-8px)" },
        },
        hoverScale: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        hoverGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 177, 64, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 177, 64, 0.5)" },
        },
        hoverShake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        heartbeat: {
          "0%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.3)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.3)" },
          "70%": { transform: "scale(1)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        gradientY: {
          "0%, 100%": { backgroundPosition: "50% 0%" },
          "50%": { backgroundPosition: "50% 100%" },
        },
        gradientXY: {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
        },
        gradientText: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(0, 177, 64, 0.3)" },
          "50%": { borderColor: "rgba(0, 177, 64, 0.8)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        loading: {
          "0%": { width: "0%", marginLeft: "0%" },
          "25%": { width: "50%", marginLeft: "0%" },
          "50%": { width: "75%", marginLeft: "25%" },
          "75%": { width: "50%", marginLeft: "75%" },
          "100%": { width: "0%", marginLeft: "100%" },
        },
      },
    },
  },
  plugins: [],
};
