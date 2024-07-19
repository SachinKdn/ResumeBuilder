import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useApi } from "../context/ApiContext";
import ResumePreview from "./ResumePreview";

const ViewResume = () => {
  const { resumeInfo, setResumeInfo } = useApi();
  const handleDownload = () => {
    window.print();
  };

  return (
    <Box>
      <Box id="no-print">
        <Container maxWidth="lg" sx={{ my: 10 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Congrats! Your Ultimate AI generated Resume is ready!
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            paragraph
          >
            Now you are ready to download your resume and you can share unique
            resume url with your friends and family
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} my={10}>
            <Button variant="contained" onClick={handleDownload}>
              Download
            </Button>

            {/* <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open the url to see it",
                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
                title: `${resumeInfo.firstName} ${resumeInfo.lastName} resume`,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button variant="contained">Share</Button>
            </RWebShare> */}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 10 }}>
        <ResumePreview />
      </Container>
    </Box>
  );
};

export default ViewResume;
