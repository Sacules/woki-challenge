import { router } from "@/app/api";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";

function createTMDBImgUrl(size: string, path: string) {
  return `${TMDB_IMAGE_URL}/${size}${path}`;
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params?.id || "";

  const { data } = await router.get(`/movie/${id}`, {
    params: { append_to_response: "credits" },
  });

  const directors = data.credits.crew.filter(({ job }) => job === "Director");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(auto, 300px) 1fr",
          md: "minmax(auto, 400px) 1fr",
        },
        gridTemplateRows: {
          xs: "300px auto 1fr",
          sm: "35vh 1fr auto",
        },
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          gridColumn: "1 / -1",
          gridRow: "1 / span 1",
          backgroundImage: `url('${createTMDBImgUrl(
            "original",
            data.backdrop_path,
          )}')`,
          borderImage:
            "fill 1 linear-gradient(hsl(0 0% 0% / .2), hsl(0 0% 100% / 0.7), hsl(0 0% 100%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          gridRow: {
            xs: "2 / span 1",
            sm: "1 / span 1",
          },
          gridColumn: {
            xs: "1 / span 1",
            sm: "2 / span 1",
          },
          alignSelf: "end",
          pb: {
            sm: "1rem",
          },
        }}
      >
        <Typography
          variant="h2"
          fontWeight={200}
          letterSpacing={2}
          color="currentColor"
        >
          {data.title}
        </Typography>
        {data.original_title !== data.title && (
          <Typography
            variant="subtitle1"
            letterSpacing={2}
            color="currentColor"
          >
            {data.original_title}
          </Typography>
        )}
        <Typography variant="subtitle1" color="currentColor" pt="0.5rem">
          {new Date(data.release_date).getFullYear()}
        </Typography>
        <Box display="flex" gap="0.5rem">
          {directors.map((d, i) => (
            <Typography
              key={d.id}
              variant="subtitle1"
              letterSpacing={2}
              color="currentColor"
            >
              {d.name}
              {i !== directors.length - 1 ? "," : ""}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          margin: {
            xs: 0,
            sm: "2rem",
          },
          gridRow: {
            xs: "1 / span 1",
            sm: "1 / span 2",
          },
          gridColumn: "1 / span 1",
          position: "relative",
          aspectRatio: "2/3",
          maxWidth: "100%",
          maxHeight: "100%",
          justifySelf: "center",
        }}
      >
        <Image
          fill
          priority
          sizes="100%"
          src={`${createTMDBImgUrl("w500", data.poster_path)}`}
          alt={data.title}
        />
      </Box>
      <Box
        sx={{
          gridColumn: {
            xs: "1 / span 1",
            sm: "2 / span 1",
          },
          gridRow: {
            xs: "3 / span 1",
            sm: "2 / span 1",
          },
        }}
      >
        <Box
          component="ul"
          display="flex"
          alignItems="baseline"
          sx={{ p: 0, pb: "1rem", m: 0, gap: "0.25rem" }}
        >
          <Box component="li" sx={{ listStyle: "none" }}>
            <Typography variant="subtitle2">Genres:</Typography>
          </Box>
          {data.genres.map((g, i) => (
            <Box key={g.id} component="li" sx={{ listStyle: "none" }}>
              <Typography variant="caption">{g.name}</Typography>
              {i !== data.genres.length - 1 ? "," : ""}
            </Box>
          ))}
        </Box>
        <Box maxWidth="65ch">
          <Typography variant="h6" color="currentColor">
            {data.tagline}
          </Typography>
          <Typography variant="body2">{data.overview}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
