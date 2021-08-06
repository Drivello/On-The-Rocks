import React from 'react'
import { Grid, TextField, makeStyles, Button } from '@material-ui/core'
import { useForm, Form } from './useForm'
import { RoomSharp, PersonSharp, MarkunreadMailboxSharp, LocationCitySharp, PeopleAlt }  from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";
import Clear from "@material-ui/icons/Clear";

let initialForm = {
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zipCode: '',
  paymentMethod: ''   
}

const validate = (state, name, errors) => {
  const newErrors = {...errors};
  
  if (name === "firstName" && !state.firstName){
    newErrors.firstName = "FirstName is required.";
  }
  if (name === "lastName" && !state.lastName){
    newErrors.lastName = "LastName is required."   
  }
  if (name === "address" && !state.address){
    newErrors.address = "Adress Date is required.";   
  } 
  if (name === "city" && !state.city){
    newErrors.city = "City is required.";   
  }
  if (name === "zipCode" && !state.ZipCode){
    newErrors.zipCode = "ZipCode is required.";   
  }  
  return newErrors;
};

const useStyle = makeStyles(theme =>({
  gridContainer : {
    dispaly: 'flex',
    margin: '0 auto',
    justifyContent: 'center',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '1px'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '25px 0'

  },
  icon: {
    height: '35px',
    width: '30px'
  },
  inputError: {
    color: 'red'
  },
  clear: {
    fontSize:"35px"
  },
  clearContainer: {
    height:"22px"
  }
  
}))


const CreateOrder = () => {

  const classes = useStyle()

  const {
    state,
    setState,
    errors,
    setErrors,
    handleInputChange,
  }=useForm({initialForm, validate});


  
  return ( 
      <Form>
      <Grid container >
        <Grid item xs={6} className={classes.gridContainer}>
            <Grid container justifyContent="flex-end" className={classes.clearContainer}>
            <IconButton edge="start" color="inherit" size="small">
              <Clear className={classes.clear}/>
            </IconButton>
            </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
          <h2>Personal Details</h2>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid item className={classes.icon}>
          {<PersonSharp/>}
           </Grid>
           <Grid item xs={9}>
          <TextField 
          className={errors.firstName ? classes.inputError : ''}
          	helperText={ errors.firstName ? errors.firstName : ""}
            variant="standard"
            label="First name"
            value={state.firstName}
            name="firstName"
            onBlur={handleInputChange}
          />
           </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid item className={classes.icon}>
          {<PeopleAlt/>}
           </Grid>
           <Grid item xs={9}>
          <TextField 
          	helperText={ errors.lastName ? errors.lastName : ""}
            color={ errors.lastName ? "primary" : "secondary"}
            variant="standard"
            label="Last name"
            value={state.lastName}
            name="lastName"
            onBlur={handleInputChange}
            />
           </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid item className={classes.icon}>
          {<LocationCitySharp/>}
           </Grid>
           <Grid item xs={9}>
          <TextField 
          	helperText={ errors.city ? errors.city : ""}
            color={ errors.city ? "primary" : "secondary"}
            variant="standard"
            label="City"
            value={state.city}
            name="city"
            onBlur={handleInputChange}
          />
           </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid item className={classes.icon}>
          {<MarkunreadMailboxSharp/>}
           </Grid>
           <Grid item xs={9}>
          <TextField 
          	helperText={ errors.address ? errors.address : ""}
            color={ errors.address ? "primary" : "secondary"}
            variant="standard"
            label="Address"
            value={state.address}
            name="address"
            onBlur={handleInputChange}
          />
           </Grid>
          </Grid>


          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid item className={classes.icon}>
          {<RoomSharp/>}
           </Grid>
           <Grid item xs={9}>
          <TextField 
          	helperText={ errors.zipCode ? errors.zipCode : ""}
            color={ errors.zipCode ? "primary" : "secondary"}
            variant="standard"
            label="Zip code"
            value={state.zipCode}
            name="zipCode"
            onBlur={handleInputChange}
          />
           </Grid>
          </Grid>


          <Grid className={classes.buttons}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            // onClick={}
          >Next</Button>
          </Grid>

        </Grid>
      </Grid>
     </Form>
  )
}

export default CreateOrder