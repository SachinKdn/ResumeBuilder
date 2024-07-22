import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography, TextField, Link } from '@mui/material';
import { useApi } from '../context/ApiContext';
import { IUser, UserResponse } from '../api/apiServices';

const SignUp = () => {
    const navigate = useNavigate();
    const { user, register, setUser } = useApi();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const handleSignup = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let valid = true;
        const newErrors = { name: '',email: '', password: '' };

        if (!name) {
            newErrors.name = 'User Name is required';
            valid = false;
        }
        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            // Proceed with login logic
            const registerData = {
                name, email, password
            }
            console.log('Form submitted:', registerData);
            try {
                const userData : UserResponse = await register(registerData);
                console.log(userData)
                localStorage.setItem('user', JSON.stringify(userData.user));
                setUser(userData.user);
                localStorage.setItem('token', userData?.accessToken);
              } catch (error) {
                console.error('Signup error:', error);
                setError('Login failed');
              }
              
        }

    };
    useEffect(() => {
        // Redirect based on user role if already logged in
        if (user) {
            navigate('/');
        }
      }, [user, navigate]);

  return (
    <Box>
        <Box
                component="form"
                onSubmit={handleSignup}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '30vh',
                    padding: 4,
                    backgroundColor: '#f3f3f3',
                    width: {
                        lg: "250px",
                        md: "350px",
                        sm: "50vw",
                        xs: "80vw"
                    },
                    borderRadius: "8px",
                    border: "1px soild #b7dbdb",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    margin:"auto"
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom sx={{
                    fontSize: "1.7rem",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "700"
                }}>
                    Signup
                </Typography>

                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                >
                    Register
                </Button>
                {error && (
          <Typography variant="body2" color="error" style={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}
                <Link
                    onClick={() => navigate('/login')}
                    sx={{
                        marginTop: "10px",
                        cursor: "pointer",
                    }}
                >
                    Already have an account
                </Link>
            </Box>
    </Box>
  )
}

export default SignUp