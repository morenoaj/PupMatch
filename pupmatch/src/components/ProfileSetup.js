import React from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';

const ProfileSetup = () => {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">Setup Profile</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Dog's Name" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Breed" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Age" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary">Continue</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileSetup;
