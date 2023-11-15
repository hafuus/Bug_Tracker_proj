import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EditProject from './EditProject';
import TicketDetails from '../tickets/TicketDetails';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Members from './Members';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [issues, setIssues] = useState([]); 
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isRemoveMemberModalOpen, setIsRemoveMemberModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [mode, setMode] = useState('add'); //not working

  // const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/project/details/${projectId}`);
        setProject(response.data.project);
        setLoading(false);
         
      } catch (error) {
        setError(error);
        setLoading(false);
        
      }
    };
    const fetchProjectIssues = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`http://localhost:3300/project/${projectId}/issues`);
        setIssues(response.data.issues);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching project issues:', error);
        setError(error);
        setLoading(false); 
      }
    };
    fetchProjectDetails();
    fetchProjectIssues();
  }, [projectId]);


  if (loading) {
    return <p>Loading project details...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  const toggleEdit = () => {
    // setIsEditing(true);
  };

  

  const handleDeleteProject = async () => {
    try {
      await axios.delete(`http://localhost:3300/project/delete/${project._id}`);
     
      navigate(`/admin/projects/details/${project._id}`)
  
    } catch (error) {
  
      console.error('Error deleting project:', error);
    }
  };
  
  const handleToggleMode = (newMode) => {
    setMode(newMode);
  };

 
  const handleAddMember = () => {

  
    navigate(`/admin/projects/details/${projectId}/members`);
  };
  const handleMembersSelected = (selectedMembers) => {
    console.log('Selected members:', selectedMembers);
    navigate(`/admin/projects/details/${projectId}`);
  };
  
  const handleRemoveMember = () => {
    setIsRemoveMemberModalOpen(true);
    console.log(isRemoveMemberModalOpen)
    navigate(`/admin/projects/details/${projectId}/members`);
  };

 

  return (
    <div className=''>
    <div className="w-full p-4 ml-16 mt-16">
    <div className='mb-4 rounded-sm font-bold'>
    {!isRemoveMemberModalOpen && (
            <button className="bg-gray-300 px-4 py-2 rounded-md mr-2 hover:bg-gray-400" onClick={handleAddMember} > Add Member</button>
    )}
     {!isRemoveMemberModalOpen && (
            <button className="bg-gray-300 px-4 py-2 rounded-md mr-2 hover:bg-gray-400" onClick={handleRemoveMember}>Remove Member</button>          
    )}
    <div className="max-w-screen-lg mx-auto  ">
    <div className="flex justify-between p-4 bg-gray-200 mb-4">
      <h3 className="text-4xl font-bold text-cyan-950">Project Details</h3>
      <div className='font-bold '>
        <Link
            to={`/admin/projects/details/${project && project._id}/edit`}
            className="bg-gray-300 hover:bg-gray-400 text-black no-underline px-4 py-2 rounded-lg mr-2 "
          >
  Edit
</Link>
        {/* <button 
        className="bg-cyan-800  text-white px-3 py-2 rounded-lg" 
        onClick={()=>handleDeleteProject(project._id)}
         >
          Delete
        </button> */}
        <button 
  className="bg-gray-300 hover:bg-gray-400 text-black no-underline px-4 py-2 rounded-lg mr-2" 
  onClick={() => project && handleDeleteProject(project._id)}
>
  Delete
</button>

      </div>
    </div>
    {project ? (
      
      <table className="w-full border border-collapse border-gray-300">

<thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 py-2 px-4">Project Name</th>
                <th className="border border-gray-300 py-2 px-4">Description</th>
                <th className="py-2 px-4 ">Created By</th>
                <th className="py-2 px-4 ">Team Members</th>

              </tr>
            </thead>
        <tbody>
            
            <td className="py-2 px-5 border border-gray-300">{project.projectName}</td>

            <td className="py-2 px-5 border border-gray-300">{project.description}</td>

            <td className="py-2 px-4 border border-gray-300">
              {project.createdBy ? project.createdBy.fullname : 'N/A'}
            </td>

            <td className="py-2 px-4 border border-gray-300">
              <ul>
                {project.teamMembers.map((member) => (
                  <li key={member._id}>{member.fullname}</li>

                ))}
              </ul>
              
            </td>
        </tbody>
      </table>
      
    ) : (
      <p className="text-cyan-900 p-4">Project not found</p>
      
    )}
 
 

    </div>
    </div>

    <div className="  ml-16 mt-16">
  <div className="max-w-screen-lg mx-auto  ">
    <div className="flex justify-between p-4 flex flex-col">
<h2 className="text-2xl text-cyan-950 font-bold p-4  bg-gray-200">Issues this proj have:</h2>
        {project ? ( 
          <table className="w-full">
            <thead>
              <tr className='bg-gray-200'>
                <th className="py-2 px-5 border border-gray-300">Issue Title</th>
                <th className="py-2 px-5 border border-gray-300">Description</th>
                <th className="py-2 px-4 border border-gray-300">Status</th>
                <th className="py-2 px-4 border border-gray-300">Priority</th>

              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue._id} className='border border-gray-300'>
                  <td className="py-2 px-5 border border-gray-300">{issue.title}</td>
                  <td className="py-2 px-5 border border-gray-300">{issue.description}</td>
                  <td className="py-2 px-4 border border-gray-300">{issue.status}</td>
                  <td className="py-2 px-4 border border-gray-300">{issue.priority}</td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-cyan-900 p-4">Project not found</p>
        )}
      </div>
    </div>
    </div>
    </div>
    </div>
    
);
}
export default ProjectDetails;