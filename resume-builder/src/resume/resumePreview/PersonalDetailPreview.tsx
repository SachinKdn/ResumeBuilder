import React from "react";
import { IResume } from "../../context/interfaceTypes";
import { Box, Button, Typography } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
interface IProp {
  resumeInfo: IResume;
}
const PersonalDetailPreview: React.FC<IProp> = ({ resumeInfo }) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // width: "235px",
          height: "104px",
          justifyContent: "space-between",
          margin: "auto",
          marginTop: "40px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // width: "180px",
            // height: "52px",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Typography
            variant="h1"
            component="h2"
            sx={{
              fontFamily: "Poppins",
              fontSize: "38px", //28
              lineHeight: "35.28px",
              fontWeight: "800",
              color: "#334155",
            }}
          >
            {resumeInfo.fullname}
          </Typography>
          <Typography
            variant="h4"
            component="h4"
            sx={{
              fontFamily: "Poppins",
              fontSize: "20px", //14
              lineHeight: "12.6px",
              fontWeight: "500",
              color: "#64748B",
            }}
          >
            {resumeInfo.jobRole}
          </Typography>
        </Box>
        <Box
          sx={{
            //header-2
            display: "flex",
            flexDirection: "column",
            // width: "235px",
            // height: "32px",
            justifyContent: "space-between",
            // border: "1px solid black",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "32px", //22
              gap: "3",
            }}
          >
            <Box
              sx={{
                height: "fit-content",
                display: "flex",
                alignItems: "center",
              }}
            >
              <RoomIcon
                sx={{
                  height: "14px",
                }}
              />
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "18px", //12
                  // lineHeight: "11px",
                  fontWeight: "400",
                  color: "#334155",
                }}
              >
                {resumeInfo.address.address}
              </Typography>
            </Box>
            <Box
              sx={{
                height: "fit-content",
                display: "flex",
                alignItems: "center",
              }}
            >
              <EmailIcon
                sx={{
                  height: "14px",
                }}
              />
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "18px", //12
                  // lineHeight: "11px",
                  fontWeight: "400",
                  color: "#334155",
                }}
              >
                {resumeInfo.email}
              </Typography>
            </Box>
            <Box
              sx={{
                height: "fit-content",
                display: "flex",
                alignItems: "center",
              }}
            >
              <PhoneIcon
                sx={{
                  height: "14px",
                }}
              />
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "18px", //12
                  // lineHeight: "11px",
                  fontWeight: "400",
                  color: "#334155",
                }}
              >
                {resumeInfo.phoneNumber}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "38px", //30
              gap: "3",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "0.5px solid #7C3AED",

                margin: "0 3px",
                // backgroundColor: "#f0f0f0", // Example background color
                // padding: "1rem", // Example padding
                borderRadius: "8px", // Example border radius
              }}
            >
              <a
                href={`https://${resumeInfo.socialMedia.website.link}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // margin: "0 3px",
                  padding: "5px",
                  textDecoration: "none", // Remove underline
                  color: "inherit", // Inherit text color
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LanguageIcon
                  sx={{
                    // marginRight: "0.5rem",
                    fontSize: "1.3rem", // Adjust icon size as needed
                    color: "#183b56",
                  }}
                />
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    fontSize: "0.7rem",
                    color: "#183b56",
                    margin: "auto",
                  }}
                >
                  {resumeInfo.socialMedia.website.name}
                </Typography>
              </a>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "0.5px solid #7C3AED",

                margin: "0 3px",
                // backgroundColor: "#f0f0f0", // Example background color
                // padding: "1rem", // Example padding
                borderRadius: "8px", // Example border radius
              }}
            >
              <a
                href={`https://${resumeInfo.socialMedia.linkedin.link}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // margin: "0 3px",
                  padding: "5px",
                  textDecoration: "none", // Remove underline
                  color: "inherit", // Inherit text color
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon
                  sx={{
                    // marginRight: "0.5rem",
                    fontSize: "1.3rem", // Adjust icon size as needed
                    color: "#183b56",
                  }}
                />
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    fontSize: "0.7rem",
                    color: "#183b56",
                    margin: "auto",
                  }}
                >
                  {resumeInfo.socialMedia.linkedin.name}
                </Typography>
              </a>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "0.5px solid #7C3AED",

                margin: "0 3px",
                // backgroundColor: "#f0f0f0", // Example background color
                // padding: "1rem", // Example padding
                borderRadius: "8px", // Example border radius
              }}
            >
              <a
                href={`https://${resumeInfo.socialMedia.github.link}`} // Replace with your target URL
                style={{
                  display: "flex",
                  alignItems: "center",
                  // margin: "0 3px",
                  padding: "5px",
                  textDecoration: "none", // Remove underline
                  color: "inherit", // Inherit text color
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon
                  sx={{
                    // marginRight: "0.5rem",
                    fontSize: "1.3rem", // Adjust icon size as needed
                    color: "#183b56",
                  }}
                />
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    fontSize: "0.7rem",
                    color: "#183b56",
                    margin: "auto",
                  }}
                >
                  {resumeInfo.socialMedia.github.name}
                </Typography>
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <h2 className='font-bold text-xl text-center'
            // style={{
            //     color:resumeInfo?.themeColor
            // }}
            >
                {resumeInfo?.fullname}</h2>
            <h2 className='text-center text-sm font-medium'
            >{resumeInfo?.jobRole}</h2>
            <h2 className='text-center font-normal text-xs'
                style={{
                    // color:resumeInfo?.themeColor
                }}>{resumeInfo?.address.address}</h2>

            <div className='flex justify-between'>
                <h2 className='font-normal text-xs'
                    style={{
                        // color:resumeInfo?.themeColor
                    }}>{resumeInfo?.phoneNumber}</h2>
                <h2 className='font-normal text-xs'
                    style={{
                        // color:resumeInfo?.themeColor
                    }}>{resumeInfo?.email}</h2>

            </div>
            <hr className='border-[1.5px] my-2'
                style={{
                    // borderColor:resumeInfo?.themeColor
                }}
            /> */}
    </div>
  );
};

export default PersonalDetailPreview;
