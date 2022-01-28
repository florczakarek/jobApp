const createJob = async (req, res) => {
  res.send('Create Job');
};
const getAllJobs = async (req, res) => {
  res.send('Get All Jobs');
};
const deleteJob = async (req, res) => {
  res.send('Deleted Job');
};
const updateJob = async (req, res) => {
  res.send('Updated Job');
};
const showStats = async (req, res) => {
  res.send('You see stats of all jobs');
};

export { createJob, updateJob, showStats, deleteJob, getAllJobs };
