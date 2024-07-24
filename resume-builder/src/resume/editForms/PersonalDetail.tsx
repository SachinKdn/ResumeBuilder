import React, { ChangeEvent, useEffect, useState } from "react";
import { useApi } from "../../context/ApiContext";
import { useParams } from "react-router-dom";
import { IProps } from "../EditResume";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import { Slide, toast } from "react-toastify";
interface SocialMedia {
  linkedin: { name: string; link: string };
  github: { name: string; link: string };
  website: { name: string; link: string };
}
const PersonalDetail: React.FC<IProps> = ({ enabledNext }) => {
  const { resumeId } = useParams();
  const { resumeInfo, updateResume, setResumeInfo } = useApi();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("at starting resumeInfo---", resumeInfo);
    setSocialMedia(resumeInfo.socialMedia);
  }, []);
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({
    linkedin: { name: "", link: "" },
    github: { name: "", link: "" },
    website: { name: "", link: "" },
  });

  const handleSocialMediaChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    const [platform, field] = name.split(/(?=[A-Z])/);

    setSocialMedia((prevState) => {
      return {
        ...prevState,
        [platform.toLowerCase() as keyof SocialMedia]: {
          ...prevState[platform.toLowerCase() as keyof SocialMedia],
          [field.toLowerCase()]: value,
        },
      };
    });
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    enabledNext(false);

    const { name, value } = e.target;

    if (name === "address" || name === "pinCode") {
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
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      socialMedia,
    });
  }, [socialMedia]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(resumeInfo);

    try {
      if (resumeId) {
        const newResume = await updateResume(resumeId, resumeInfo);
        setResumeInfo(newResume);
      }
      toast.success("Details saved successfully!!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      enabledNext(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          fontFamily: "Poppins",
          fontSize: "1.1rem",
          color: "#183b56",
          margin: "1.2rem auto",
          textAlign: "center",
        }}
      >
        Add Your Personal Details
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* LinkedIn */}
          <Box>
            <Typography variant="subtitle1">LinkedIn</Typography>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              required
              label="Name"
              name="linkedinName"
              value={resumeInfo.socialMedia.linkedin.name}
              onChange={handleSocialMediaChange}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="www.linkedin.com/"
              label="Link"
              required
              name="linkedinLink"
              value={resumeInfo.socialMedia.linkedin.link}
              onChange={handleSocialMediaChange}
            />
          </Box>

          {/* GitHub */}
          <Box>
            <Typography variant="subtitle1">GitHub</Typography>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Name"
              required
              name="githubName"
              value={resumeInfo.socialMedia.github.name}
              onChange={handleSocialMediaChange}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Link"
              required
              placeholder="www.github.com/"
              name="githubLink"
              value={resumeInfo.socialMedia.github.link}
              onChange={handleSocialMediaChange}
            />
          </Box>

          {/* Website */}
          <Box>
            <Typography variant="subtitle1">Website</Typography>
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: "tomato",
              }}
            >
              *Any platform or portfolio link e.g. LeetCode
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Platform Name"
              name="websiteName"
              required
              value={resumeInfo.socialMedia.website.name}
              onChange={handleSocialMediaChange}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Link"
              placeholder="portfolio link or any platform profile link"
              name="websiteLink"
              required
              value={resumeInfo.socialMedia.website.link}
              onChange={handleSocialMediaChange}
            />
          </Box>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          disabled={!enabledNext}
          sx={{
            margin: "5px",
          }}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default PersonalDetail;
