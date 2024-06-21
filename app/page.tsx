import axios from "axios";
import Search from "@/app/ui/search";
import SearchResults from "./ui/search-results";

const API_KEY = process.env.API_KEY;

const router = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default async function Page({ searchParams }) {
  const query = searchParams?.query || "";

  const searchResults = await router.get("/search/movie", {
    params: { query, include_adult: false },
  });

  return (
    <main>
      <Search />
      {searchResults.data && (
        <SearchResults results={searchResults.data.results} />
      )}
    </main>
  );
}
