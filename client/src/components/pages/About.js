import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const About = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box m={5}>
          <Typography component='h3' variant='h4' align='center'>
            About Exercises Tracker
          </Typography>
        </Box>
        <Typography component='p'>
          This is a full stack React application keeping track about your
          exercise
        </Typography>
        <Typography component='p'>
          How to use the app? First, you need to register. Then set up a few
          dummy exercises for your self just to have a better understanding, how
          the application is working. The main goal here is to track and monitor
          your training journey. See how is your progress, and compare your
          days.
        </Typography>
        <br />
        <Typography component='p'>
          I used the following technologies. Front-End: React Js as a Libray
          with useContext Hook and useReducer.React-router. Work only with
          functional components. Material-UI for the main design. Apexcharts for
          the graph charts. Axios for asynchronous HTTP request. Back-End:
          NodeJS, MongoDB, Mongoose, Express, bcryptjs for hashing the password.
          Express validator, Gravatar, JsonWebtoken, Moment, UUID for
          development dommy Id generating.
        </Typography>
        <br />
        <Typography component='p'>
          The idea of the application was born during the lockdown, and use only
          exercises that you can do your self mostly at home or around your
          park. No gym needed.
        </Typography>
        <br />
        <Typography component='p'>
          If you are still reading this that's mean you really show some
          interest about my application. Please in the end leave a comment, to
          do that just click the comment icon on the footer when you are logged
          in. I appreciate any feedback. Thank you
        </Typography>
      </Container>
    </Fragment>
  );
};

export default About;
