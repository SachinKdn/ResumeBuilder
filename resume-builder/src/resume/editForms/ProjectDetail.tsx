import React, { useEffect, useState } from "react";
import { useApi } from "../../context/ApiContext";
import { useParams } from "react-router-dom";
import { IProps } from "../EditResume";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import { Slide, toast } from "react-toastify";
const ProjectDetail: React.FC<IProps> = ({ enabledNext }) => {
  const { resumeId } = useParams();
  const { resumeInfo, updateResume, setResumeInfo } = useApi();

  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState([
    {
      name: "",
      description: "",
      link: "",
      technologies: [""],
    },
  ]);

  useEffect(() => {
    console.log("at starting resumeInfo---", resumeInfo);
    // resumeInfo&&setExperienceList(resumeInfo?.Experience)
    if (resumeInfo) {
      setProjectList(resumeInfo.projects);
    }
  }, []);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    skillIndex?: number
  ) => {
    const newEntries = projectList.slice();
    const { name, value } = event.target;

    if (name === "technologies" && skillIndex !== undefined) {
      // Ensure responsibilities array exists
      if (!newEntries[index].technologies) {
        newEntries[index].technologies = [];
      }
      newEntries[index].technologies[skillIndex] = value;
    } else {
      newEntries[index] = { ...newEntries[index], [name]: value };
    }
    // newEntries[index] = { ...newEntries[index], [name]: value };
    setProjectList(newEntries);
  };
  const AddNewProject = () => {
    setProjectList([
      ...projectList,
      {
        name: "",
        description: "",
        link: "",
        technologies: [""],
      },
    ]);
  };
  const RemoveProject = () => {
    setProjectList((projectList) => projectList.slice(0, -1));
  };
  const onSave = async () => {
    const isValid = projectList.every(
      (project) =>
        project.name.trim() !== "" &&
        project.description.trim() !== "" &&
        project.link.trim() !== "" &&
        project.technologies.every((tech) => tech.trim() !== "")
    );

    if (!isValid) {
      alert("Please fill out all fields before saving.");
      return;
    }
    setLoading(true);
    // const data = {
    //   experience: projectList.map(({ company, role, startDate, endDate,responsibilities}) => ({
    //     company,
    //     role,
    //     startDate,
    //     endDate,
    //     responsibilities
    //   })),
    // };
    // console.log("The data is prepared for updation.")
    // console.log(data)
    // await setResumeInfo({ ...resumeInfo, ...data });

    // console.log("The data setted to resumeInfo")
    // console.log(resumeInfo)
    try {
      if (resumeId) {
        console.log("THis is going to save");
        console.log(resumeInfo);
        const newResume = await updateResume(resumeId, resumeInfo);
        console.log(newResume);
        setResumeInfo(newResume);
      }

      console.log("Try ended");
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
    } finally {
      console.log("Finally");
      setLoading(false);
    }
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      projects: projectList,
    });
  }, [projectList]);
  const handleAddSkill = (entryIndex: number) => {
    const newEntries = [...projectList];
    if (!newEntries[entryIndex].technologies) {
      newEntries[entryIndex].technologies = [];
    }
    newEntries[entryIndex].technologies.push("");
    setProjectList(newEntries);
  };
  return (
    <Box sx={{ padding: "16px" }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          fontFamily: "Poppins",
          fontSize: "1.1rem",
          color: "#183b56",
          margin: "0.2rem auto",
          textAlign: "center",
        }}
      >
        Add Project Section
      </Typography>
      {resumeInfo &&
        projectList.map((entry, index) => (
          <Box key={index} sx={{ marginBottom: "16px" }}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Project Name"
              name="name"
              value={entry.name}
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Project Description"
              InputLabelProps={{ shrink: true }}
              name="description"
              multiline
              value={entry.description}
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Project Link"
              name="link"
              type="text"
              value={entry.link}
              onChange={(e) => handleChange(e, index)}
            />

            {entry.technologies.map((skill, skillIndex) => (
              <TextField
                key={skillIndex}
                fullWidth
                margin="normal"
                variant="outlined"
                label={`Technology ${skillIndex + 1}`}
                name="technologies"
                value={skill}
                onChange={(e) => handleChange(e, index, skillIndex)}
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddSkill(index)}
            >
              Add Technology +
            </Button>
          </Box>
        ))}
      <div className="flex justify-between">
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={AddNewProject}
            className="text-primary"
          >
            {" "}
            + Add More Project
          </Button>

          <Button
            variant="outlined"
            onClick={RemoveProject}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          disabled={loading}
          onClick={() => onSave()}
          sx={{
            margin: "5px",
          }}
        >
          {loading
            ? // <LoaderCircle className='animate-spin' />
              "Wait"
            : "Save"}
        </Button>
      </div>
    </Box>
  );
};

export default ProjectDetail;
