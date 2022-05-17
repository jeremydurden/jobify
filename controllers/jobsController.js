import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermission from "../utils/checkPermissions.js";

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  //created a property called createdBy and attaches the userID in order to reference on the model
  // user available on the request because it is being attached in the auth or authenticateUser middleware found in the server and then the middleware folder

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const deleteJob = async (req, res) => {
  //destructure and give an alias
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id:${jobId}`);
  }
  checkPermission(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
const updateJob = async (req, res) => {
  //destructure and give an alias
  const { id: jobId } = req.params;
  const { company, position } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id:${jobId}`);
  }
  checkPermission(req.user, job.createdBy);
  //find job and update where the _id property on the job matches the jobId from req.params and then update pased on the values in req.body
  const updatedJob = await Job.findByIdAndUpdate({ _id: jobId }, req.body, {
    new: true,
    //checks to make sure value isn't null or that it doesn't match a required value
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};
const showStats = async (req, res) => {
  res.send("showStats");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
