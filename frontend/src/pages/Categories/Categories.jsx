import React, { useEffect, useState } from "react";
import "./Categories.css";
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
import { Link, useNavigate } from "react-router-dom";

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

function Categories() {
  const [categories, setCategories] = useState([]);
  const [DATA, setDATA] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(""); /// state for the to  add a new project ///
  const [images, setImages] = useState([]);
  const navigate = useNavigate();


  /// function to get All categories ///
  const getAllCategories = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:2000/api/categorie`)
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data.categories);
          setDATA(res.data.categories);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  /// function to get All categories ///


  ////  function to add a categories ///
  const HandeladdCategorie = async (e) => {
    e.preventDefault();
    const image_array = Object.values(images.images);
    const formData = new FormData();
    image_array.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("name", name);
    await axios
      .post("http://localhost:2000/api/categorie/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setName("");
        setImages("");
        setOpen(false);
        Swal.fire({
          title: " Adedd Successfully",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
        getAllCategories();
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ////  function to add a categories ///


  ////  function to edit a categories ///
  const HandelEditCategorie = (id) => {
    navigate(`/dashboard/editcategorie/${id}`);
  };
  ////  function to edit a categories ///

  ////  function to delet a categories ///
  const HandelDeleteCategorie = (id) => {
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
          .delete(`http://localhost:2000/api/categorie/${id}`)
          .then((res) => {
            setLoading(true);
            Swal.fire({
              title: " Deleted Is Successfully",
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-function",
              showConfirmButton: false,
            });
            getAllCategories();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
  };
  ////  function to delet a categories ///

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setImages("");

  };

  return (
    <div className="post">

      <div className="d-flex justify-content-around">

        <Search
          placeholder="Search for categories "
          data={DATA}
          searched={setCategories}
          page={"categories"}
        />

        <Buttons
          buttonStyle="btn--success--solid"
          buttonSize="btn-lg"
          text={"Add Categories"}
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
          <form onSubmit={HandeladdCategorie}>

            <DialogTitle>{"Add A New Category"}</DialogTitle>
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
                    label="Add Categorie Name "
                    type='string'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    type='file'
                    required
                    inputProps={{
                      multiple: true,
                    }}
                    // value={images}
                    onChange={(e) => setImages({ images: e.target.files })}
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
                text={"New Categorie"}
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
                    Icon
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
                    List Items
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
                {categories &&
                  categories.map((item, index) => {
                    return (
                      <StyledTableRow key={index} className="main_row">

                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          <img src={item.image} style={{ width: "30px", "border-radius": "70%" }} />
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
                          <Link to={"/dashboard/items/" + item._id}  >Open List</Link>
                        </StyledTableCell>

                        <StyledTableCell align="left" style={{ padding: 0 }}>
                          <div className="button_table">
                            <Buttons
                              buttonStyle="btn--success--solid"
                              buttonSize="btn-md"
                              icon={<EditIcon />}
                              onClick={() => HandelEditCategorie(item._id)}
                            />

                            <Buttons
                              buttonStyle="btn--danger--solid"
                              buttonSize="btn-md"
                              icon={<DeleteOutlineIcon />}
                              onClick={() => HandelDeleteCategorie(item._id)}
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
export default Categories;
