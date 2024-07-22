import { Box, Container, Typography, Button, Grid } from "@mui/material";

import React from "react";
import { useApi } from "../context/ApiContext";
import { title } from "process";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { createResume } = useApi();

  const handleAddResume = async () => {
    navigate("/createResume");
    // try {
    //   const credentials = {
    //     title: "KADIAN",
    //     username: "sachu",
    //     useremail: "om@gmail.com",
    //   };
    //   const data = await createResume(credentials);
    //   console.log("Logged in:", data);
    //   if (data.resume) {
    //     // setLoading(false);
    //     console.log("Navigate Now...");
    //     navigate("/resume/" + data.resume._id + "/edit");
    //   }
    // } catch (error) {
    //   console.error("Login error:", error);
    // }
  };
  return (
    <Box
      sx={{
        backgroundImage: 'url("/bgImg.png") !important',
        // backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundColor: "aliceblue",
        // height: "90vh",
        margin: "3vh 0",
      }}
    >
      <Box
        sx={{
          width: "80vw",
          margin: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              sx={{
                margin: "auto",
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontFamily: "Poppins",
                  fontSize: "2rem",
                  color: "#183b56",
                  margin: "1rem 0",
                }}
              >
                Create Your Dream Resume
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  fontFamily: "Poppins",
                  fontSize: "1.1rem",
                  color: "#183b56",
                  margin: "1rem 0",
                }}
              >
                With our AI-powered resume builder, create a professional resume
                that showcases your skills and experience.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2, fontFamily: "Poppins" }}
                // href="#create-resume"

                onClick={handleAddResume}
              >
                Create Resume
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <img
                src="/CVIcon.png"
                alt="Resume Builder Illustration"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
