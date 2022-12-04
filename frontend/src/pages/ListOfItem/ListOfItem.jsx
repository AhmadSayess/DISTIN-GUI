import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ListOfItem.css'
import { Link } from "react-router-dom";
const ListOfItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);


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
  return (
    <>
    
     <Link to='/'> <ArrowBackIcon   /></Link>  
      
      <div className="wrapper">
        <div className="title">
          <h4><span>fresh food for good health</span>our Item</h4>
        </div>
        {loading ? (
              <Loading />
            ) : (
        <div className="menu">
          {items &&
            items.map((item, index) => {
              return (
                <div className="single-menu">
                  <img src={item.image} alt="" />
                  <div className="menu-content">
                    <h4> {item.name} <span> {item.price} </span></h4>
                    <p> {item.description} </p>
                  </div>
                </div> ) })}
                
        </div>) }
      </div>


    </>
  )
}

export default ListOfItem