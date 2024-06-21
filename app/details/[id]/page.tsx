import { router } from "@/app/api";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/original";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params?.id || "";

  const { data } = await router.get(`/movie/${id}`);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(auto, 300px) 1fr",
          md: "minmax(auto, 400px) 1fr",
        },
        gridTemplateRows: "30vh 1fr auto",
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
          backgroundImage: `url('${TMDB_IMAGE_URL}${data.backdrop_path}')`,
          borderImage:
            "fill 1 linear-gradient(hsl(0 0% 100% / .3), hsl(0 0% 0% / .9))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          margin: "2rem",
          gridRow: "1 / span 2",
          gridColumn: "1 / span 1",
          position: "relative",
          aspectRatio: "2/3",
          maxWidth: "100%",
        }}
      >
        <Image
          fill
          src={`${TMDB_IMAGE_URL}${data.poster_path}`}
          alt={data.title}
        />
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          gridColumn: {
            sx: "1 / span 1",
            sm: "2 / span 1",
          },
          gridRow: {
            sx: "3 / span 1",
            sm: "2 / span 1",
          },
          pt: "2rem",
        }}
      >
        <Typography variant="h4">Overview</Typography>
        <Typography variant="body1">{data.overview}</Typography>
      </Container>
    </Box>
  );
}
