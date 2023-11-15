import React, { useState, useEffect } from 'react';
import { useParams , useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function TicketDetails(_id ) {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3300/issue/details/${id}`);
          // console.log(response.data)
          setTicket(response.data); // Update with the correct data structure
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return <p>Loading ticket details...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!ticket) {
    return <p>Ticket not found.</p>;
  }


  
  
  return (
    <div className="w-full p-4 ml-16 mt-16 flex flex-col">
      <div className="max-w-screen-lg mx-auto  ">  
      <Link to={`/admin/tickets/details/${ticket._id}/edit`}
          className=" no-underline  bg-gray-300 text-black px-3 py-2 rounded-lg  hover:bg-gray-400  "
    
        >
          Edit Ticket
        </Link> 
        <div className="flex bg-gray-200 text-cyan-950 text-ceter mt-4">
          <h3 className="text-4xl font-bold text-cyan-950 pl-6 py-2">{ticket.title} Ticket</h3>
        
        </div>
        <table className="w-full border border-collapse border-cyan-400">
  <tbody>
    <tr className="bg-teal-50">
      <th className="py-2 px-4 border border-cyan-400">Description</th>
      <td className="py-2 px-4 border border-cyan-400">{ticket.description ? ticket.description : 'N/A'}</td>
    </tr>
    <tr>
      <th className="py-2 px-4 border border-cyan-400">Status</th>
      <td className="py-2 px-4 border border-cyan-400">{ticket.status ? ticket.status : 'N/A'}</td>
    </tr>
    <tr className="bg-teal-50">
      <th className="py-2 px-4 border border-cyan-400">Priority</th>
      <td className="py-2 px-4 border border-cyan-400">{ticket.priority ? ticket.priority : 'N/A'}</td>
    </tr>
    <tr>
      <th className="py-2 px-4 border border-cyan-400">Assigned To</th>
      <td className="py-2 px-4 border border-cyan-400">{ticket.assignedTo ? ticket.assignedTo.fullname : 'N/A'}</td>
    </tr>
    <tr className="bg-teal-50">
      <th className="py-2 px-4 border border-cyan-400">Created At</th>
      <td className="py-2 px-4 border border-cyan-400">{ticket.createdAt ? ticket.createdAt : 'N/A'}</td>
    </tr>
    <tr>
      <th className="py-2 px-4 border border-cyan-400">Updated At</th>
      <td className="py-2 px-4 border border-cyan-400">{ticket.updatedAt ? ticket.updatedAt : 'N/A'}</td>
    </tr>
    <tr className="bg-teal-50">
      <th className="py-2 px-4 border border-cyan-400">Created By (Role)</th>
      <td className="py-2 px-4 border border-cyan-400">{ticket.assignedTo.role ? ticket.assignedTo.role : 'N/A'}</td>
    </tr>
  </tbody>
</table>

      </div>
    </div>
  );
}

export default TicketDetails;
