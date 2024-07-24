import React, { useEffect, useState, ChangeEvent } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Slide, toast } from "react-toastify";
import { useApi } from "../../context/ApiContext";
import { useParams } from "react-router-dom";
import { IProps } from "../EditResume";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";

interface Skill {
  type: string;
}

interface SubCategory {
  categoryName: string;
  skills: string[];
}

interface SkillSection {
  sectionName: string;
  subCategories: SubCategory[];
}

const SkillDetail: React.FC<IProps> = ({ enabledNext }) => {
  const { resumeId } = useParams();

  const { resumeInfo, updateResume, setResumeInfo } = useApi();
  const [loading, setLoading] = useState(false);
  const [skillSections, setSkillSections] = useState<SkillSection[]>([
    {
      sectionName: "",
      subCategories: [{ categoryName: "", skills: [""] }],
    },
  ]);
  useEffect(() => {
    console.log("at starting resumeInfo---", resumeInfo);
    // resumeInfo&&setExperienceList(resumeInfo?.Experience)
    if (resumeInfo) {
      setSkillSections(resumeInfo.skills);
    }
  }, []);
  const RemoveSection = () => {
    setSkillSections((skillSections) => skillSections.slice(0, -1));
  };
  const onSave = async () => {
    const isValid = skillSections.every(
      (section) =>
        section.sectionName.trim() !== "" &&
        section.subCategories.every(
          (subCategory) =>
            subCategory.categoryName.trim() !== "" &&
            subCategory.skills.every((skill) => skill.trim() !== "")
        )
    );

    if (!isValid) {
      alert("Please fill out all fields before saving.");
      return;
    }

    setLoading(true);
    // setSkillSections([
    //     ...skillSections,
    //     {
    //       sectionName: "",
    //       subCategories: [{ categoryName: "", skills: [{ type: "" }] }],
    //     },
    //   ]);
    // const data = {
    //   skills: skillSections.map(({ sectionName, subCategories }) => ({
    //     sectionName,
    //     subCategories,
    //   })),
    // };
    // console.log("The data is prepared for updation.");
    // console.log(data);
    // await setResumeInfo({ ...resumeInfo, ...data });

    // console.log("The data setted to resumeInfo");
    // console.log(resumeInfo);
    try {
      if (resumeId) {
        console.log("THis is going to save");
        console.log(resumeInfo);
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

      console.log("Try ended");
      enabledNext(true);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Finally");
      setLoading(false);
    }
  };
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    sectionIndex: number,
    subCategoryIndex?: number,
    skillIndex?: number
  ) => {
    const { name, value } = event.target;
    const newSkillSections = [...skillSections];

    if (skillIndex !== undefined && subCategoryIndex !== undefined) {
      newSkillSections[sectionIndex].subCategories[subCategoryIndex].skills[
        skillIndex
      ] = value;
    } else if (subCategoryIndex !== undefined) {
      newSkillSections[sectionIndex].subCategories[
        subCategoryIndex
      ].categoryName = value;
    } else {
      (newSkillSections[sectionIndex] as any)[name] = value; // Use 'as any' to bypass the type issue
    }

    setSkillSections(newSkillSections);
  };
  const handleAddSection = () => {
    setSkillSections([
      ...skillSections,
      {
        sectionName: "",
        subCategories: [{ categoryName: "", skills: [""] }],
      },
    ]);
  };

  const handleAddSubCategory = (sectionIndex: number) => {
    const newSkillSections = [...skillSections];
    newSkillSections[sectionIndex].subCategories.push({
      categoryName: "",
      skills: [""],
    });
    setSkillSections(newSkillSections);
  };

  const handleAddSkill = (sectionIndex: number, subCategoryIndex: number) => {
    const newSkillSections = [...skillSections];
    newSkillSections[sectionIndex].subCategories[subCategoryIndex].skills.push(
      ""
    );
    setSkillSections(newSkillSections);
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillSections,
    });
  }, [skillSections]);
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
        Add Skill Section
      </Typography>
      {skillSections.map((section, sectionIndex) => (
        <Paper
          key={sectionIndex}
          sx={{
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "transparent",
            boxShadow: "unset",
          }}
        >
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Section Name"
            name="sectionName"
            value={section.sectionName}
            onChange={(e) => handleInputChange(e, sectionIndex)}
          />
          {section.subCategories.map((subCategory, subCategoryIndex) => (
            <Box key={subCategoryIndex} sx={{ paddingLeft: "16px" }}>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="Category Name"
                value={subCategory.categoryName}
                onChange={(e) =>
                  handleInputChange(e, sectionIndex, subCategoryIndex)
                }
              />
              {subCategory.skills.map((skill, skillIndex) => (
                <Box key={subCategoryIndex} sx={{ paddingLeft: "16px" }}>
                  <TextField
                    key={skillIndex}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Skill"
                    value={skill}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        sectionIndex,
                        subCategoryIndex,
                        skillIndex
                      )
                    }
                  />
                </Box>
              ))}
              <Button
                variant="contained"
                onClick={() => handleAddSkill(sectionIndex, subCategoryIndex)}
                sx={{ marginLeft: "16px", marginTop: "8px" }}
              >
                Add Skill
              </Button>
            </Box>
          ))}
          <Button
            variant="contained"
            onClick={() => handleAddSubCategory(sectionIndex)}
            sx={{ marginTop: "8px" }}
          >
            Add SubCategory
          </Button>
        </Paper>
      ))}
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Button variant="contained" onClick={handleAddSection}>
          + Add Section
        </Button>
        {skillSections.length > 0 && (
          <Button
            variant="outlined"
            onClick={RemoveSection}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        )}
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
    </Box>
  );
};

export default SkillDetail;
