import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectDetails from './ProjectDetails';
import { useNavigate, useParams } from 'react-router-dom';

function Members() {
  const { projectId } = useParams();
  // const { projectId, mode } = useParams();
  // console.log(projectId)
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isRemoveMemberModalOpen, setIsRemoveMemberModalOpen] = useState(false);
  const [mode, setMode] = useState('add'); 


  const navigate = useNavigate();


  useEffect(() => {

    axios.get('http://localhost:3300/user')
      .then((response) => {
        setTeamMembers(response.data);
      });
  }, []);
  
  const handleAddMembers = async() => {
    setMode('add');
    try {
      const response = await axios.post(`http://localhost:3300/project/${projectId}/add-members`, {
        members: selectedMembers,
      });

      console.log(selectedMembers)

      if (response.status === 200) {

        console.log('Members added successfully');
      }
    } catch (error) {

      console.error('Error adding members:', error);
    }
  };
  
  const handleCancel = () => {
    navigate(`/admin/projects/details/${projectId}`)
  };



  const handleRemoveMembers = async () => {
    try {
      setMode('remove');

      setIsRemoveMemberModalOpen(true);
    } catch (error) {

      console.error('Error removing members:', error);
    }
  };

  const handleConfirmRemoveMembers = async () => {
    try {
   
      const response = await axios.post(`http://localhost:3300/project/${projectId}/remove-members`, {
        members: selectedMembers.map(member => member._id),
      });

      console.log('Members removed successfully:', response.data);
     
      setIsRemoveMemberModalOpen(false);
      setTeamMembers(response.data.members);
      setSelectedMembers([]); 
    } catch (error) {
      console.error('Error removing members:', error.response.data);
    }
  };

  const handleCancelRemoveMembers = () => {
    setIsRemoveMemberModalOpen(false);
    setSelectedMembers([]); 
  };




  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-4/5">
      <div className="bg-white rounded-lg shadow-md p-6 text-cyan-950 font-semibold">
        <h2 className="text-2xl font-bold text-cyan-950 mb-4">Select Team Members</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="teamMembers" className="block text-cyan-900">Team Members:</label>
            <select
              multiple
              id="teamMembers"
              name="teamMembers"
              value={selectedMembers}
              onChange={(e) => setSelectedMembers(Array.from(e.target.selectedOptions, (option) => option.value))}
              required
              className="w-full px-4 py-2 border rounded-lg text-cyan-900"
            >
              {teamMembers.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.fullname}
                </option>
              ))}
            </select>
          </div>

          {mode === 'add' &&(
          <button
            type="button"
            onClick={handleAddMembers}
            className="bg-gray-700 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-md ml-4 sm-ml-6 md-ml-10 mt-6 "
          >
            Add Team Members
          </button>

          )}

      {mode === 'remove' && (
          <button
            type="button"
            onClick={handleRemoveMembers}
            className="bg-gray-700 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-md ml-4 sm-ml-6 md-ml-10 mt-6 "
          >
            Remove Team Members
          </button>
          )}
          <div className="flex justify-between flex-col mt-3">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            </div>
            {isRemoveMemberModalOpen && (
            <div>
          
              <div className="bg-white rounded-lg shadow-md p-6 text-cyan-950 font-semibold mt-4">
                <h2 className="text-xl font-bold text-cyan-950 mb-4">Confirm Removal</h2>
                <p>Are you sure you want to remove the selected members?</p>
                <button
                  type="button"
                  onClick={handleConfirmRemoveMembers}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2 mt-4"
                >
                  Confirm
                </button>

                <button
                  type="button"
                  onClick={handleCancelRemoveMembers}
                  className="bg-gray-300 hover:bg-gray-400 text-cyan-900 font-bold py-2 px-4 rounded-md mt-4"
                >
                  Cancel
                </button>
              </div>
            </div>
                    )}
        </form>
      </div>
    </div>
  );
}

export default Members;
