import { Box, Container, Typography, Button, Grid } from "@mui/material";
import {
  MenuItem,
  TextField,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  FormHelperText,
  Input,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import React, { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import { title } from "process";
import { useNavigate } from "react-router-dom";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { ICreateResume } from "../api/apiServices";
const CreateResume = () => {
  const navigate = useNavigate();
  const { user, createResume } = useApi();

  const handleAddResume = async () => {
    // try {
    //   const credentials = {
    //     title: "KADIAN",
    //     username: "sachu",
    //     useremail: "om@gmail.com",
    //   };
    //   const data = await createResume(credentials);
    //   console.log("Logged in:", data);
    //   if (data.resume) {
    //     // setLoading(false);
    //     console.log("Navigate Now...");
    //     navigate("/resume/" + data.resume._id + "/edit");
    //   }
    // } catch (error) {
    //   console.error("Login error:", error);
    // }
  };
  interface IResume {
    title: string;
    username: string;
    useremail: string;
  }
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [currResume, setCurrResume] = useState<IResume>({
    title: "",
    username: "",
    useremail: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    username: "",
    useremail: "",
  });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setCurrResume({
      ...currResume,
      [name as string]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // Redirect based on user role if already logged in
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <Box
      sx={{
        backgroundImage: 'url("/bgImg.png") !important',
        // backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundColor: "aliceblue",
        // height: "90vh",
        margin: "3vh 0",
      }}
    >
      <Box
        sx={{
          width: "80vw",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontFamily: "Poppins",
            fontSize: "2rem",
            color: "#183b56",
            margin: "1rem 0",
          }}
        >
          START BUILDING RESUME -
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #183b56",
              padding: "0 5px",
              borderRadius: "6px",
              cursor: "pointer",
              width: "fit-content",
              margin: "1rem 0",
            }}
            onClick={handleClickOpen}
          >
            <CreateNewFolderIcon
              sx={{
                marginRight: "0.5rem",
                fontSize: "1.5rem", // Adjust icon size as needed
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
                fontSize: "1.1rem",
                color: "#183b56",
                margin: "0.5rem 0",
              }}
            >
              Create New Resume
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #183b56",
              padding: "0 5px",
              borderRadius: "6px",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            <FolderSharedIcon
              sx={{
                marginRight: "0.5rem",
                fontSize: "3.5rem", // Adjust icon size as needed
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
                fontSize: "0.8rem",
                color: "#183b56",
                margin: "0.5rem 0",
              }}
            >
              Title : Sachin Resume
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 600,
                fontFamily: "Poppins",
                fontSize: "0.8rem",
                color: "#183b56",
                margin: "0.5rem 0",
              }}
            >
              Username : Sachin Kadian
            </Typography>
          </Box>
        </Box>
      </Box>
      <Dialog
        sx={{
          width: "32vw",
          margin: "auto",
        }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            setLoading(true);
            event.preventDefault();
            let valid = true;
            const newErrors = { title: "", username: "", useremail: "" };

            if (!currResume.title) {
              newErrors.title = "Title is required";
              valid = false;
            }

            if (!currResume.username) {
              newErrors.username = "User Name is required";
              valid = false;
            }
            if (!currResume.useremail) {
              newErrors.useremail = "User Email is required";
              valid = false;
            }

            setErrors(newErrors);
            if (valid) {
              const credentials = { ...currResume };
              const data = await createResume(credentials);
              console.log("Resume Created -:", data);
              if (data.resume) {
                // setLoading(false);
                console.log("Navigate Now...");
                navigate("/resume/" + data.resume._id + "/edit");
              }
              try {
              } catch (error) {
                console.error("Failed to update task:", error);
              } finally {
                setLoading(false);
              }
            }
          },
        }}
      >
        <DialogTitle>Create Your New Resume</DialogTitle>

        {loading && <Box>Loading......</Box>}
        {!loading && (
          <DialogContent>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              value={currResume.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label="User Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="username"
              value={currResume.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />

            <TextField
              label="User Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="useremail"
              value={currResume.useremail}
              onChange={handleChange}
              error={!!errors.useremail}
              helperText={errors.useremail}
            />
          </DialogContent>
        )}

        <DialogActions>
          <Button color="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            Create Resume
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateResume;
