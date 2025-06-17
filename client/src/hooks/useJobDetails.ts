"use client";

import axios from "axios";
import useSWR from "swr";
import { Job } from "./useSearchJobs";

async function fetcher(url: string) {
  return axios
    .get(url, {
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
      },
    })
    .then((res) => res.data.data[0]);
}

export function useJobDetails(id: string) {
  const { data, error, isLoading } = useSWR<Job>(
    `https://${process.env.NEXT_PUBLIC_RAPIDAPI_HOST}/job-details?job_id=${id}`,
    fetcher,
    { revalidateOnFocus: false },
  );

  return {
    job: data,
    jobError: error,
    jobLoading: isLoading,
  };
}
