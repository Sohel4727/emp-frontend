import { Card, CardContent } from "@mui/material";
import React from "react";
import Landing from "./components/Landing";
import WebRoutes from "./WebRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Card sx={{bgcolor:"lavender"}}>
      <CardContent>
       <WebRoutes/>
      </CardContent>
    </Card>
  );
}

export default App;
