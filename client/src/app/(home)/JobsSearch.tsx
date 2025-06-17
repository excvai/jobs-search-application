"use client";

import { useLikeJobs, useSearchJobs, useUserData } from "@/hooks";
import { useState } from "react";
import { JobsList } from "./JobsList";

export function JobsSearch() {
  const [jobTitle, setJobTitle] = useState<string>("");
  const { jobs, jobsError, jobsLoading } = useSearchJobs(jobTitle);

  const { userData } = useUserData();
  const {
    jobs: recommendedJobs,
    jobsError: recommendedJobsError,
    jobsLoading: recommendedJobsLoading,
  } = useSearchJobs(userData?.jobTitle);

  const error = jobsError || recommendedJobsError;

  const { likedJobs, likeJob, dislikeJob } = useLikeJobs();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jobTitle = formData.get("jobTitle");
    if (!jobTitle || typeof jobTitle !== "string") {
      setJobTitle("");
      return;
    }
    setJobTitle(jobTitle);
  }

  return (
    <>
      <form
        className="mb-8 flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="job-title" className="text-3xl mb-2 bold">
          Enter job title
        </label>
        <input
          id="job-title"
          className="border-2 p-2 max-w-[500px] w-full"
          type="text"
          name="jobTitle"
        />
      </form>
      <div className="space-y-4">
        {error ? (
          <p className="text-red-500">
            {jobsError?.response.data.message ||
              recommendedJobsError?.response.data.message}
          </p>
        ) : (
          <>
            {(jobsLoading || recommendedJobsLoading) && <div>Loading...</div>}
            {jobTitle && !jobsLoading && (
              <JobsList
                jobs={jobs}
                likedJobs={likedJobs}
                likeJob={likeJob}
                dislikeJob={dislikeJob}
              />
            )}
            {recommendedJobs.length > 0 && (
              <>
                {/* Separate jobs from recommendedJobs */}
                {jobs.length > 0 && !jobsLoading && (
                  <div className="height-[1px] border-2 my-8"></div>
                )}
                <p className="text-2xl font-bold">Recommended jobs:</p>
                <JobsList
                  jobs={recommendedJobs}
                  likedJobs={likedJobs}
                  likeJob={likeJob}
                  dislikeJob={dislikeJob}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
