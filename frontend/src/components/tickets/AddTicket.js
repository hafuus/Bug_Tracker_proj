import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AddTicket = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Open');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [project, setProject] = useState('');
  const [usersList, setUsersList] = useState([]); // State variable for users
  const [projectsList, setProjectsList] = useState([]); // State variable for projects
  const [assignedTeam, setAssignedTeam] = useState('');
const [teamsList, setTeamsList] = useState([]); //

  useEffect(() => {
 
    axios.get('http://localhost:3300/user')
    .then((response) => {
      setUsersList(response.data);
    })
    .catch((error) => console.error('Error fetching users:', error));


 

    axios.get('http://localhost:3300/project')
    .then((response) => {
   
      setProjectsList(response.data);
    })
    .catch((error) => console.error('Error fetching projects:', error));
}, []);  

const handleSubmit = async (e) => {
  e.preventDefault();

  const exists = await checkTicketExistence(title, project);

  if (exists) {
    toast.error('A ticket with the same title already exists in the project.');
    return;
  }

  try {
    const user = usersList.find((u) => u.email === assignedTo);
    const selectedProject = projectsList.find((p) => p._id === project);

    if (!user || !selectedProject) {
      console.error('User or project not found.');
      return;
    }

    const response = await axios.post('http://localhost:3300/issue/save', {
      title,
      description,
      status,
      priority,
      assignedTo: user._id, 
      project: selectedProject._id, 
    });

    if (response.status === 200) {
      console.log('Project data from the API:', response.data);
      toast.success('Created successfully');
      navigate('/admin/tickets');
    }
  } catch (error) {
    console.error('Error creating ticket:', error);
    console.error('Error creating ticket:', error.response.data);
  }
};

const checkTicketExistence = async (title, projectId) => {
  try {
    const response = await axios.get(
      `http://localhost:3300/issue/check?issueTitle=${title}&projectId=${projectId}`
    );

    return response.data.exists;
  } catch (error) {
    console.error('Error checking for existing ticket:', error);
    return false;
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-4/5 pt-5">
      <div className="bg-white rounded-lg shadow-md p-6 text-cyan-950 font-semibold ">
        <h2 className="text-2xl font-bold text-cyan-950 mb-4">Create Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 font-semibold">
            <label htmlFor="title" className="block text-cyan-900">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-cyan-900">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-cyan-900">
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-cyan-900"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Testing">Testing</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-cyan-900">
              Priority:
            </label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-cyan-900"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4">
  <label htmlFor="assignedTo" className="block text-cyan-900">
    Assigned To 
  </label>
  <select
    id="assignedTo"
    name="assignedTo"
    value={assignedTo}
    onChange={(e) => setAssignedTo(e.target.value)}
    required
    className="w-full px-4 py-2 border rounded-lg text-cyan-900"
  >
    <option value="">Select Assigned To</option>
    {usersList.map((user) => (
      <option key={user.email} value={user.email}>
        {user.fullname}
      </option>
    ))}
  </select>
</div>


<div className="mb-4">
  <label htmlFor="project" className="block text-cyan-900">
    Project
  </label>
  <select
    id="project"
    name="project"
    value={project}
    onChange={(e) => setProject(e.target.value)}
    required
    className="w-full px-4 py-2 border rounded-lg text-cyan-900"
  >
    <option value="">Select Project</option>
    {projectsList.map((project) => (
      <option key={project._id} value={project._id}>
        {project.projectName} 
      </option>
    ))}
  </select>
</div>

          <button
            type="submit"
            className="bg-cyan-950 hover-bg-cyan-700 text-white font-bold py-2 px-4 rounded-md ml-4 sm-ml-6 md-ml-10 mt-6"
          >
            Create Ticket
          </button>
          <Link to="/admin/tickets" className="block text-center text-gray-600 mt-2">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;
