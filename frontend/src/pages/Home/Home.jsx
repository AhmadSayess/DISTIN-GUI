import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import '../Home/Home.css'
import { Link } from "react-router-dom";

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCategories = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:2000/api/categorie`)
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data.categories);
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



  return (
    <>
      <div className="container">
        <div className="team_container">
          <div className="text"> Our Menu</div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="row">
            {categories &&
              categories.map((item, index) => {
                return (
                  <div className="profile-card">
                    <div className="profile-content">
                      <div className="profile-image">
                        <img className="imageCat" src={item.image} alt="imagCategorie" />
                      </div>
                      <div className="desc">
                        <Link to={"listitem/" + item._id} ><h2> {item.name} </h2></Link>
                      </div>
                    </div>
                  </div>
                )
              }
              )}
          </div>)}
      </div>


    </>

  )
}

export default Home