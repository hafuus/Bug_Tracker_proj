import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProjectDetails from './ProjectDetails';
import AddProject from './AddProject';
import {FaPlus} from "react-icons/fa";

function Projects() {
  const [projects, setProjects] = useState([]); 
  const [showAddProject, setShowAddProject] = useState(false);

  useEffect(() => {

    fetch('http://localhost:3300/project')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []); 


  return (
    <div className="w-full p-4 ml-16 mt-16 flex flex-col">
      <div className="max-w-screen-lg mx-auto bg-teal-50 ">
        <div className='bg-gray-200 flex justify-between mb-7'>
          <h3 className="text-4xl font-bold text-cyan-900 pl-6">Projects</h3>
          <Link
            to="/admin/projects/create-project"
            className="bg-gray-300 no-underline font-bold py-2 px-4 ml-6 rounded hover:bg-gray-400 mb-1 mr-4 text-black flex align-center"
            onClick={() => setShowAddProject(!showAddProject)}
          >
          
            Add Project
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 py-2 px-4">Project Name</th>
                <th className="border border-gray-300 py-2 px-4">Description</th>
                <th className="border border-gray-300 py-2 px-4">Details</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index} className={index % 2 === 0 ? 'border border-gray-300' : 'border border-gray-200'}>
                  <td className="border border-gray-300 py-2 px-4">{project.projectName}</td>
                  <td className="border border-gray-300 py-2 px-4">{project.description}</td>
                  <td className="border border-gray-300 py-2 px-4">
                    <Link to={`/admin/projects/details/${project._id}`} className="text-cyan-900 hover:underline">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col">
        {showAddProject && <AddProject />}
      </div>
    </div>
  );
}

export default Projects;
