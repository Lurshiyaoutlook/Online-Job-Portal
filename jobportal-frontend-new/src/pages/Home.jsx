import { useEffect, useState } from "react";
import { getAllJobs, deleteJob } from "../services/JobService";
import { useNavigate } from "react-router-dom";
import { applyJob } from "../services/ApplicationService";
import { getApplications } from "../services/ApplicationService";

function Home() {
    const [jobs, setJobs] = useState([]);
const [search, setSearch] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const jobsPerPage = 6;
const role = localStorage.getItem("role");
const [showModal, setShowModal] = useState(false);
const [selectedJob, setSelectedJob] = useState(null);

const [applicantName, setApplicantName] = useState("");
const [applicantEmail, setApplicantEmail] = useState("");
const [resume, setResume] = useState(null);
  

  useEffect(() => {
    loadJobs();
    loadApplications();
     const interval = setInterval(() => {
    loadApplications();
  }, 2000);

  return () => clearInterval(interval);
  }, []);
  const loadApplications = async () => {
  try {
    const response = await getApplications();
    setApplications(response.data);
  } catch (error) {
    console.error(error);
  }
};
  const [applications, setApplications] = useState([]);
  const handleApply = (job) => {
  setSelectedJob(job);
  setApplicantName("");
  setApplicantEmail("");
  setResume(null);
  setShowModal(true);
};
  
const navigate = useNavigate();
  const loadJobs = async () => {
    try {
      const response = await getAllJobs();
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = async (id) => {

  const confirmDelete = window.confirm("Are you sure you want to delete this job?");

  if (!confirmDelete) return;

  try {
    await deleteJob(id);
    alert("Job Deleted Successfully!");
    loadJobs();
  } catch (error) {
    console.log(error);
    alert("Failed to Delete Job");
  }
};

const submitApplication = async () => {

  if (!resume) {
    alert("Please select your Resume PDF");
    return;
  }

  const formData = new FormData();

  formData.append("applicantName", applicantName);
  formData.append("applicantEmail", applicantEmail);
  formData.append("jobId", selectedJob.id);
  formData.append("resume", resume);

  try {

    await applyJob(formData);

    alert("Application Submitted Successfully!");

    setShowModal(false);

    loadApplications();

  } catch (error) {

    console.error(error);

    alert("Application Failed!");

  }
};
const indexOfLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexOfLastJob - jobsPerPage;

const filteredJobs = jobs.filter((job) =>
  job.title.toLowerCase().includes(search.toLowerCase())
);

const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <div className="row mb-4">

  <div className="col-md-3">
    <div className="card bg-primary text-white">
      <div className="card-body text-center">
        <h5>Total Jobs</h5>
        <h2>{jobs.length}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card bg-success text-white">
      <div className="card-body text-center">
        <h5>Applications</h5>
        <h2>{applications.length}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card bg-info text-white">
      <div className="card-body text-center">
        <h5>Accepted</h5>
        <h2>{applications.filter(a => a.status === "Accepted").length}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card bg-danger text-white">
      <div className="card-body text-center">
        <h5>Rejected</h5>
        <h2>{applications.filter(a => a.status === "Rejected").length}</h2>
      </div>
    </div>
  </div>

</div>
        <h1 className="display-4 fw-bold">Find Your Dream Job</h1>
        <p className="lead">
          Explore thousands of job opportunities from top companies.
        </p>
      </div>
<div className="mb-4">
  <input
    type="text"
    className="form-control"
    placeholder="Search by Job Title..."
    value={search}
    onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
  />
</div>
      <div className="row">
        {currentJobs.map((job) => (
          <div className="col-md-4 mb-4" key={job.id}>
            <div className="card shadow">
              <div className="card-body">
                <h4>{job.title}</h4>
                <p><b>Company:</b> {job.company}</p>
                <p><b>Location:</b> {job.location}</p>
                <p><b>Salary:</b> {job.salary}</p>

                <div className="d-flex gap-2">

 {role === "USER" && (
  <button
    className="btn btn-warning"
    onClick={() => handleApply(job)}
  >
    Apply
  </button>
)}
 {role === "ADMIN" && (
  <button
    className="btn btn-primary"
    onClick={() => navigate(`/edit-job/${job.id}`)}
  >
    Edit
  </button>
)}

  {role === "ADMIN" && (
  <button
    className="btn btn-danger"
    onClick={() => handleDelete(job.id)}
  >
    Delete
  </button>
)}

</div>

              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center mt-4 gap-3">

  <button
    className="btn btn-secondary"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    className="btn btn-secondary"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>

</div>
{showModal && (
  <div
    className="modal d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">
            Apply for {selectedJob?.title}
          </h5>

          <button
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>

        <div className="modal-body">

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Applicant Name"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Applicant Email"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
          />

          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
          />

        </div>

        <div className="modal-footer">

          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn-success"
            onClick={submitApplication}
          >
            Submit
          </button>

        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Home;