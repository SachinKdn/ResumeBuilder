import React, { useEffect, useState } from 'react'
import { useApi } from '../../context/ApiContext';
import { useParams } from 'react-router-dom';
import { IProps } from '../EditResume';
import { TextField, Button, Container, Typography } from '@mui/material';



const PersonalDetail: React.FC<IProps> = ({enabledNext}) => {
    const { resumeId } = useParams();
    const {  resumeInfo, updateResume , setResumeInfo} = useApi();
    const [formData,setFormData]=useState();
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        console.log("at starting resumeInfo---",resumeInfo)
    },[])
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        enabledNext(false);

        const { name, value } = e.target;
        
        if(name === "address"  || name === 'pinCode'){
            setResumeInfo({
                ...resumeInfo,
                address: {
                  ...resumeInfo.address,
                  [name]: value,
                },
              });
              return;
        }
        // setFormData({
        //   ...formData,
        //   [name]: value,
        // });
    
        setResumeInfo({
          ...resumeInfo,
          [name]: value,
        });
      };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic
        console.log(resumeInfo);

        try{
            if(resumeId){
                const newResume = await updateResume(resumeId,resumeInfo);
                setResumeInfo(newResume);
            }

            enabledNext(true);
        }catch(err){
            console.log(err);
        }
      };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Personal Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="fullname"
          value={resumeInfo.fullname}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={resumeInfo.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={resumeInfo.phoneNumber}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Address"
          name="address"
          value={resumeInfo.address.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Zip Code"
          name="pinCode"
          value={resumeInfo.address.pinCode}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Job Title"
          name="jobRole"
          value={resumeInfo.jobRole}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        //   multiline
        //   rows={4}
        />
        <Button type="submit" variant="contained" color="primary" disabled={!enabledNext}>
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default PersonalDetail