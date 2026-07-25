import { useState } from "react";
import axios from "axios";

function AddJob() {

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post("http://localhost:8080/jobs", job);

      alert("Job Added Successfully!");

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
      });

    } catch (error) {
      console.log(error);
      alert("Failed to Add Job");
    }
  };

  return (
    <div className="container mt-5">

      <h2>Add Job</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          placeholder="Job Title"
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
        ></textarea>

        <button className="btn btn-success">
          Add Job
        </button>

      </form>

    </div>
  );
}

export default AddJob;