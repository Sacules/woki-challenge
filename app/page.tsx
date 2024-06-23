import SearchResults from "./ui/search-results";
import { router } from "./api";
import { Box } from "@mui/material";

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string };
}) {
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
          p: "1rem",
        }}
      >
        {searchResults.data.results.length > 0 && (
          <SearchResults results={searchResults.data.results} />
        )}
      </Box>
    </main>
  );
}
