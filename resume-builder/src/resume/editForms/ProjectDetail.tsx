import React, { useEffect, useState } from "react";
import { useApi } from "../../context/ApiContext";
import { useParams } from "react-router-dom";
import { IProps } from "../EditResume";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

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
        <div className="flex gap-2">
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
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
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
