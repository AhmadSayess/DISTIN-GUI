import React, { useEffect, useState } from "react";
import "./Posts.css";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import Search from "../../components/Search/Search";
import Buttons from "../../components/Buttons/Buttons";
import { styled } from "@mui/material/styles";
import { Table, TableBody, TableContainer, TableHead, TableRow, } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
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

function Categories() {
  const [postes, setPostes] = useState([]);
  const [DATA, setDATA] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();





  /// function to get All postes ///

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="post">

      <div className="d-flex justify-content-around">
        {DATA && <Search
          placeholder="Search for categories && items"
          data={DATA && DATA}
          searched={setPostes}
          page={"posts"}
        />}
        <Buttons
          buttonStyle="btn--success--solid"
          buttonSize="btn-lg"
          text={"Add Post"}
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
          <form onSubmit={''}>
            <DialogTitle>{"Add A New Post"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Box
                  // component="form"
                  sx={{
                    "& > :not(style)": { m: 1.5, width: "58ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="standard-basic"
                    label="Add Your icon "
                    type='string'
                    required
                    // value={deal}
                    // onChange={(e) => setDeal(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    type='file'
                    required
                    // value={login}
                    // onChange={(e) => setLogin(e.target.value)}
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
                text={"New post"}
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
                  List catrgories
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
                {postes &&
                  postes.map((item, index) => {
                    return (
                      <StyledTableRow key={index} className="main_row">
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {/* {item.deal} */}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {/* {item.login} */}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {/* {item.entry} */}
                        </StyledTableCell>
                        

                        <StyledTableCell align="left" style={{ padding: 0 }}>
                          <div className="button_table">
                            <Buttons
                              buttonStyle="btn--success--solid"
                              buttonSize="btn-md"
                              icon={<EditIcon />}
                              // onClick={() => HandelEditPost(item._id)}
                            />

                            <Buttons
                              buttonStyle="btn--danger--solid"
                              buttonSize="btn-md"
                              icon={<DeleteOutlineIcon />}
                              // onClick={() => HandelDeletePost(item._id)}
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
