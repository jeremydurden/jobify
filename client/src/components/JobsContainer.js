import { useEffect } from "react";
import { useAppContext } from "../context/appContext";

import Job from "./Job";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";

const JobsContainer = () => {
  const { getJobs, jobs, isLoading, page, totalJobs } = useAppContext();

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div>
      <Loading center />
    </div>
  );
};
export default JobsContainer;
