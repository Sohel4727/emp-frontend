import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";
import Alerts from "./Custom/Alerts";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { BASE_URL } from "../constant";
const AddEmp = ({ setOpen }) => {
  const [empData, setEmpData] = useState({
    empid: "",
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    city: "",
  });

  const [alert, setAlert] = useState(false);
  const [configAlert, setConfigAlert] = useState({
    title: "",
    icon: "",
    text:""
  });
  const handleChange = (e) => {
    setEmpData({ ...empData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !empData.empid &&
      !empData.fname &&
      !empData.lname &&
      !empData.email &&
      !empData.mobile &&
      !empData.city
    ) {
    }
    await axios
      .post(`${BASE_URL}addemp`, empData)
      .then((res) => {
        console.log("res", res);

        if (res.status === 201) {
          setAlert(true);
          setConfigAlert({
            icon: "success",
            title:"Added",
            text: "Employee Added Successfully",

          });

          setEmpData({
            empid: "",
            fname: "",
            lname: "",
            email: "",
            mobile: "",
            city: "",
          });
        }
        setTimeout(() => {
          setOpen(false);
        }, 1000);
        setTimeout(() => {
          setAlert(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Employee Can't Added",
        });
        setTimeout(() => {
          setAlert(false);
        }, 1000);
      });
  };

  return (
    <Card>
      <CardContent>
        {alert && <Alerts icon={configAlert.icon} title={configAlert.title}  text={configAlert.text} />}
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              size="small"
              name="empid"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
              label="Emplooye Id"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              name="fname"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
              label="First Name"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              name="lname"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
              label="Last Name"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              name="email"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
              label="Email Id"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              name="mobile"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
              label="Mobile No"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              name="city"
              onChange={(e) => handleChange(e)}
              variant="outlined"
              fullWidth
              label="City"
            />
          </Grid>
          <Grid item xs={1.5}>
            <Button
              size="small"
              onClick={handleSubmit}
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={1.5}>
            <Button
              size="small"
              variant="contained"
              fullWidth
              color="warning"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AddEmp;
