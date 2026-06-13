import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HeroSection from "./sections/HeroSection";
import NowPlayingMovies from "./sections/NowPlayingMovies";
import PopularMovies from "./sections/PopularMovies";
import TopRatedMovies from "./sections/TopRatedMovies";
import UpcomingMovies from "./sections/UpcomingMovies";

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");

  // Scroll to section when URL param changes
  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [section]);

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
    <div className="min-h-screen bg-brand-dark text-white">
      <HeroSection />
      <div id="now-playing">
        <NowPlayingMovies />
      </div>
      <div id="popular">
        <PopularMovies />
      </div>
      <div id="top-rated">
        <TopRatedMovies />
      </div>
      <div id="upcoming">
        <UpcomingMovies />
      </div>
    </div>
  );
};

export default Home;
