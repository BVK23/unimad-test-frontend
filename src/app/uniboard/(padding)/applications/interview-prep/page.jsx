import React from "react";
import AddNewInterview from "./add-new-interview";
import InterviewPrepCard from "./interview-prep-card";

const InterviewPrepPage = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-8">
      <AddNewInterview />
      <InterviewPrepCard
        data={{
          role: "Frontend Developer",
          company: "Google",
        }}
      />
    </div>
  );
};

export default InterviewPrepPage;
