import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import PersonalDetail from './editForms/PersonalDetail';
import EducationDetail from './editForms/EducationDetail';
const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();
  return (
    <Box sx={{
      border: "1ps solid black",
      // height: "25px",
      // width: "100%",
      // flexGrow:"1",
      flex: "1",
      "backgroundColor": "bisque"
    }}>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid grey",
        borderRadius: "8px",
        padding: "0.5vmax",
        margin: "2px"
      }}>
        <Box sx={{
          display: "flex",
          gap: "5"
        }}>
          <Link to="/dashboard">
            <Button variant='outlined' size="small">HOME</Button>
          </Link>
        </Box>
        <Box sx={{
          display: "flex",
          gap: "5"
        }}>
          {activeFormIndex > 1
            && <Button size="small"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}> <KeyboardBackspaceIcon /> </Button>}
          <Button
            disabled={!enableNext}
            className="flex gap-2" size="small"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          > Next
            <EastIcon /> </Button>
        </Box>
      </Box>
      {activeFormIndex === 1 ? <PersonalDetail enabledNext={(v : boolean)=>setEnableNext(v)} /> :
      activeFormIndex==2?
              <EducationDetail  enabledNext={(v :boolean)=>setEnableNext(v)} /> : "" }
    </Box>
  )
}

export default FormSection