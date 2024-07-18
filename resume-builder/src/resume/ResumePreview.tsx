import { Box, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import { ThemeContextProvider } from '../theme/ThemeContext'
import { useTheme } from '@mui/material/styles';
import ThemeToggleButton from '../theme/ThemeToggleButton';
import PersonalDetailPreview from './resumePreview/PersonalDetailPreview';
import { useApi } from '../context/ApiContext';
const ResumePreview = () => {
    const theme = useTheme();

    const {  resumeInfo , setResumeInfo} = useApi();
  return (
   <Box sx={{
        border: "1ps solid black",
        // height: "25px",
        // width: "100%",
        // flexGrow:"1",
        flex: "1",
      
      }}>
       
        <Box sx={{
          width: "595px",
          height: "842px",
          border:"1px solid grey",
      margin:"auto",

      backgroundImage: 'url("/light.jpeg")',
      backgroundRepeat:"no-repeat",
        }}>
            <Box sx={{
          width: "595px",
          height: "160px",
          borderBottom:"0.5px solid #d8d8d8"

          
          // backgroundImage: 'url("/light.jpeg")',
            }}>
            <PersonalDetailPreview resumeInfo={resumeInfo} />

            </Box>

        </Box>
        
        {/* <Paper style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h5" gutterBottom>
            This section uses the dark theme.
          </Typography>
          <Typography variant="body1" gutterBottom>
            This is an example of a themed component.
          </Typography>
        </Paper> */}

        {/* <Container>
    
      <Typography variant="h4" gutterBottom>
        Welcome to Themed App
      </Typography>
      <Typography variant="body1" gutterBottom>
        This section uses the current theme.
      </Typography>
      <Box
        sx={{
          border: '1px solid black',
          flex: 1,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Paper style={{ padding: '16px', marginTop: '16px', backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h5" gutterBottom>
            This section uses the current theme.
          </Typography>
          <Typography variant="body1" gutterBottom>
            This is an example of a themed component.
          </Typography>
        </Paper>
      </Box>
      <ThemeToggleButton />
    </Container> */}
    </Box> 


      
  )
}

export default ResumePreview