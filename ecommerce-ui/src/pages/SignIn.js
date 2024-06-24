import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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

export default function SignIn() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const history = useHistory()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userEmail = data.get('email')
    const dataValues = {
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(dataValues)
    fetch('http://127.0.0.1:8080/checkUser', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataValues)
    }).then((res) => {
      return res.json()
    })
      .then((data) => {
        if (data.status == "success") {
          console.log(data)
          localStorage.setItem('userId', data.id)
          const vall = localStorage.getItem('userId')
          console.log("here is your value")
          localStorage.setItem('userEmail', userEmail)
          console.log(vall)
          history.push('/')

        }
        else {
          setOpen(true)
        }
      })
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
                Sign in
              </Typography>
              <Grid
                container
                spacing={2}
              >
                <Grid item md={12} xs={8}>
                  <CssTextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type='email'
                    autoFocus
                  />
                </Grid>
                <Grid item md={12} xs={8}>
                  <CssTextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
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
              </Grid>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                  onClose={handleClose}
                  severity="error"
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  Email or password is incorrect
                </Alert>
              </Snackbar>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
      </Container>
    </ThemeProvider >
  );
}