import { Link, useNavigate } from "react-router-dom";
import { FaBug } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";



function Sidebar(user) {
  // const { userId } = useParams();
  // const userId = "65423024dd7217b7d4a0bf6d"
  // const userId = '654b351556c54d47709ac089'
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log(userId)
    if (userId) {
      axios.get(`http://localhost:3300/user/profile/${userId}`)
        .then((response) => {
          setUsername(response.data.username);
          setUserRole(response.data.userRole); 
          console.log(response.data); 

        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  


  return(

    <div className="bg-gray-5 min-h-screen w-1/5 sm:w-1/4 md:w-1/6 py-5 rounded relative border-r border-gray-300">
  <div className="text-cyan-950 flex flex-col pl-4 sm:pl-6 md:pl-10 font-serif">
    <div className="pl-4 pb-2 sm:pl-6 md:pl-10">
      <FaBug size={35} />
    </div>
    <p className="text-lg font-bold">Bug Tracker</p>
    <h3>{username}</h3>
  </div>
  <ul className="space-y-4 text-base font-bold pt-12 sm:pt-16">
    <div>
      <li>
        {userRole === 'user' ? (
          <Link to="/user" className="text-cyan-950 no-underline">
            Dashboard
          </Link>
        ) : (
          <Link to="/admin" className="text-cyan-950 no-underline">
            Dashboard
          </Link>
        )}
      </li>
      <li>
        {userRole === 'user' ? (
          <Link to="/user/userTicket/:userID" className="text-cyan-950 no-underline">
            Tickets
          </Link>
        ) : (
          <Link to="/admin/tickets" className="text-cyan-950 no-underline">
            Tickets
          </Link>
        )}
      </li>
    </div>
  </ul>
  <button
    className="bg-gray-300 hover:bg-gray-400  font-bold py-2 px-4 rounded-md ml-4 sm:ml-6 md:ml-10 mt-6"
    onClick={handleLogout}
  >
    Logout
  </button>
 
</div>
);
}

export default Sidebar;