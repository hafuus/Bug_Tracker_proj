import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3300/issue/details/${id}`)
    
      .then((response) => {
        const ticket = response.data;
        console.log('Fetched ticket data:', ticket); 
        setTicketData(ticket); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching ticket data:', error.message);
        setLoading(false); 
      });
  }, [id]);
  



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle form submission with updated ticketData
      const response = await axios.put(`http://localhost:3300/issue/update/${id}`, ticketData);

      if (response.status === 200) {
        toast.success('Updated successfully');
        navigate(`/admin/tickets/details/${id}`);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  if (loading) {

    return <p>Loading...</p>;
  }

  if (!ticketData) {

    return <p>Ticket not found</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-4/5">
      <div className="bg-white rounded-lg shadow-md p-6 text-cyan-950 font-semibold">
        <h2 className="text-2xl font-bold text-cyan-950 mb-4">Edit Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 font-semibold">
            <label htmlFor="title" className="block text-cyan-900">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={ticketData.title}
              onChange={handleInputChange}
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
              value={ticketData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
          </div>

          <div className="mb-4 font-semibold">
            <label htmlFor="title" className="block text-cyan-900">
              status:
            </label>
            <select
              type="text"
              id="status"
              name="status"
              value={ticketData.status}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg">
                 <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Testing">Testing</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
              
          </div>

         
          <div className="mb-4">
          <div className="mb-4 font-semibold">
            <label htmlFor="title" className="block text-cyan-900">
              Priority:
            </label>
            <select
              type="text"
              id="priority"
              name="priority"
              value={ticketData.priority}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          

</div>
         
          <button
            type="submit"
            className="bg-cyan-950 hover-bg-cyan-700 text-white font-bold py-2 px-4 rounded-md ml-4 sm-ml-6 md-ml-10 mt-6"
          >
            Update Ticket
          </button>
          <Link to={`/admin/tickets/details/${id}`} className="block text-center text-gray-600 mt-2">
            Cancel
          </Link>
        </form>
      </div>
    </div>
    
  );
};

export default EditTicket;
