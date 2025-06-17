"use client";

import { useEffect, useState } from "react";
import { Job } from "./useSearchJobs";

export function useLikeJobs() {
  const [likedJobs, setLikedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const alreadyLikedStr = window.localStorage.getItem("liked");
    if (!alreadyLikedStr) return;
    try {
      const alreadyLiked = JSON.parse(alreadyLikedStr);
      if (Array.isArray(alreadyLiked)) {
        setLikedJobs(alreadyLiked);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  function likeJob(job: Job) {
    setLikedJobs((alreadyLiked) => {
      const newLiked = [...alreadyLiked, job];
      window.localStorage.setItem("liked", JSON.stringify(newLiked));
      return newLiked;
    });
  }

  function dislikeJob(job: Job) {
    setLikedJobs((alreadyLiked) => {
      const newLiked = alreadyLiked.filter(
        (likedJob) => likedJob.job_id !== job.job_id,
      );
      window.localStorage.setItem("liked", JSON.stringify(newLiked));
      return newLiked;
    });
  }

  return {
    likedJobs,
    likeJob,
    dislikeJob,
  };
}
