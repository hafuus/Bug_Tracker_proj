import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link  , useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AddProject = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [teamMembersList, setTeamMembersList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3300/user')
    .then((response) => {
      setTeamMembersList(response.data);
    });
  }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        // Check if a project with the same name already exists
        const checkResponse = await axios.get('http://localhost:3300/project/check', {
          params: {
            projectName: projectName,
          },
        });
    
        if (checkResponse.data.exists) {
          // If the project exists, show an error message
          toast.error('Project with the same name already exists.');
        } else {
          // If the project doesn't exist, create it
          const createResponse = await axios.post('http://localhost:3300/project/save', {
            projectName,
            description,
            teamMembers,
          });
    
          if (createResponse.status === 200) {
            console.log('Project created successfully');
            navigate("/admin");
            toast.success('Created successfully');
          }
        }
      } catch (error) {
        console.error('Error creating project:', error);
      }
    };
    

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center w-4/5">
      <div className="bg-white rounded-lg shadow-md p-6 text-cyan-950 font-semibold">
        <h2 className="text-2xl font-bold text-cyan-950 mb-4">Create Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 font-semibold">
            <label htmlFor="projectName" className="block text-cyan-900">Project Name:</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-cyan-900">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="teamMembers" className="block text-cyan-900">Team Members:</label>
            <select
              id="teamMembers"
              name="teamMembers"
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-cyan-900"
            >
              <option className="text-cyan-900" value="">
                Select Team Member
              </option>
              {teamMembersList.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.fullname} 
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-cyan-950 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md ml-4 sm:ml-6 md:ml-10 mt-6">
            Create Project
          </button>
          <button type="button" onClick={handleCancel} className="block text-center text-gray-600 mt-2">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
