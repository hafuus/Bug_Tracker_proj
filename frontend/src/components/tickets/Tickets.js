import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddTicket from './AddTicket';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [showAddTicket, setShowAddTicket] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3300/issue');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTickets(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="w-full flex flex-col justify-center pb-24 mr-32">
      <div className="max-w-screen-lg mx-auto bg-teal-50  ">
        <div className="bg-gray-200 flex justify-between">
          <h3 className="text-4xl font-bold text-cyan-950 pl-6">Tickets</h3>
          <Link
            to="/admin/tickets/create-ticket"
            className="bg-gray-300 no-underline text-black font-bold py-2 px-4 ml-6 rounded hover:bg-gray-400 mb-1 mr-4"
            onClick={() => setShowAddTicket(!showAddTicket)}
          >
            Create Ticket
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="">
              <th className="py-2 px-4 border border-cyan-400">project</th>
                <th className="py-2 px-4 border border-cyan-400">Title</th>
                <th className="py-2 px-4 border border-cyan-400">Status</th>
                <th className="py-2 px-4 border border-cyan-400">priority</th>
                <th className="py-2 px-4 border border-cyan-400">Details</th>
                

                
              </tr>
            </thead>
            <tbody>
            {tickets.map((ticket, index) => (
  <tr key={index} className={index % 2 === 0 ? 'bg-teal-50' : 'bg-teal-50'}>
    <td className="py-2 px-4 border border-cyan-400">
    {ticket.project ? ticket.project.projectName : 'N/A'}
    </td>
    <td className="py-2 px-4 border border-cyan-400">{ticket.title}</td>
    <td className="py-2 px-4 border border-cyan-400">{ticket.status}</td>
    <td className="py-2 px-4 border border-cyan-400">{ticket.priority}</td>
    <td className="py-2 px-4 border border-cyan-400">
      <Link to={`/admin/tickets/details/${ticket._id}`} className="text-cyan-600 hover:underline">
        Details
      </Link>
    </td>
  </tr>
))}

            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col">{showAddTicket && <AddTicket />}</div>
    </div>
  );
}

export default Tickets;
