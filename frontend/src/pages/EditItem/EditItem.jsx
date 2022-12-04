import React, { useEffect, useState } from 'react'
import {
  useParams
} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Buttons from "../../components/Buttons/Buttons";
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './EditItem.css'
const EditItem = () => {
  const [item, setItem] = useState()
  const navigate = useNavigate();
  const { id } = useParams();
  /// function to save when i edit a item ///
  const save = async () => {
    await
      axios.put(`http://localhost:2000/api/items/${id}`, item)
        .then(res => {
          navigate(`/dashboard/categories`)
          Swal.fire({
            title: " Update is Successfully",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
          })
        })
        .catch(err => { console.error(err); })
  }
  /// function to save when i edit a item ///

  /// function to handel get Data ///
  useEffect(() => {
    const handleGetData = async () => {
      await axios.get(`http://localhost:2000/api/items/${id}`)
        .then(res => {
          setItem(res.data.response)
          //   console.log(res.data.response)
        })
        .catch((err) => console.log(err))
    }
    id && handleGetData()
  }, [])

  /// function to handel get Data ///

  return (
    <div className='editPage'>
      <h1>Edit Item</h1>
      {item && <Box
        sx={{
          "& > :not(style)": { m: 1.5, width: "48ch" },
        }}
        noValidate
        autoComplete="off"
      >

        <TextField
          multiline
          rows={2}
          label='Name'
          variant="outlined"
          type='string'
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />

        <TextField
          multiline
          rows={2}
          label='Description'
          variant="outlined"
          type='string'
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />

        <TextField
          label='Price'
          variant="outlined"
          type='string'
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
        />

        <TextField
          variant="outlined"
          type='file'
        // value={item.image}
        // onChange={(e) => setItem({ ...item, image: e.target.value })}
        />

        <div className='editButton'>
          <Buttons
            buttonStyle="btn--danger--solid"
            buttonSize="btn-lg"
            text="Cancel"
            onClick={() => navigate(`/dashboard/categories/`)}
          />

          <Buttons
            buttonStyle="btn--success--solid"
            buttonSize="btn-lg"
            text="Save"
            onClick={save}
          />
          
        </div>
      </Box>}
    </div>
  )
}

export default EditItem