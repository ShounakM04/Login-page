import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        name,
        email,
        password,
      });
      console.log(response.data); // handle response from server
      alert('Signup Successful')
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
              <p className="text-white-50 mb-5">Please enter your details</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Name' id='formControlLg' type='text' size="lg" onChange={(e)=>setName(e.target.value)} value={name}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e)=>setEmail(e.target.value)} value={email}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={(e)=>setPassword(e.target.value)} value={password}/>

              <MDBBtn outline className='mx-2 px-5 mt-3' color='white' size='lg' onClick={handleSubmit}>
                Signup
              </MDBBtn>

              <div>
                <p className="mb-0 top-10 mt-4">Already have an account? <Link to='/' class="text-white-50 fw-bold">Log In</Link></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;