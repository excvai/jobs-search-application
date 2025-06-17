"use client";

import { PageContainer } from "@/components/layout";
import { useCompanyLogo } from "@/hooks";
import { useJobDetails } from "@/hooks/useJobDetails";
import Image from "next/image";

export default function JobDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const { job, jobError, jobLoading } = useJobDetails(id);

  const { companyLogo, companyLogoError, companyLogoLoading } = useCompanyLogo(
    job?.employer_name,
  );
  if (companyLogoError) {
    console.error(companyLogoError);
  }

  if (jobError) {
    return (
      <PageContainer>
        <p className="text-red-500">{jobError.response.data.message}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {jobLoading || companyLogoLoading ? (
        <div>Loading...</div>
      ) : !job ? (
        <div>Job with such ID not found</div>
      ) : (
        <div className="space-y-4">
          {companyLogo && (
            <div className="relative h-[200px] mx-auto aspect-[3/2] max-w-fit">
              <Image
                className="object-contain"
                src={companyLogo}
                alt=""
                fill
                priority
              />
            </div>
          )}
          <h1 className="text-center text-2xl font-bold">{job.job_title}</h1>
          <div>
            <p className="font-bold">Employer name:</p>
            <p>{job.employer_name}</p>
          </div>
          <div>
            <p className="font-bold">Location:</p>
            <p>{job.job_location}</p>
          </div>
          {job.job_posted_at && (
            <div>
              <p className="font-bold">Posted at:</p>
              <p>{job.job_posted_at}</p>
            </div>
          )}
          <div>
            <p className="font-bold">Description:</p>
            <p className="text-justify">{job.job_description}</p>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
