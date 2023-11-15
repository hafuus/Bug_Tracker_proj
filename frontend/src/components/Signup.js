import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    role: 'user', // Default role is 'user'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };

    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:3300/user/save', formData);
        console.log('User registered successfully:', response.data);
       navigate('/')
      } catch (error) {
        console.error('Error registering user:', error);
       
      }
    };
  
  

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100 '>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column '>
              <h2 className="fw-bold mb-2 text-center " style={{ color: '#213E60' }}>Sign up here</h2>
              <MDBInput wrapperClass='mb-4 w-100 mt-4' label='Full Name' id='fullname' type='text' size="lg" onChange={handleChange} value={formData.fullname} />
              <MDBInput wrapperClass='mb-4 w-100' label='Username' id='username' type='text' size="lg" onChange={handleChange} value={formData.username} />
              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='email' type='email' size="lg" onChange={handleChange} value={formData.email} />
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='password' type='password' size="lg" onChange={handleChange} value={formData.password} />
              <select
                className='form-select mb-4'
                id='role'
                onChange={handleRoleChange}
                value={formData.role}
              >
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
              </select>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
              <MDBBtn size='lg' style={{ backgroundColor: '#213E60' }} onClick={handleSubmit}>
                Signup
              </MDBBtn>
              <hr className="my-4" />
              <p>Already have an account? <Link to="/">Login</Link></p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
