import React, { useEffect, useState } from "react";
import { useApi } from "../../context/ApiContext";
import { useParams } from "react-router-dom";
import { IProps } from "../EditResume";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { Slide, toast } from "react-toastify";
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const ExperienceDetail: React.FC<IProps> = ({ enabledNext }) => {
  const { resumeId } = useParams();
  const { resumeInfo, updateResume, setResumeInfo } = useApi();

  const [loading, setLoading] = useState(false);
  const [experienceList, setExperienceList] = useState([
    {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      responsibilities: [""],
      skills: [""],
    },
  ]);
  interface Experience {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
    skills: string[];
  }
  useEffect(() => {
    console.log("at starting resumeInfo---", resumeInfo);
    // resumeInfo&&setExperienceList(resumeInfo?.Experience)
    if (resumeInfo) {
      const data = resumeInfo.experience;

      // Format the dates
      const formattedData = data.map((entry: Experience) => ({
        ...entry,
        startDate: formatDate(entry.startDate),
        endDate: formatDate(entry.endDate),
      }));

      setExperienceList(formattedData);
    }
  }, []);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    skillIndex?: number
  ) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;

    if (name === "skills" && skillIndex !== undefined) {
      // Ensure responsibilities array exists
      if (!newEntries[index].skills) {
        newEntries[index].skills = [];
      }
      newEntries[index].skills[skillIndex] = value;
    } else if (name === "responsibilities") {
      // Ensure responsibilities array exists
      if (!newEntries[index].responsibilities) {
        newEntries[index].responsibilities[0] = "";
      }
      newEntries[index].responsibilities[0] = value;
    } else {
      newEntries[index] = { ...newEntries[index], [name]: value };
    }
    // newEntries[index] = { ...newEntries[index], [name]: value };
    setExperienceList(newEntries);
  };
  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        responsibilities: [""],
        skills: [""],
      },
    ]);
  };
  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };
  const onSave = async () => {
    setLoading(true);
    const data = {
      experience: experienceList.map(
        ({ company, role, startDate, endDate, responsibilities, skills }) => ({
          company,
          role,
          startDate,
          endDate,
          responsibilities,
          skills,
        })
      ),
    };
    console.log("The data is prepared for updation.");
    console.log(data);
    await setResumeInfo({ ...resumeInfo, ...data });

    console.log("The data setted to resumeInfo");
    console.log(resumeInfo);
    try {
      if (resumeId) {
        console.log("THis is going to save");
        console.log(resumeInfo);
        const newResume = await updateResume(resumeId, resumeInfo);
        console.log(newResume);
        // setResumeInfo(newResume);
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
      experience: experienceList,
    });
  }, [experienceList]);
  const handleAddSkill = (entryIndex: number) => {
    const newEntries = [...experienceList];
    if (!newEntries[entryIndex].skills) {
      newEntries[entryIndex].skills = [];
    }
    newEntries[entryIndex].skills.push("");
    setExperienceList(newEntries);
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
        Add Experience Section
      </Typography>
      {resumeInfo &&
        experienceList.map((entry, index) => (
          <Box key={index} sx={{ marginBottom: "16px" }}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Company Name"
              name="company"
              value={entry.company}
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Job Role"
              name="role"
              value={entry.role}
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Start Date"
              name="startDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={entry.startDate}
              onChange={(e) => handleChange(e, index)}
              sx={{
                "& .MuiInputBase-root": {
                  // backgroundColor: "white", // Default background color
                  "&.Mui-focused": {
                    backgroundColor: "#6f9eb9",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="End Date"
              name="endDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={entry.endDate}
              onChange={(e) => handleChange(e, index)}
              sx={{
                "& .MuiInputBase-root": {
                  // backgroundColor: "white", // Default background color
                  "&.Mui-focused": {
                    backgroundColor: "#6f9eb9",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Responsibilities"
              name="responsibilities"
              type="string"
              multiline
              InputLabelProps={{ shrink: true }}
              value={entry.responsibilities[0]}
              onChange={(e) => handleChange(e, index)}
            />
            {entry.skills.map((skill, skillIndex) => (
              <TextField
                key={skillIndex}
                fullWidth
                margin="normal"
                variant="outlined"
                label={`Skill ${skillIndex + 1}`}
                name="skills"
                value={skill}
                onChange={(e) => handleChange(e, index, skillIndex)}
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddSkill(index)}
            >
              Add Skill
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
            onClick={AddNewExperience}
            className="text-primary"
          >
            {" "}
            + Add More Experience
          </Button>

          <Button
            variant="outlined"
            onClick={RemoveExperience}
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

export default ExperienceDetail;
