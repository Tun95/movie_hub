import { Helmet } from "react-helmet-async";
import Sidebar from "../../common/sidebar/Sidebar";
import Home from "../../components/home/Home";

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Helmet>
        <title>MovieHub | Discover Your Next Favorite Movie</title>
        <meta
          name="description"
          content="Discover popular, top rated, and upcoming movies. Find your next favorite movie with MovieHub."
        />
        <meta
          name="keywords"
          content="movies, film, cinema, popular movies, top rated, upcoming"
        />
      </Helmet>

      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Home />
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;
