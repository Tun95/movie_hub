import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import LoadingBox from "./utilities/message loading/LoadingBox";
import ErrorBoundary from "./utilities/error/ErrorBoundary";
import useScrollToTop from "./utilities/scroll to top/ScrollToTop";

// Screen Imports
import HomeScreen from "./screens/homescreen/HomeScreen";
import SearchScreen from "./screens/searchscreen/SearchScreen";
import MovieDetailScreen from "./screens/moviedetailscreen/MovieDetailScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTop();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <LoadingBox />
      </div>
    );
  }

  return (
    <div className="app">
      <Toaster expand visibleToasts={1} richColors position="top-right" />

      <Routes>
        {/* Error Routes */}
        <Route path="*" element={<ErrorBoundary />} />

        {/* Public Routes */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/movie/:id" element={<MovieDetailScreen />} />
      </Routes>
    </div>
  );
}

export default App;
