import jobsModel from "../model/jobsModel.js";
import mongoose from "mongoose";

export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please provide all fields");
  }
  //since we login already using a user to ye property apan ko request object se mil jayegi
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

//////////////////=====GET JOBS======//////////////////////

export const getAllJobsController = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });

  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

////////////=====update jobs=====////////////////////
export const updateJobsController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //validation
  if (!company || !position) {
    next("please provide all fields");
  }

  //find job
  const job = await jobsModel.findOne({ _id: id });

  //validation
  if (!job) {
    next(`No jobs found with this id ${id}`);
  }

  if (!req.user.userId === job.createdBy.toString()) {
    next("Your are not authorized to update this job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  //res
  res.status(200).json({ updateJob });
};

///////++++DELETE+++++++++//////////////

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No Job found with this ID ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to do this job");
    return;
  }

  await job.deleteOne();

  res.status(200).json({ message: "Success,Job deleted" });
};

/////////////////////++++++++++Job stats and filter++++///////////////////////
export const jobStatsController = async (req, res, next) => {
  const stats = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  //default stats
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };
  res.status(200).json({
    results: stats.length,
    defaultStats,
  });
};

//user
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQwYjA1YTI1ZmNkMDRlNGRiZDQwODYiLCJpYXQiOjE3MTU2Nzg5MTksImV4cCI6MTcxNzQwNjkxOX0.n8MaBKkPxEH2EA7spe-UehzuuwM7Cf0ZwPIMeS9Ficw
// {
//   "email":"auther@email.com",
//   "password":"5ehfheu"
// }
