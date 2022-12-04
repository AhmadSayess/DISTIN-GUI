import React, { useEffect, useState } from "react";
import './Items.css'
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import Search from "../../components/Search/Search";
import Buttons from "../../components/Buttons/Buttons";
import { styled } from "@mui/material/styles";
import { Table, TableBody, TableContainer, TableHead, TableRow, } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

//// for a text filed ///
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//// for a text filed ///

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#344f7c",
    color: "#ededed",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    color: "var(--textcolor1)",
    textAlign: "center",
    transition: ".5s",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "var(--background2)",
  transition: ".5s",
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Items() {
  const [items, setItems] = useState([]);
  const [DATA, setDATA] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();


  /// function to  getAllItemByCategorie ///
  const arr = window.location.href.split("/");
  const id = arr[arr.length - 1];
  const getAllItemByCategorie = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:2000/api/items/itemsByBategory/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setItems(res.data.response);
          setDATA(res.data.response);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllItemByCategorie();
  }, []);
  /// function to get All getAllItemByCategorie ///


    ////  function to add a categories ///
    const HandeladdItem = async (e) => {
      e.preventDefault();
      const image_array = Object.values(images.images);
      const formData = new FormData();
      image_array.forEach((file) => {
        formData.append("image", file);
      });
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("categorie", id);
      await axios
        .post("http://localhost:2000/api/items/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setName("");
          setDescription("");
          setPrice("");
          setImages("");
          setOpen(false);
          Swal.fire({
            title: " adedd Successfully",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
          });
          getAllItemByCategorie();
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    ////  function to add a categories ///



    ////  function to Edit a categories ///
  const HandelEditItem = (id) => {
    navigate(`/dashboard/edititem/${id}`);
  };
    ////  function to Edit a categories ///


  ////  Function to delet a categories ///
  const HandelDeletItem = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:2000/api/items/${id}`)
          .then((res) => {
            setLoading(true);
            Swal.fire({
              title: " Deleted Is Successfully",
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-end",
              showConfirmButton: false,
            });
            getAllItemByCategorie();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
  };
  ////  Function to delet a categories ///


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <div className="post">

      <div className="d-flex justify-content-around">

        {DATA && <Search
          placeholder="Search for Items"
          data={DATA && DATA}
          searched={setItems}
          page={"items"}
        />}

        <Buttons
          buttonStyle="btn--success--solid"
          buttonSize="btn-lg"
          text={"Add Items"}
          variant="outlined"
          onClick={handleClickOpen}
        />

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          
          <form onSubmit={HandeladdItem}>

            <DialogTitle>{"Add A New Post"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Box
                  sx={{
                    "& > :not(style)": { m: 1.5, width: "58ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >

                  <TextField
                    id="standard-basic"
                    type='file'
                    required
                    inputProps={{
                      multiple: true,
                    }}
                    onChange={(e) => setImages({ images: e.target.files })}
                  />

                  <TextField
                    id="standard-basic"
                    label="Add Your Name "
                    type='string'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />  
                  
                   <TextField
                    id="standard-basic"
                    label="Add Your Description "
                    type='string'
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <TextField
                    id="standard-basic"
                    label="Add Your price "
                    type='string'
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              
              <Buttons
                buttonStyle="btn--danger--solid"
                buttonSize="btn-lg"
                text={"Cancel "}
                onClick={handleClose}
              />

              <Buttons
                buttonStyle="btn--success--solid"
                buttonSize="btn-lg"
                text={"New Item"}
                type='submit'
              />

            </DialogActions>
          </form>
        </Dialog>
      </div>

      <div
        className="post_table"
        style={{ display: "flex", position: "relative", minHeight: "70vh" }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 400 }} aria-label="contained table">
            <TableHead>
              <TableRow>

                <StyledTableCell align="left">
                  <LocalOfferIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    image
                  </span>
                </StyledTableCell>

                <StyledTableCell align="left">
                  <CalendarMonthIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Name
                  </span>
                </StyledTableCell>

                <StyledTableCell align="left">
                  <CalendarMonthIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    description
                  </span>
                </StyledTableCell>

                <StyledTableCell align="left">
                  <CalendarMonthIcon style={{ width: "22px" }} /> &nbsp;
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    price
                  </span>
                </StyledTableCell>

                <StyledTableCell align="left">
                  <RingVolumeIcon />
                  <span style={{ fontWeight: "bold", verticalAlign: "bottom" }}>
                    Action
                  </span>
                </StyledTableCell>
              </TableRow>
            </TableHead>

            {loading ? (
              <Loading />
            ) : (
              <TableBody>
                {items &&
                  items.map((item, index) => {
                    return (
                      <StyledTableRow key={index} className="main_row">

                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          <img src={item.image} style={{ width: "35px", "border-radius": "70%" }} />
                        </StyledTableCell>

                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.name}
                        </StyledTableCell>

                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.description.substring(0,30)} ...
                        </StyledTableCell>

                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {item.price}
                        </StyledTableCell>

                        <StyledTableCell align="left" style={{ padding: 0 }}>
                          <div className="button_table">
                            <Buttons
                              buttonStyle="btn--success--solid"
                              buttonSize="btn-md"
                              icon={<EditIcon />}
                            onClick={() => HandelEditItem(item._id)}
                            />

                            <Buttons
                              buttonStyle="btn--danger--solid"
                              buttonSize="btn-md"
                              icon={<DeleteOutlineIcon />}
                            onClick={() => HandelDeletItem(item._id)}
                            />
                          </div>
                        </StyledTableCell>

                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            )}
          </Table>

        </TableContainer>
      </div>
    </div>
  );
}
export default Items;
