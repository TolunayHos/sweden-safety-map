import { useState } from "react";
import "../styling/Mapside.scss";
import CityDropdown from "./CityDropdown";
import About from "./About";
import CountyStats from "./CountyStats";
import LastReportedPage from "./LastReportedPage";

const Mapside = () => {
  const [collapse, setCollapse] = useState(false);
  const [section, setSection] = useState("Overview");
  const [expandLastReported, setExpandLastReported] = useState(false);

  const handleCollapse = () => {
    collapse === false ? setCollapse(true) : setCollapse(false);
  };

  const handleSectionChange = (x: string, y: string) => {
    section === x && setSection(y);
  };

  const handleExpand = (val: boolean) => {
    setExpandLastReported(val);
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
          {expandLastReported === false && (
            <div className="selection">
              {" "}
              <div className="countyArea">
                <h3>Select a county:</h3>
                {<CityDropdown />}{" "}
              </div>
              <div className="searchArea">
                <h3>Search a keyword:</h3>
                <div>
                  <input
                    placeholder="(i.e Östermalm)"
                    onClick={() => handleExpand(true)}
                  />
                </div>
              </div>
            </div>
          )}

          {expandLastReported === false ? (
            <CountyStats />
          ) : (
            <LastReportedPage handleExpand={handleExpand} />
          )}

          <div>
            <div className="toggleInfo" onClick={handleCollapse}>
              <div className="toggleArea">
                <i
                  className={
                    collapse === false
                      ? "angle double right icon large "
                      : "angle double left icon large"
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
                    ? "angle double right icon large"
                    : "angle double left icon large"
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
