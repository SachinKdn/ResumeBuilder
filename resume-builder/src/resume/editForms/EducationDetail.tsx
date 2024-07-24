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

const EducationDetail: React.FC<IProps> = ({ enabledNext }) => {
  const { resumeId } = useParams();
  const { resumeInfo, updateResume, setResumeInfo } = useApi();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [educationalList, setEducationalList] = useState([
    {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
    },
  ]);
  interface Education {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }
  useEffect(() => {
    console.log("at starting resumeInfo---", resumeInfo);
    // resumeInfo&&setEducationalList(resumeInfo?.education)
    if (resumeInfo) {
      const data = resumeInfo.education;

      // Format the dates
      const formattedData = data.map((entry: Education) => ({
        ...entry,
        startDate: formatDate(entry.startDate),
        endDate: formatDate(entry.endDate),
      }));

      setEducationalList(formattedData);
    }
  }, []);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    enabledNext(false);
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index] = { ...newEntries[index], [name]: value };
    setEducationalList(newEntries);
  };
  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };
  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };
  const onSave = async () => {
    const isValid = educationalList.every(
      (education) =>
        education.institution.trim() !== "" &&
        education.degree.trim() !== "" &&
        education.startDate.trim() !== "" &&
        education.endDate.trim() !== ""
    );

    if (!isValid) {
      alert("Please fill out all fields before saving.");
      return;
    }
    setLoading(true);
    const data = {
      education: educationalList.map(
        ({ institution, degree, startDate, endDate }) => ({
          institution,
          degree,
          startDate,
          endDate,
        })
      ),
    };
    setResumeInfo({ ...resumeInfo, ...data });
    try {
      if (resumeId) {
        const newResume = await updateResume(resumeId, resumeInfo);
        console.log(newResume);
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
        // setResumeInfo(newResume);
      }

      enabledNext(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);
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
        Add Education Section
      </Typography>
      {educationalList.map((entry, index) => (
        <Box key={index} sx={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Institution"
            name="institution"
            value={entry.institution}
            onChange={(e) => handleChange(e, index)}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Degree"
            name="degree"
            value={entry.degree}
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
            onClick={AddNewEducation}
            className="text-primary"
          >
            {" "}
            + Add More Education
          </Button>

          <Button
            variant="outlined"
            onClick={RemoveEducation}
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

export default EducationDetail;
