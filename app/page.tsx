import Search from "@/app/ui/search";
import SearchResults from "./ui/search-results";
import { router } from "./api";

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
