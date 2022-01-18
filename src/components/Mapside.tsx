import { useState } from "react";
import "../styling/Mapside.scss";

const Mapside = () => {
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    collapse === false ? setCollapse(true) : setCollapse(false);
  };

  return (
    <div
      className={
        collapse === false ? "MapsideWrapper" : "MapsideWrapper passiveWrapper"
      }
    >
      <div className="MapsideHeader">
        <div className="headerelement">
          <h2>Overview</h2>
        </div>
        <div className="headerelement">
          <h2>About</h2>
        </div>
      </div>
      <div className="container">
        <h2>City: Solna</h2>
        <h3>Incidents summary of 2022 </h3>
        <h3>Fatal incidents in 2022:</h3>
        <h3>Last reported incidents</h3>
        <h3>Safety rating</h3>
        <div>
          <div className="toggleInfo" onClick={handleCollapse}>
            <div className="toggleArea">
              <i
                className={
                  collapse === false
                    ? "angle double right icon huge"
                    : "angle double left icon huge"
                }
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapside;
