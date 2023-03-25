import * as React from 'react';
import {Box, Typography, CardContent, CardMedia, Rating, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide} from '@mui/material/';
import logocompany from '../../assets/companylogodemo.png'
import {Badge} from '@mui/icons-material/';
import SendIcon from '@mui/icons-material/Send';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Profile = (propss) => {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
<>
  <Box className="flex flex-row">
    <CardMedia
      component="img"
      sx={{ width: 151 }}
      image={logocompany}
      alt="Live from space album cover"
    />
    <CardContent className="flex flex-col justify-center">
      <Typography component="div" variant="h5">
        Nombre de la empresa
      </Typography>
      <Typography component="div" variant="subtitle1">
        www.empresa.com
      </Typography>
      <Rating name="ratingCompany" value={4} readOnly />
    </CardContent>
  </Box>
  <Box className="flex flex-row gap-3">   
    <Button variant="outlined" onClick={handleClickOpen} startIcon={<Badge />}>
      Modificar mis datos
    </Button>
    <Button variant="contained" endIcon={<SendIcon />}>
      Send
    </Button>
  </Box>
  <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
</>
    )
}

export default Profile