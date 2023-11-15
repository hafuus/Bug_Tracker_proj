import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProject = ({ onSave, onCancel }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [editedProject, setEditedProject] = useState({
    projectName: '', // Initialize with empty values
    description: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3300/project/details/${projectId}`)
      .then((response) => {
        const projectData = response.data.project;
        setEditedProject({
          projectName: projectData.projectName,
          description: projectData.description,
        });
      })
      .catch((error) => {
        console.error('Error fetching project data:', error);
      });
  }, [projectId]);

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:3300/project/update/${projectId}`, editedProject);
      navigate(`/admin`);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleCancelClick = () => {
    navigate(`/admin`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-4/5">
      <div className="bg-white rounded-lg shadow-md p-6 text-cyan-950 font-semibold">
        <h2 className="text-2xl font-bold text-cyan-950 mb-4">Edit Project</h2>
        <form>
          <div className="mb-4 font-semibold">
            <label htmlFor="projectName" className="block text-cyan-900">
              Project Name:
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={editedProject.projectName}
              onChange={(e) =>
                setEditedProject({ ...editedProject, projectName: e.target.value })
              }
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
              value={editedProject.description}
              onChange={(e) =>
                setEditedProject({ ...editedProject, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleSaveClick}
            className="bg-cyan-950 hover-bg-cyan-700 text-white font-bold py-2 px-4 rounded-md ml-4 sm-ml-6 md-ml-10 mt-6"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="block text-center text-gray-600 mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
