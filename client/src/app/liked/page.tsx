"use client";

import { PageContainer } from "@/components/layout";
import { useLikeJobs } from "@/hooks";
import { FullRedHeart } from "@/icons";
import Link from "next/link";

export default function Liked() {
  const { likedJobs, dislikeJob } = useLikeJobs();

  return (
    <PageContainer>
      {likedJobs.length > 0 ? (
        <ol>
          {likedJobs.map((job) => {
            return (
              <li
                key={job.job_id}
                className="group p-4 hover:bg-gray-100 border-b flex items-center justify-between gap-4"
              >
                <div>
                  <Link
                    className="group-hover:underline font-bold"
                    href={`/job-details/${job.job_id}`}
                  >
                    {job.job_title}
                  </Link>
                  <p>
                    {job.employer_name},{" "}
                    <span className="text-gray-400">{job.job_location}</span>
                  </p>
                </div>
                <button
                  className="hidden group-hover:block"
                  onClick={() => {
                    dislikeJob(job);
                  }}
                >
                  <FullRedHeart />
                </button>
              </li>
            );
          })}
        </ol>
      ) : (
        <div>You haven’t liked any jobs yet.</div>
      )}
    </PageContainer>
  );
}
