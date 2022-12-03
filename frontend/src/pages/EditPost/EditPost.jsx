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
import './EditPost.css'

function EditPost() {

  const { id } = useParams();
  const [post, setPost] = useState()
  const navigate = useNavigate();

  const save = async () => {
    await
      axios.put(`http://localhost:2000/api/post/${id}`, post)
        .then(res => {
          navigate(`/dashboard/posts`)
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

  useEffect(() => {
    const handleGetData = async () => {
      await axios.get(`http://localhost:2000/api/post/${id}`)
        .then(res => {
          setPost(res.data.response)
          console.log(res.data.response)
        })
        .catch((err) => console.log(err))

    }
    id && handleGetData()
  },[])

  return (
    <div className='editPost'>
      <h1>Edit Post</h1>
      {post && <Box
        sx={{
          "& > :not(style)": { m: 1.5, width: "48ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label='Deal'
          variant="outlined"
          type='number'
          value={post.deal}
          onChange={(e) => setPost({ ...post, deal: e.target.value })}
        />
        <TextField
          label='Login'
          variant="outlined"
          type='number'
          value={post.login}
          onChange={(e) => setPost({ ...post, login: e.target.value })}
        />
        <TextField
          label='Entry'
          variant="outlined"
          type='number'
          value={post.entry}
          onChange={(e) => setPost({ ...post, entry: e.target.value })}
        />
        <TextField
          label='Action'
          variant="outlined"
          type='number'
          value={post.action}
          onChange={(e) => setPost({ ...post, action: e.target.value })}
        />
        <TextField
          label='Symbol'
          variant="outlined"
          value={post.symbol}
          onChange={(e) => setPost({ ...post, symbol: e.target.value })}
        />
        <TextField
          label='Price'
          variant="outlined"
          type='number'
          value={post.price}
          onChange={(e) => setPost({ ...post, price: e.target.value })}
        />
        <TextField
          type='number'
          label='Profit'
          variant="outlined"
          value={post.profit}
          onChange={(e) => setPost({ ...post, profit: e.target.value })}
        />
        <TextField
          type='number'
          label='Volume'
          variant="outlined"
          value={post.volume}
          onChange={(e) => setPost({ ...post, volume: e.target.value })}
        />
        <div className='editButton'>
          <Buttons
            buttonStyle="btn--danger--solid"
            buttonSize="btn-lg"
            text="Cancel"
            onClick={() => navigate(`/dashboard/posts`)}
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

export default EditPost