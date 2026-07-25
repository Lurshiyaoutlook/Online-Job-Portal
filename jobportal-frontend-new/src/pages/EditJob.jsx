import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/JobService";

function EditJob() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    const response = await getJobById(id);
    setJob(response.data);
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const saveJob = async (e) => {
    e.preventDefault();
    await updateJob(id, job);
    alert("Job Updated Successfully!");
    navigate("/");
  };

  return (
    <div className="container mt-5">

      <h2>Edit Job</h2>

      <form onSubmit={saveJob}>

        <input
          className="form-control mb-3"
          placeholder="Title"
          name="title"
          value={job.title}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Company"
          name="company"
          value={job.company}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Location"
          name="location"
          value={job.location}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Salary"
          name="salary"
          value={job.salary}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          name="description"
          value={job.description}
          onChange={handleChange}
        />

        <button className="btn btn-success">
          Update Job
        </button>

      </form>

    </div>
  );
}

export default EditJob;