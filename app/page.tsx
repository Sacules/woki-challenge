import Search from "@/app/ui/search";
import SearchResults from "./ui/search-results";
import { router } from "./api";
import { Box } from "@mui/material";

export default async function Page({ searchParams }) {
  const query = searchParams?.query || "";

  const searchResults = await router.get("/search/movie", {
    params: { query, include_adult: false },
  });

  return (
    <main>
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          p: "1rem",
        }}
      >
        <Search />
        {searchResults.data && (
          <SearchResults results={searchResults.data.results} />
        )}
      </Box>
    </main>
  );
}
