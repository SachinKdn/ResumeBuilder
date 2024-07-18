import React, { useEffect, useState } from 'react'
import { useApi } from '../../context/ApiContext';
import { useParams } from 'react-router-dom';
import { IProps } from '../EditResume';
import { TextField, Button, Container, Typography, Box } from '@mui/material';


const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
const EducationDetail: React.FC<IProps> = ({enabledNext}) => {
    const { resumeId } = useParams();
    const {  resumeInfo, updateResume , setResumeInfo} = useApi();
    const [formData,setFormData]=useState();
    const [loading,setLoading]=useState(false);
    const [educationalList,setEducationalList]=useState([
        {
        institution:'',
          degree:'',
          startDate:'',
          endDate:''
        }
    ])
    interface Education {
        institution: string;
        degree: string;
        startDate: string;
        endDate: string;
      }
    useEffect(()=>{
        console.log("at starting resumeInfo---",resumeInfo)
        // resumeInfo&&setEducationalList(resumeInfo?.education)
        if(resumeInfo){
            
            const data = resumeInfo.education;
      
            // Format the dates
            const formattedData = data.map((entry : Education) => ({
              ...entry,
              startDate: formatDate(entry.startDate),
              endDate: formatDate(entry.endDate),
            }));
      
            setEducationalList(formattedData);

        }
    },[])
    const handleChange=(event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,index : number)=>{
        const newEntries=educationalList.slice();
        const {name,value}=event.target;
        newEntries[index] = { ...newEntries[index], [name]: value };
        setEducationalList(newEntries);
      }
      const AddNewEducation=()=>{
        setEducationalList([...educationalList,
          {
            institution:'',
            degree:'',
            startDate:'',
            endDate:''
          }
        ])
      }
      const RemoveEducation=()=>{
        setEducationalList(educationalList=>educationalList.slice(0,-1))
    
      }
      const onSave = async() => {
        setLoading(true);
        const data = {
          education: educationalList.map(({ institution, degree, startDate, endDate }) => ({
            institution,
            degree,
            startDate,
            endDate,
          })),
        };
        setResumeInfo({ ...resumeInfo, ...data });
        try{
            if(resumeId){
                const newResume = await updateResume(resumeId,resumeInfo);
                console.log(newResume)
                // setResumeInfo(newResume);
            }

            enabledNext(true);
        }catch(err){
            console.log(err);
        }finally{

            setLoading(false);
        }
      };

      useEffect(()=>{
        setResumeInfo({
          ...resumeInfo,
          education:educationalList
        })
      },[educationalList])
  return (
    <Box sx={{ padding: '16px' }}>
      {educationalList.map((entry, index) => (
        <Box key={index} sx={{ marginBottom: '16px' }}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Institution"
            name="institution"
            value={entry.institution}
            onChange={(e) => handleChange(e, index)}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Degree"
            name="degree"
            value={entry.degree}
            onChange={(e) => handleChange(e, index)}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Start Date"
            name="startDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={entry.startDate}
            onChange={(e) => handleChange(e, index)}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="End Date"
            name="endDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={entry.endDate}
            onChange={(e) => handleChange(e, index)}
          />
        </Box>
      ))}
      <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outlined" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
            
            <Button variant="outlined" onClick={RemoveEducation} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?
            // <LoaderCircle className='animate-spin' />
            "Wait"
            :'Save'}    
            </Button>
        </div>
    </Box>
  )
}

export default EducationDetail