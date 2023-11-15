import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function UserTicket() {
  const [issues, setIssues] = useState([]);
  // const userId = "65423024dd7217b7d4a0bf6d" //user
  // const userId = '654b351556c54d47709ac089' //admin
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log(userId)
    if (userId) {
    axios.get(`http://localhost:3300/user/userTicket/${userId}`)
      .then((response) => {
        setIssues(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user-specific tickets:', error);
        toast.error('this user has no tickets')
        
      });
    }
  }, []);

  return(
  <div className='flex flex-col items-center justify-center  pl-56 mb-24'>
      <h2 className="text-2xl font-bold mb-4">Your Tickets</h2>
      <table className="min-w-full border border-collapse border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 py-2 px-4">Title</th>
            <th className="border border-gray-300 py-2 px-5">Description</th>
            <th className="border border-gray-300 py-2 px-4">Priority</th>
            <th className="border border-gray-300 py-2 px-4">status</th>


          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue._id}>
              <td className="border border-gray-300 py-2 px-4">{issue.title}</td>
              <td className="border border-gray-300 py-2 px-5">{issue.description}</td>
              <td className="border border-gray-300 py-2 px-4">{issue.priority}</td>
              <td className="border border-gray-300 py-2 px-4">{issue.status}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTicket;