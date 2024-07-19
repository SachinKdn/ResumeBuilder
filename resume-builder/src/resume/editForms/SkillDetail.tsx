import React, { useEffect, useState, ChangeEvent } from "react";
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
      {skillSections.map((section, sectionIndex) => (
        <Paper
          key={sectionIndex}
          sx={{ padding: "16px", marginBottom: "16px" }}
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
              ))}
              <Button
                variant="contained"
                onClick={() => handleAddSkill(sectionIndex, subCategoryIndex)}
                sx={{ marginTop: "8px" }}
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
      <Button
        variant="contained"
        onClick={handleAddSection}
        sx={{ marginTop: "16px" }}
      >
        Add Section
      </Button>
      <Button
        variant="outlined"
        onClick={RemoveSection}
        className="text-primary"
      >
        {" "}
        - Remove
      </Button>
      <Button disabled={loading} onClick={() => onSave()}>
        {loading
          ? // <LoaderCircle className='animate-spin' />
            "Wait"
          : "Save"}
      </Button>
    </Box>
  );
};

export default SkillDetail;
