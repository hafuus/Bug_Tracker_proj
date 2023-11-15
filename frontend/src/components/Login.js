import React, { useState } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function Login({setIsAuthenticated}) {
  const [userRole, setUserRole] = useState()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async ( ) => {
    try {
      
      const response = await axios.post('http://localhost:3300/user/login', formData);
      console.log('User logged in successfully:', response.data);
      // localStorage.setItem('user', JSON.stringify(response.data.user));  //mashaqaynayo
          
         


      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      localStorage.setItem('userId', decodedToken._id);
      console.log(decodedToken._id)


 

      const userRole = response.data.userRole;
      setUserRole(userRole);
       

      setIsAuthenticated(true);
      console.log(userRole);
      if (userRole == 'user'){
        navigate('/user')
      } else{
        navigate('/admin')
      }
      
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center" style={{ color: '#213E60' }}>Log in</h2>
              <MDBInput
                wrapperClass='mb-4 w-100'
                label='Email address'
                id='email'
                type='email'
                name='email'
                size="lg"
                onChange={handleInputChange}
              />
              <MDBInput
                wrapperClass='mb-4 w-100'
                label='Password'
                id='password'
                type='password'
                name='password'
                size="lg"
                onChange={handleInputChange}
              />
              {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
              <MDBBtn size='lg' style={{ backgroundColor: '#213E60' }} onClick={handleLogin}>
                Login
              </MDBBtn>
              <hr className="my-4" />
              <p>Don't have an account? <Link to="/signup">Signup</Link></p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
