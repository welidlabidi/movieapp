import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Trailer from "./trailer";
import Actors from "./actors";
import { IoIosStarOutline } from "react-icons/io";
import { MdLanguage } from "react-icons/md";

const Cards = ({ result }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [trailerKey, setTrailerKey] = useState([]);
  const [cast, setCast] = useState([]);
  const apiKey = "fac34116c639f3e75cd5205251be421c";
  const trailer = `http://api.themoviedb.org/3/movie/${result.id}/videos?api_key=${apiKey}&append_to_respone=videos`;
  const credit = `https://api.themoviedb.org/3/movie/${result.id}/credits?api_key=${apiKey}`;
  const Open = () => setShowPopup(true);
  const Close = () => setShowPopup(false);

  useEffect(() => {
    axios(trailer).then(({ data }) => {
      setTrailerKey(data.results);
      console.log(data);
    });
  }, [trailer]);

  let trailerMovie = "";

  for (let i = 0; i < trailerKey.length; i++) {
    let name = trailerKey[i].name.toLowerCase().split(" ");
    for (let a = 0; a < name.length; a++) {
      if (name[a] === "official" && name[a] === "trailer") {
        trailerMovie = trailerKey[i].key;
        name = trailerKey[i].name;
      }
      if (name[a] === "trailer") {
        trailerMovie = trailerKey[i].key;
        name = trailerKey[i].name;
      }
    }
  }

  useEffect(() => {
    axios(credit).then(({ data }) => {
      const actors = data.cast.slice(0, 8);
      setCast(actors);
    });
  }, [credit]);

  return (
    <div>
      <Card className="movie" style={{ width: "15rem" }} onClick={Open}>
        <button>
          <Card.Img
            variant="top"
            src={`http://image.tmdb.org/t/p/w185/` + result.poster_path}
            alt="no image found"
          />
        </button>
      </Card>
      <Modal show={showPopup} onHide={Close} centered size="lg">
        <div className="popup">
          <Modal.Header>
            <Modal.Title>
              <div className="titlemovie">
                {result.original_title}({result.release_date.substring(0, 4)})
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
              <div className="discription">
                <div className="row">
                  <div className="modalimg">
                    <img
                      src={
                        "http://image.tmdb.org/t/p/w185/" + result.poster_path
                      }
                      alt="ok"
                    />
                  </div>
                  <div className="text">
                    <div className="data">
                      <p>
                        <IoIosStarOutline style={{ color: "yellow" }} />
                        <IoIosStarOutline style={{ color: "yellow" }} />
                        <IoIosStarOutline style={{ color: "yellow" }} />
                        {result.vote_average}
                      </p>
                      <p>
                        <MdLanguage />
                        {result.original_language}
                      </p>
                    </div>
                    <h5> {result.overview}</h5>
                  </div>
                </div>
              </div>
            </div>
            <Trailer trailer={trailerMovie} />
            <div className="actors">
              <div className="row" style={{ justifyContent: "space-evenly" }}>
                {cast.map((cast) => (
                  <Actors
                    key={cast.id}
                    name={cast.name}
                    character={cast.character}
                    img={cast.profile_path}
                  />
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={Close}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};
export default Cards;
