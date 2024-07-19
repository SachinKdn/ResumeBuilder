import React, { useEffect, useState } from "react";
import { Experience, IResume, Project } from "../../context/interfaceTypes";
import { Box, Button, Typography } from "@mui/material";
import { log } from "console";

interface IProp {
  resumeInfo: IResume;
}
const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // const month = String(date.getMonth() + 1).padStart(2, '0');
  // const day = String(date.getDate()).padStart(2, '0');
  return `${year}`;
};
const ProjectPreview: React.FC<IProp> = ({ resumeInfo }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "2",
        // justifyContent:"space-between"
        // alignItems:"flex-start"
      }}
    >
      <Box
        sx={{
          // marginRight:"15px"
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
          Featured Projects
        </Typography>
      </Box>
      <Box
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: 1.2,
        }}
      >
        {resumeInfo?.projects.map((project: Project, index) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "0.2px solid #d8d8d8cf",
              paddingBottom: "3px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                // maxWidth:"350px"
                minWidth: "380px",
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "12.6px",
                  fontWeight: "500",
                  color: "#334155",

                  //   maxWidth: "380px",
                }}
              >
                {project?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  maxWidth: "380px",
                  flexWrap: "wrap",
                }}
              >
                {project?.technologies.map((skill, index) => (
                  <Typography
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
              <Typography
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
                {`${project?.description} More details at`}{" "}
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project?.link}
                </a>
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectPreview;
