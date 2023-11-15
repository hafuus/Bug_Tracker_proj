import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './input.css'
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './components/Layout';
import Projects from './components/Project/Projects';
import AddProject from './components/Project/AddProject';
import ProjectDetails from './components/Project/ProjectDetails';
import EditProject from './components/Project/EditProject';
import AddTicket from './components/tickets/AddTicket';
import Tickets from './components/tickets/Tickets';
import TicketDetails from './components/tickets/TicketDetails';
import EditTicket from './components/tickets/EditTicket';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './ProtectedRoute';
import UserProfile from './UserProfile';
import Members from './components/Project/Members';
import  UserDashboard from './components/User/UserDashboard'
import UserProject from './components/User/UserProject';
// import Chart from 'chart.js';
// import charts from './components/Charts'
import Charts from './components/Charts';
import UserTicket from './components/User/UserTicket';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 






function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('User');
   // You need to set the user role appropriately
   const user = {
    role: 'user',
  };

  

  return (
    <div className="bg-teal-50 min-h-screen">
      <Router>
        <div className="app">
          <Routes>
            {/* <Route path="/" element={isAuthenticated ? <Navigate to="/admin" /> : <Login />} /> */}
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup />} />

            <Route
                path="/user/*"
                element={
                  <div className="flex">
                    <Sidebar user={user}/>
                    <Routes>
                    <Route path="" element={<UserDashboard />} />
                      <Route path="/project/:projectId" element={<UserProject />} />
                      <Route path="/userTicket/:userID" element={<UserTicket />} />
                </Routes>
              </div>
            }
            />

           
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
                  <div className="flex">
                    <Sidebar user={user}/>
                    <Routes>
                      <Route path="/" element={<Layout />} />
                      <Route path="/charts" element={<Charts />} />
                      <Route path="projects/create-project" element={<AddProject />} />
                      <Route path="projects/details/:projectId" element={<ProjectDetails />} />
                      <Route path="projects/details/:projectId/edit" element={<EditProject />} />
                      <Route path="projects/details/:projectId/Members" element={<Members/> }  />
                      <Route path="tickets" element={<Tickets />} />
                      <Route path="tickets/create-ticket" element={<AddTicket />} />
                      <Route path="tickets/details/:id" element={<TicketDetails />} />
                      <Route path="tickets/details/:id/edit" element={<EditTicket />} />
                    </Routes>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

