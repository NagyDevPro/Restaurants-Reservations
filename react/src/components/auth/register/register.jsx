import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  CssBaseline,
  Link,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { register } from "../../../slices/auth/authSlice";
import Swal from "sweetalert2";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    mobile_number: "",
    gender: "",
    profile_image: "",
    birth_date: "",
    roles_name:""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRole = (e) =>{
    const {value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      roles_name:value,
    }));
  }
  // Validate first name and last name
  const validateName = (name) => {
    const regex = /^[a-zA-Z]{3,}$/;
    return regex.test(name)
      ? null
      : "Name should be at least 3 characters and contain only letters.";
  };

  // Validate password
  const validatePassword = (password) => {
    return password.length >= 8
      ? null
      : "Password should be at least 8 characters long.";
  };

  // Validate email
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email) ? null : "Invalid email address.";
  };

  // Validate mobile number
  const validateMobileNumber = (mobileNumber) => {
    const regex = /^\+20\d{10}$/;
    return regex.test(mobileNumber)
      ? null
      : "Invalid mobile number. It should start with +20 followed by 10 digits.";
  };

  // Validate birth date (not in the future)
  const validateBirthDate = (birthDate) => {
    const currentDate = new Date();
    const selectedDate = new Date(birthDate);
    return selectedDate <= currentDate
      ? null
      : "Birth date cannot be in the future.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const firstNameError = validateName(formData.first_name);
    const lastNameError = validateName(formData.last_name);
    const passwordError = validatePassword(formData.password);
    const emailError = validateEmail(formData.email);
    const mobileNumberError = validateMobileNumber(formData.mobile_number);
    const birthDateError = validateBirthDate(formData.birth_date);

    const errorMessages = [
      firstNameError,
      lastNameError,
      passwordError,
      emailError,
      mobileNumberError,
      birthDateError,
    ].filter((error) => error !== null);

    if (errorMessages.length > 0) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: errorMessages.join("\n"),
      // });
      setError(errorMessages.join("\n"));
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match.",
      });
      setError("Passwords do not match.");
      return;
    }

    if (!formData.roles_name) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select you want to register as a user or an admin.",
      });s
      setError("Please select you want to register as a user or an admin.");
      return;
    }

    try {
      const data = await dispatch(register(formData)).unwrap();
      localStorage.setItem("token", data.token);
      // if(formData.roles_name === "administrator"){
      //   navigate("/admin");
      // }else{
      //   navigate("/");
      // }
      Swal.fire({
        icon: "success",
        title: "Registration successful!",
        text: "A verification email has been sent to your email address.",
      });
      navigate('/verify/:token');
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: authError || "Registration failed.",
      });
      setError(authError || "Registration failed. Try Again!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profile_image: file,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                my: 2,
                mx: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#7B3C1E", color: "white" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1, ml: 2, width: "100%" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      id="first_name"
                      label="First Name"
                      name="first_name"
                      autoComplete="given-name"
                      autoFocus
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      autoComplete="family-name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="password_confirmation"
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      id="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="mobile_number"
                      label="Mobile Number"
                      type="tel"
                      id="mobile_number"
                      autoComplete="tel"
                      value={formData.mobile_number}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="birth_date"
                      label="Birth Date"
                      type="date"
                      id="birth_date"
                      autoComplete="bday"
                      value={formData.birth_date}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      select
                      name="gender"
                      label="Gender"
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="profile_image"
                      label="Profile Image"
                      type="file"
                      id="profile_image"
                      onChange={handleImageChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup>
                      <RadioGroup 
                        name="roles_name"
                        value={formData.roles_name}
                        onChange={handleRole}
                      >
                        <FormControlLabel
                          value="user"
                          control={<Radio />}
                          label="User"
                        />
                        <FormControlLabel
                          value="admin"
                          control={<Radio />}
                          label="Admin"
                        />
                      </RadioGroup>
                    </FormGroup>
                  </Grid>
                  
                </Grid>
                <Button
                  // component={Link}
                  // to="/verify"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#7B3C1E" }}
                >
                  Register
                </Button>
                {error && <Typography color="error">{error}</Typography>}
                <Grid container>
                  <Grid item>
                    <Link
                      href="/login"
                      variant="body2"
                      sx={{ color: "#7B3C1E" }}
                    >
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 2 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
