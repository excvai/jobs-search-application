"use client";

import axios from "axios";
import useSWR from "swr";

export interface CompanyLogo {
  name: string;
  ticker: string;
  image: string;
}

async function fetcher(url: string) {
  return axios
    .get(url, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_LOGO_KEY,
      },
    })
    .then((res) => res.data);
}

export function useCompanyLogo(companyName: string | undefined) {
  const { data, error, isLoading } = useSWR<CompanyLogo[]>(
    companyName
      ? `https://api.api-ninjas.com/v1/logo?name=${companyName}`
      : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  const logoImageUrl = data?.[0]?.image;

  return {
    companyLogo: logoImageUrl,
    companyLogoError: error,
    companyLogoLoading: isLoading,
  };
}
