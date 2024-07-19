import React from "react";
import { IResume, SkillSection } from "../../context/interfaceTypes";
import { Box, Typography } from "@mui/material";

interface IProp {
  resumeInfo: IResume;
}

const SkillPreview: React.FC<IProp> = ({ resumeInfo }) => {
  return (
    <Box
      sx={{
        display: "flex",
        // gap: 2,
      }}
    >
      <Box
        sx={{
          width: "95px",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            lineHeight: "12.6px",
            fontWeight: "500",
            color: "#334155",
          }}
        >
          Skills
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.2,
        }}
      >
        {resumeInfo?.skills.map((skill: SkillSection, sectionIndex) => (
          <Box
            key={sectionIndex}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderBottom: "0.2px solid #d8d8d8cf",
              gap: 1,
              paddingBottom: "3px",
            }}
          >
            <Box>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "12.6px",
                  fontWeight: "500",
                  color: "#334155",
                }}
              >
                {skill?.sectionName}
              </Typography>
            </Box>
            {skill?.subCategories.map((category, categoryIndex) => (
              <Box
                key={categoryIndex}
                sx={{
                  display: "flex",
                  //   flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    lineHeight: "12.6px",
                    fontWeight: "500",
                    color: "#334155",
                    width: "95px",
                  }}
                >
                  {category?.categoryName}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {category?.skills.map((skill, skillIndex) => (
                    <Typography
                      key={skillIndex}
                      variant="h4"
                      component="h4"
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        lineHeight: "12.6px",
                        fontWeight: "500",
                        color: "#334155",
                      }}
                    >
                      {skill}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SkillPreview;
