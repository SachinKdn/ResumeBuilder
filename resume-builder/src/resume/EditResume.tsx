import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getResume } from '../api/apiServices';
import { useApi } from '../context/ApiContext';
import FormSection from './FormSection';
import ResumePreview from './ResumePreview';
import { Box } from '@mui/material';
import { ThemeContextProvider } from '../theme/ThemeContext';

export interface IProps{
    enabledNext:(v: boolean) => void;
}
const EditResume = () => {
    const { resumeId } = useParams();
    const { getResume, resumeInfo, fetchResume } = useApi();
    console.log(resumeInfo)
    useEffect(() => {
        const getResume = async () => {
            if (fetchResume) {
                try {
                    if (!resumeId) {
                        console.log("Resume ID is not fetched yet.")
                        return;
                    }
                    const data = await fetchResume(resumeId);
                    console.log('Fetched resume:', data);
                } catch (error) {
                    console.error('Fetch resume error:', error);
                }
            }
        };
        getResume();
    }, []);

    return (
                <Box sx={{
                    display:"flex",
                    justifyContent:"space-between",
                    gap:"1",
                    flexDirection:{
                        xs:"column",
                        md:"row"
                      }
                }}>
                    {/* Edit Resume....
            <div>Resume Info: {JSON.stringify(resumeInfo)}</div> */}
                    {/* Form Section  */}
                    <FormSection />
                    {/* Preview Section  */}
                    <ThemeContextProvider>
                        <ResumePreview />
                    </ThemeContextProvider>
                </Box>
    )
}

export default EditResume