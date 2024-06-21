import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Movie } from "../types";
import Link from "next/link";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/original";

interface Props {
  results: Movie[];
}

export default function SearchResults({ results }: Props) {
  return (
    <Grid
      container
      columns={{ xs: 1, sm: 2, md: 4, lg: 5, xl: 6 }}
      sx={{ py: "2rem", gap: "1rem" }}
    >
      {results.map((r) => (
        <Grid
          key={r.id}
          xs={1}
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
        >
          <Link href={`/details/${r.id}`}>
            <Card
              sx={{ maxWidth: "300px", overflow: "visible !important" }}
              elevation={0}
            >
              {r.poster_path && (
                <CardMedia
                  sx={{ boxShadow: "1px 2px 5px grey", aspectRatio: "2 / 3" }}
                  component="img"
                  alt={r.title}
                  image={`${TMDB_IMAGE_URL}${r.poster_path}`}
                />
              )}
              <CardContent sx={{ padding: "0.5rem" }}>
                <Grid container>
                  <Grid xs={12}>
                    <Typography textAlign="center" variant="subtitle2">
                      {r.title}
                    </Typography>
                  </Grid>
                  <Grid
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="end"
                  >
                    <Typography variant="caption">
                      {new Date(r.release_date).getFullYear()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
