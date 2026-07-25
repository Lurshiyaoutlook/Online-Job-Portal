import { useEffect, useState } from "react";
import { getAllJobs } from "../services/JobService";
function Home() {
    const [jobs, setJobs] = useState([]);

useEffect(() => {
    loadJobs();
}, []);

const loadJobs = async () => {
    try {
        const response = await getAllJobs();
        setJobs(response.data);
    } catch (error) {
        console.error(error);
    }
};
  return (
    <div className="container mt-5">

      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Find Your Dream Job</h1>
        <p className="lead">
          Explore thousands of job opportunities from top companies.
        </p>

        <button className="btn btn-primary btn-lg me-3">
          View Jobs
        </button>

        <button className="btn btn-success btn-lg">
          Register Now
        </button>
      </div>

      <div className="row">
  {jobs.map((job) => (
    <div className="col-md-4 mb-4" key={job.id}>
      <div className="card shadow">
        <div className="card-body">
          <h4>{job.title}</h4>
          <p><b>Company:</b> {job.company}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Salary:</b> {job.salary}</p>

          <button className="btn btn-warning">
            Apply
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default Home;