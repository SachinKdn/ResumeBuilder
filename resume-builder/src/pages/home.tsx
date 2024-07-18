import { Button } from '@mui/material'
import React from 'react'
import { useApi } from '../context/ApiContext';
import { title } from 'process';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const {  createResume } = useApi();

  const handleLogin = async () => {
    try {
      const credentials = { title: 'KADIAN', username: 'sachu', useremail:"om@gmail.com" };
      const data = await createResume(credentials);
      console.log('Logged in:', data);
      if(data.resume)
        {
            // setLoading(false);
            console.log("Navigate Now...")
            navigate('/resume/'+data.resume._id+"/edit");
        }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <div>
      Home
      <Button onClick={handleLogin}>Add Resume</Button>
    </div>
  )
}

export default Home