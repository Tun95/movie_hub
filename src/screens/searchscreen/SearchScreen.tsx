import { Helmet } from "react-helmet-async";
import Sidebar from "../../common/sidebar/Sidebar";
import Search from "../../components/search/Search";

const SearchScreen = () => {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Helmet>
        <title>Search Movies | MovieHub</title>
        <meta
          name="description"
          content="Search and filter movies by genre, year, rating, and more."
        />
      </Helmet>

      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Search />
        </main>
      </div>
    </div>
  );
};

export default SearchScreen;
