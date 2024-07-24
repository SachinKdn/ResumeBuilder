import React, { useState } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useApi } from "../context/ApiContext";
import ResumePreview from "./ResumePreview";
import { Navigate, useNavigate } from "react-router-dom";
// import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ViewResume = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useApi();
  const handleDownload = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Scrolled");
    window.print();
  };
  const handleBack = () => {
    navigate(-2); // Navigates back to the previous path
  };

  const generatePdf = async () => {
    setLoading(true);
    const input = document.getElementById("print-area");
    console.log(input);
    if (input) {
      // Use html2pdf to generate the PDF

      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      // pdf.save("resume.pdf");
      // Convert the PDF to a Blob
      const pdfBlob = pdf.output("blob");

      // Convert Blob to Base64
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);
      reader.onloadend = async () => {
        const base64data = reader.result;

        // Send the Base64 PDF to the server
        const response = await fetch("http://localhost:4000/api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pdf: base64data,
            email: "sachin.75way@gmail.com",
          }),
        });

        if (response.ok) {
          alert("PDF successfully sent to the user via email");
        } else {
          alert("Error sending PDF to the user via email");
        }
        setLoading(false);
      };
    }
  };
  return (
    <Box>
      <Box id="no-print">
        <Container maxWidth="lg" sx={{ my: 10 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Congrats! Your Resume is ready!
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
          {loading && (
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              paragraph
            >
              Please Wait ! We are processing your request.
            </Typography>
          )}
          <Box display="flex" justifyContent="center" gap={2} my={10}>
            <Button variant="outlined" onClick={() => handleBack()}>
              GO BACK
            </Button>
            <Button
              variant="contained"
              // onClick={generatePdf}
              onClick={handleDownload}
              disabled={loading}
            >
              Download
            </Button>
            <Button
              variant="contained"
              onClick={generatePdf}
              // onClick={handleDownload}
              disabled={loading}
            >
              Send Via Email
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
