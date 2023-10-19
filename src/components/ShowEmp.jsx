import React, { useEffect, useState } from "react";
import axios from "axios";
import Alerts from "./Custom/Alerts";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, Button, Grid, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddEmp from "./AddEmp";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import '@ckeditor/ckeditor5-build-classic/build/translations/en.css';
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { BASE_URL } from "../constant";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const styles = {
  input: {
    borderRadius: "6px",
    // backgroundColor: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const ShowEmp = () => {
  const [data, setData] = useState([]);
  const [con, setCon] = useState("");
  const [serialNumber, setSerialNumber] = useState(0);
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [configAlert, setConfigAlert] = useState({
    title: "",
    icon: "",
    text: "",
  });

  const getApi = async () => {
    const result = await axios.get(`${BASE_URL}emp`);
    setData(result.data);
  };

  useEffect(() => {
    getApi();
  }, [data]);

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}delemp/${item._id}`);
        getApi();
        setCon(item);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Error",
          "An error occurred while deleting the employee.",
          "error"
        );
      }
    }
  };

  // const handleDelete = async (item) => {
  //   const shouldRemove = window.confirm("Delete Confirm");
  //   if (shouldRemove) {
  //     await axios.delete(``${BASE_URL}delemp/${item._id}`);
  //     getApi();
  //     setCon(item);
  //   }
  //   setTimeout(() => {
  //     setCon();
  //   }, 5000);
  // };

  const toggleEdit = (_id) => {
    // Toggle the edit state for the specific item
    setEditData((prevEditData) => ({
      ...prevEditData,
      [_id]: !prevEditData[_id],
    }));
  };

  const handleEditChange = (_id, field, value) => {
    // Update the specific field for the specific item
    setEditData((prevEditData) => ({
      ...prevEditData,
      [_id]: {
        ...prevEditData[_id],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async (_id) => {
    try {
      const updatedData = editData[_id];
      await axios.put(`${BASE_URL}updateemp/${_id}`, updatedData);
      setEditData((prevEditData) => ({
        ...prevEditData,
        [_id]: undefined, // Clear the edit state for this item after updating
      }));
     
      // Display a success alert
      setAlert(true);
      setConfigAlert({
        icon: "success",
        title: "Updated",
        text: "Employee data updated successfully",
      });

      setTimeout(() => {
        setAlert(false);
      }, 1000);

      getApi();
    } catch (error) {
      console.error(error);
      // Display an error alert
      setAlert(true);
      setConfigAlert({
        icon: "error",
        title: "Error",
        text: "Failed to update employee data",
      });

      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  };

  const handleChange = (event, editor) => {
    const data = editor.getData();
    console.log(data);
  };

  const handleAdd = () => {
    setOpen(!open);
  };

  const handleUpdateClose = (_id) => {
    setEditData((prevEditData) => ({
      ...prevEditData,
      [_id]: undefined, // Clear the edit state for this item after updating
    }));
  };

  return (
    <>
      {/* <div>
        <h2>CKEditor 5 Example</h2>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello CKEditor 5!</p>"
          onChange={handleChange}
        />
      </div> */}

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            onClick={handleAdd}
            sx={{ m: 2 }}
            size="small"
            color="success"
            variant="contained"
          >
            +Add Employee
          </Button>
        </div>
        <div>{open && <AddEmp setOpen={setOpen} />}</div>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ textAlign: "center" }}>
                Serial No.
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>
                Emplooye Id
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>
                Fullname
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>
                Email id
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>
                Mobile No.
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>
                City
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}></StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{serialNumber + index + 1}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  {editData[item._id] ? (
                    <TextField
                      variant="standard"
                      size="small"
                      style={styles.input}
                      value={editData[item._id]?.empid || item.empid}
                      onChange={(e) =>
                        handleEditChange(item._id, "empid", e.target.value)
                      }
                    />
                  ) : (
                    item.empid
                  )}
                </StyledTableCell>

                <StyledTableCell sx={{ textAlign: "center" }}>
                  {editData[item._id] ? (
                    <div style={{ display: "flex" }}>
                      <TextField
                        style={styles.input}
                        sx={{ marginRight: 3 }}
                        size="small"
                        variant="standard"
                        fullWidth
                        value={editData[item._id]?.fname || item.fname}
                        onChange={(e) =>
                          handleEditChange(item._id, "fname", e.target.value)
                        }
                      />
                      <TextField
                        style={styles.input}
                        size="small"
                        variant="standard"
                        fullWidth
                        value={editData[item._id]?.lname || item.lname}
                        onChange={(e) =>
                          handleEditChange(item._id, "lname", e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    `${item.fname} ${item.lname}`
                  )}
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  {editData[item._id] ? (
                    <TextField
                      style={styles.input}
                      size="small"
                      variant="standard"
                      fullWidth
                      value={editData[item._id]?.email || item.email}
                      onChange={(e) =>
                        handleEditChange(item._id, "email", e.target.value)
                      }
                    />
                  ) : (
                    item.email
                  )}
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  {editData[item._id] ? (
                    <TextField
                      style={styles.input}
                      size="small"
                      variant="standard"
                      fullWidth
                      value={editData[item._id]?.mobile || item.mobile}
                      onChange={(e) =>
                        handleEditChange(item._id, "mobile", e.target.value)
                      }
                    />
                  ) : (
                    item.mobile
                  )}
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  {editData[item._id] ? (
                    <TextField
                      style={styles.input}
                      size="small"
                      variant="standard"
                      fullWidth
                      value={editData[item._id]?.city || item.city }
                      onChange={(e) =>
                        handleEditChange(item._id, "city", e.target.value)
                      }
                    />
                  ) : (
                    item.city
                  )}
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  {editData[item._id] ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <DoneIcon
                      sx={{mr:2}}
                        onClick={() => handleUpdate(item._id)}
                        size="small"
                        variant="contained"
                        fullWidth
                      />
                      <CloseIcon onClick={() => handleUpdateClose(item._id)} />
                    </div>
                  ) : (
                    <Button
                      onClick={() => toggleEdit(item._id)}
                      size="small"
                      variant="contained"
                      fullWidth
                    >
                      <EditIcon />
                    </Button>
                  )}
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  <Button
                    size="small"
                    color="warning"
                    onClick={() => handleDelete(item)}
                    variant="contained"
                    fullWidth
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {alert && (
          <Alerts
            icon={configAlert.icon}
            title={configAlert.title}
            text={configAlert.text}
          />
        )}
      </TableContainer>
    </>
  );
};

export default ShowEmp;
