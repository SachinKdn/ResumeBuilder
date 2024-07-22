import React, { useEffect, useState } from "react";
import { IResume } from "../../context/interfaceTypes";
import { Box, Button, Typography } from "@mui/material";

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
const EducationalPreview: React.FC<IProp> = ({ resumeInfo }) => {
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
          width: "115px", //95
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontFamily: "Poppins",
            fontSize: "20px", //14
            lineHeight: "19.6px", //12.6
            fontWeight: "500",
            color: "#334155",
          }}
        >
          Education
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
        {resumeInfo?.education.map((education, index) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // maxWidth:"350px"
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "19px", //13
                  lineHeight: "19.6px", //12.6
                  fontWeight: "500",
                  color: "#334155",

                  maxWidth: "580px", //380
                }}
              >
                {education?.institution}
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "17px", //11
                  lineHeight: "19.6px",
                  fontWeight: "500",
                  color: "#334155",
                }}
              >
                {education?.degree}
              </Typography>
            </Box>
            <Box sx={{}}>
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "15px", //10
                  lineHeight: "19.6px",
                  fontWeight: "500",
                  color: "#334155",
                }}
              >
                {`${formatDate(education.startDate)}-${formatDate(
                  education.endDate
                )}`}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* {resumeInfo?.education.map((education,index)=>(
        <div key={index} className='my-5'>
            <h2 className='text-sm font-bold'
                style={{
                    color:resumeInfo?.themeColor
                }}
            >{education.universityName}</h2>
            <h2 className='text-xs flex justify-between'>{education?.degree} in {education?.major}
            <span>{education?.startDate} - {education?.endDate}</span>
            </h2>
            <p className='text-xs my-2'>
                {education?.description}
            </p>
        </div>
    ))} */}
      {/* Something....... */}
    </Box>
  );
};

export default EducationalPreview;
