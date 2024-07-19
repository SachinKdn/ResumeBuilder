import { Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ThemeContextProvider } from "../theme/ThemeContext";
import { useTheme } from "@mui/material/styles";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import PersonalDetailPreview from "./resumePreview/PersonalDetailPreview";
import { useApi } from "../context/ApiContext";
import EducationalPreview from "./resumePreview/EducationalPreview";
import ExperiencePreview from "./resumePreview/ExperiencePreview";
import ProjectPreview from "./resumePreview/ProjectPreview";
import SkillPreview from "./resumePreview/SkillPreview";
import { useParams } from "react-router-dom";
const ResumePreview = () => {
  const theme = useTheme();

  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo, fetchResume } = useApi();
  console.log(resumeInfo);
  useEffect(() => {
    const getResume = async () => {
      if (fetchResume) {
        try {
          if (!resumeId) {
            console.log("Resume ID is not fetched yet.");
            return;
          }
          const data = await fetchResume(resumeId);
          console.log("Fetched resume:", data);
        } catch (error) {
          console.error("Fetch resume error:", error);
        }
      }
    };
    getResume();
  }, []);
  return (
    <Box
      id="print-area" //main page of resume
      sx={{
        // width: "595px",
        height: "842px",
        // border: "1px solid grey",
        margin: "0",
        backgroundImage: 'url("/light.jpeg") !important',
        backgroundRepeat: "no-repeat",
        // backgroundColor: "yellowgreen",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        "@media print": {
          backgroundImage: 'url("/light.jpeg")',
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
          backgroundColor: "white",
        },
      }}
    >
      <Box
        sx={{
          //header
          width: "595px",
          height: "160px",
          padding: "15px",
          borderBottom: "0.5px solid #d8d8d8",
          margin: "40px auto",

          // backgroundImage: 'url("/light.jpeg")',
        }}
      >
        <PersonalDetailPreview resumeInfo={resumeInfo} />
      </Box>
      <Box
        sx={{
          padding: "5% 3%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {resumeInfo?.education?.length > 0 && (
          <EducationalPreview resumeInfo={resumeInfo} />
        )}

        {resumeInfo?.experience?.length > 0 && (
          <ExperiencePreview resumeInfo={resumeInfo} />
        )}

        {resumeInfo?.projects?.length > 0 && (
          <ProjectPreview resumeInfo={resumeInfo} />
        )}

        {resumeInfo?.skills?.length > 0 && (
          <SkillPreview resumeInfo={resumeInfo} />
        )}
      </Box>
    </Box>
  );
};

export default ResumePreview;
