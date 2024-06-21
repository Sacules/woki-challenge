import { router } from "@/app/api";
import { Box, Typography } from "@mui/material";
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
          sm: "1fr 65ch 1fr",
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
            sm: "2 / span 2",
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
          display: "grid",
          gridTemplateRows: "450px repeat(2, min-content)",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            aspectRatio: "2/3",
            maxWidth: "300px",
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
        <Typography variant="h6" textAlign="center">
          {data.vote_average} / 10
        </Typography>
        <Typography variant="subtitle2" textAlign="center">
          {data.vote_count} votes
        </Typography>
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
        <Box>
          <Typography variant="h6" color="currentColor">
            {data.tagline}
          </Typography>
          <Typography variant="body2">{data.overview}</Typography>
        </Box>
        <Typography variant="h6" pt="1rem">
          Cast
        </Typography>
        <Box display="flex" sx={{ overflowX: "scroll" }} gap="2rem" py="1rem">
          {data.credits.cast.map((c) => (
            <figure key={c.id} style={{ margin: 0 }}>
              <Image
                width={100}
                height={150}
                src={createTMDBImgUrl("w200", c.profile_path)}
                alt={c.name}
              />
              <figcaption>
                <Typography variant="body2" textAlign="center">
                  {c.name}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign="center"
                  fontStyle="italic"
                >
                  {c.character}
                </Typography>
              </figcaption>
            </figure>
          ))}
        </Box>
        <Typography variant="h6" pt="1rem">
          Crew
        </Typography>
        <Box display="flex" sx={{ overflowX: "scroll" }} gap="2rem" py="1rem">
          {data.credits.crew.map((c) => (
            <figure key={`${c.id}-${c.job}`} style={{ margin: 0 }}>
              {c.profile_path && (
                <Image
                  width={100}
                  height={150}
                  src={createTMDBImgUrl("w200", c.profile_path)}
                  alt={c.name}
                />
              )}
              <figcaption>
                <Typography variant="body2" textAlign="center">
                  {c.name}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign="center"
                  fontStyle="italic"
                >
                  {c.job}
                </Typography>
              </figcaption>
            </figure>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
