"use client";

import { getCookie } from "@/helpers";
import axios from "axios";
import useSWR from "swr";

export interface UserData {
  _id: string;
  email: string;
  name: string;
  jobTitle: string;
  aboutMe?: string;
}

async function fetcher(url: string) {
  const token = getCookie("token");
  return axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);
}

export function useUserData() {
  const { data, error, isLoading } = useSWR<UserData>(
    `${process.env.NEXT_PUBLIC_API_URL}/me`,
    fetcher,
    { revalidateOnFocus: false },
  );

  return {
    userData: data,
    error,
    isLoading,
  };
}
