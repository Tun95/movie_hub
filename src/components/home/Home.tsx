import React, { useEffect } from "react";
import HeroSection from "./sections/HeroSection";
import PopularMovies from "./sections/PopularMovies";
import TopRatedMovies from "./sections/TopRatedMovies";
import UpcomingMovies from "./sections/UpcomingMovies";
import NowPlayingMovies from "./sections/NowPlayingMovies";

const Home: React.FC = () => {
  // Scroll reveal effect
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      const triggerBottom = (window.innerHeight / 5) * 4.2;
      revealElements.forEach((el) => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-white overflow-hidden">
      <HeroSection />
      <NowPlayingMovies />
      <PopularMovies />
      <TopRatedMovies />
      <UpcomingMovies />
    </div>
  );
};

export default Home;
