import { Helmet } from "react-helmet-async";
import Sidebar from "../../common/sidebar/Sidebar";
import MobileSidebar from "../../common/sidebar/MobileSidebar";
import MovieDetail from "../../components/moviedetail/MovieDetail";

const MovieDetailScreen = () => {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Helmet>
        <title>Movie Details | MovieHub</title>
        <meta
          name="description"
          content="View detailed information about your favorite movies."
        />
      </Helmet>

      <MobileSidebar />

      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <MovieDetail />
        </main>
      </div>
    </div>
  );
};

export default MovieDetailScreen;
