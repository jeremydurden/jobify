import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermission from "../utils/checkPermissions.js";
import mongoose from "mongoose";

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
  //aggregate pipeline, pass in the array of steps, each step is represented as an object
  //FIRST STEP is $match and then we're looking for all jobs createdBy the current user
  //we have access to the userId on the request because of the auth.js middleware, but it is a string,
  //so we use the mongoose.Types from the Jobs model w/ the string as the argument
  //this first step just returns the entire jobs document for the current user

  //SECOND STEP
  //next we use the $group operator - it looks at everything returned from the match and checks for the property status on those objects
  //when it finds a new value for status, it creates an object with two properties: _id:statusValue and count:X where X is the total number times that value is present
  //in the initial matched object
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    //destructuring _id and count from curr and giving _id an alias of title
    const { _id: title, count } = curr;
    //stats now equals an object w/ properties equal to the _id or title and for each title we set the value to the count
    acc[title] = count;
    return acc;
  }, {});
  res.status(StatusCodes.OK).json({ stats });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
