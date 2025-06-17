import { Job } from "@/hooks";
import { EmptyHeart, FullRedHeart } from "@/icons";
import Link from "next/link";

interface JobsListProps {
  jobs: Job[];
  likedJobs: Job[];
  likeJob: (job: Job) => void;
  dislikeJob: (job: Job) => void;
}

export function JobsList({
  jobs,
  likedJobs,
  likeJob,
  dislikeJob,
}: JobsListProps) {
  return jobs.length > 0 ? (
    <ol>
      {jobs.map((job) => {
        const alreadyLiked = likedJobs.some(
          (likedJob) => likedJob.job_id === job.job_id,
        );
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
              className={alreadyLiked ? "" : "hidden group-hover:block"}
              onClick={() => {
                if (alreadyLiked) {
                  dislikeJob(job);
                } else {
                  likeJob(job);
                }
              }}
            >
              {alreadyLiked ? <FullRedHeart /> : <EmptyHeart />}
            </button>
          </li>
        );
      })}
    </ol>
  ) : (
    <div>No jobs</div>
  );
}
