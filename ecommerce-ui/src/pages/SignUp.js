import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { withStyles } from '@mui/styles';

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black"
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "blue"
      },
      "&:hover fieldset": {
        borderColor: "black"
      },
      "&.Mui-focused fieldset": {
        borderColor: "blue"
      }
    }
  }
})(TextField);
const defaultTheme = createTheme();

export default function SignUp() {
  const [isError, setIsError] = React.useState(false)
  const [passwordMatch, setPasswordMatch] = React.useState(true)
  const [open, setOpen] = React.useState(false);
  const history = useHistory()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password')
    const confirm_password = data.get('confirmPassword')
    const userEmail = data.get('email')
    if (password === confirm_password) {
      setPasswordMatch(true)
      const dataValues = {
        email: data.get('email'),
        password: data.get('password'),
      };
      console.log(dataValues)
      fetch('http://127.0.0.1:8080/addUser', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataValues)
      }).then((res) => {
        return res.json()
      })
        .then((data) => {
          // setUserId(data.id)
          console.log(data)
          if (data.status == 'success') {
            console.log(data)
            localStorage.setItem('userId', data.id)
            const vall = localStorage.getItem('userId')
            console.log("here is your value")
            console.log(vall)
            localStorage.setItem('userEmail', userEmail)
            history.push('./')

          }
          else {
            console.log("user already exists")
            setIsError(true)
            setOpen(true);
          }
        })


    }
    else {
      setIsError(true)
      setPasswordMatch(false)
      setOpen(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <form style={{
          marginTop: "5vh", display: 'flex', flexDirection: 'column',
          alignItems: 'center',
        }} onSubmit={handleSubmit}>
          <div className="registrationForm" style={{ display: "flex", maxWidth: "400px" }}>
            <div className="registrationFormContainer" style={{ flex: "6" }}>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Grid container spacing={2}>

                <Grid item md={12} xs={8}>
                  <CssTextField
                    required
                    fullWidth
                    autoFocus
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                  />
                </Grid>
                <Grid item md={12} xs={8}>
                  <CssTextField
                    required
                    fullWidth
                    autoFocus
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item md={12} xs={8}>
                  <CssTextField
                    required
                    fullWidth
                    autoFocus
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                  />
                </Grid>

              </Grid>
              <Grid item md={12} xs={8}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Grid>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                  onClose={handleClose}
                  severity={isError ? "error" : "success"}
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  {!passwordMatch ? 'Password do not match' : 'User is already registered!'}
                </Alert>
              </Snackbar>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
      </Container>
    </ThemeProvider>
  );
}