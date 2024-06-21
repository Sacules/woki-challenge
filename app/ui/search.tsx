"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { TextField } from "@mui/material";

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <TextField
      label="Search movies"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
