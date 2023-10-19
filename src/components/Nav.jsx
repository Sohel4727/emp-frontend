import { Card, CardContent, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { nav } from "./data/nav";
import Navitem from "./Navitem";

const Nav = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(nav);
  }, []);
  return (
    <Card sx={{bgcolor:"midnightblue"}}>
      <CardContent>
        <Grid container spacing={2}>
          {data.map((item) => (
            <Navitem item={item} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Nav;
