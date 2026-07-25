import { useEffect, useState } from "react";
import { getApplications } from "../services/ApplicationService";
import { updateStatus } from "../services/ApplicationService";


function Applications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
  try {
    const response = await getApplications();
    console.log(response.data);   // <-- add this
    setApplications(response.data);
  } catch (error) {
    console.log(error);
  }
};
    const changeStatus = async (id, status) => {
  try {
    await updateStatus(id, status);

    alert("Status Updated Successfully");

    loadApplications();

    window.location.href = "/";

  } catch (error) {
    console.log(error);
    alert("Update Failed");
  }
};

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Job Applications</h2>

            <table className="table table-bordered">
               <thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Job</th>
    <th>Company</th>
    <th>Resume</th>
    <th>Status</th>
  </tr>
</thead>

                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.applicantName}</td>
                            <td>{app.applicantEmail}</td>
                            <td>{app.job.title}</td>
                            <td>{app.job.company}</td>
                            <td>
  <a
  href={`http://localhost:8080/applications/resume/${encodeURIComponent(app.resume)}`}
  target="_blank"
  rel="noreferrer"
  className="btn btn-primary btn-sm"
>
  View Resume
</a>
</td>
                            <td>
  <span className="me-2">{app.status}</span>

  <button
    className="btn btn-success btn-sm me-2"
    onClick={() => changeStatus(app.id, "Accepted")}
  >
    Accept
  </button>

  <button
    className="btn btn-danger btn-sm"
    onClick={() => changeStatus(app.id, "Rejected")}
  >
    Reject
  </button>
</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Applications;