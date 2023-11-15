import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserProject() {
  const [projects, setProjects] = useState([]);
  const userId = localStorage.getItem('userId');
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:3300/project/userProject/${userId}`)
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user-specific projects:', error);
          toast.error('This user has no projects.');
        });
    }
    const fetchUsername = async () => {
      try {
        // Replace this with your actual API call to fetch the username
        const response = await fetch(`http://localhost:3300/user/profile/${userId}`);
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    // Call the function to fetch and set the username
    fetchUsername();
  }, []);

  return (
    <div>
       <h2 className="text-2xl font-bold m-4">
          Welcome Back {username}!
          </h2>
    <div className='flex flex-col pl-72 mt-24'>
      <div className=''>
      <h2 className="text-xl font-semibold mb-4 pl-4"> Here is your projects..</h2>
    {projects.map((project) => (
      <div key={project.project._id} className='mb-8 text-center'>
      <table className="min-w-full border border-collapse border-gray-300 ">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 py-2 px-4">Project Name</th>
            <th className="border border-gray-300 py-2 px-4">Description</th>
            <th className="border border-gray-300 py-2 px-4">Team Members</th>
          </tr>
        </thead>
        <tbody>
          
            <tr key={project.project._id}>
              <td className="border border-gray-300 py-2 px-4">{project.project.projectName}</td>
              <td className="border border-gray-300 py-2 px-4">{project.project.description}</td>
              <td className="border border-gray-300 py-2 px-4">
                {project.teamMembers.map((member) => member.username).join(', ')}
              </td>
            </tr>
          
        </tbody>
      </table>
      </div>
      ))}
    </div>
    </div>
    </div>
  );
}

export default UserProject;
