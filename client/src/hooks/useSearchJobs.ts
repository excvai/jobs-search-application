"use client";

import axios from "axios";
import useSWR from "swr";

export interface Job {
  job_id: string;
  job_title: string;
  job_description: string;
  employer_name: string;
  job_location: string;
  job_posted_at: string | null;
}

async function fetcher(url: string) {
  return axios
    .get(url, {
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
      },
    })
    .then((res) => res.data.data);
}

export function useSearchJobs(jobTitle: string | undefined) {
  const { data, error, isLoading } = useSWR<Job[]>(
    jobTitle
      ? `https://${process.env.NEXT_PUBLIC_RAPIDAPI_HOST}/search?query=${jobTitle}`
      : null,
    fetcher,
    { revalidateOnFocus: false, fallbackData: [] },
  );

  return {
    jobs: data!,
    jobsError: error,
    jobsLoading: isLoading,
  };
}
