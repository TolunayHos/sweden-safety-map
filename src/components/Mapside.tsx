import { useState } from "react";
import "../styling/Mapside.scss";
import CityDropdown from "./CityDropdown";
import About from "./About";
import CountyStats from "./CountyStats";

const Mapside = () => {
  const [collapse, setCollapse] = useState(false);
  const [section, setSection] = useState("Overview");

  const handleCollapse = () => {
    collapse === false ? setCollapse(true) : setCollapse(false);
  };

  const handleSectionChange = (x: string, y: string) => {
    section === x && setSection(y);
  };

  return (
    <div
      className={
        collapse === false ? "MapsideWrapper" : "MapsideWrapper passiveWrapper"
      }
    >
      <div className="MapsideHeader">
        <div
          className={
            section === "Overview" ? "headerelement active" : "headerelement"
          }
          onClick={() => handleSectionChange("About", "Overview")}
        >
          <h2>Overview</h2>
        </div>
        <div
          className={
            section === "About" ? "headerelement active" : "headerelement"
          }
          onClick={() => handleSectionChange("Overview", "About")}
        >
          <h2>
            About <i className="exclamation triangle icon "></i>
          </h2>
        </div>
      </div>
      {section === "Overview" ? (
        <div className="container">
          <h3>Choose a county:</h3>
          {collapse === false ? <CityDropdown /> : ""}
          <CountyStats />
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
      ) : (
        <div className="container">
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
          <About />
        </div>
      )}
    </div>
  );
};

export default Mapside;
