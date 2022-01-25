import { useState } from "react";
import "../styling/Mapside.scss";
import CityDropdown from "./CityDropdown";
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";

const Mapside = (props: any) => {
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
          <h2>About</h2>
        </div>
      </div>
      {section === "Overview" ? (
        <div className="container">
          {/* <CityDropdown /> */}

          {collapse === false ? <CityDropdown /> : ""}
          <h3>Incidents summary for {props.city.name} </h3>
          <h3>Top 5 incident reporting cities </h3>
          <h3>Number of incidents per 100.000 people</h3>
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
      ) : (
        <div className="container">
          <h3>
            This page is an interactive map marking all criminal incidents that
            took place in all over Sweden as of January 2022. The data comes
            from Polissen and is batched and modified to serve the purpose in a
            backend server. The map is updated and populated with new incidents
            everyday at 18:00. <br></br>
            <br></br> The primary purpose of this application is to help
            non-local people assess the safety of the neighbourhoods bofore
            purchasing a house & moving in.
            <br></br>
            <br></br>
            It is founded, developed and being maintained by Tolunay Hos, an
            entreprenuer aspiring to be a front-end developer. Should you have
            questions or ideas for improvement, please do contact me from here.
            If you seek a junior developer in your company, learn more about me
            from here.
            <br></br>
            <br></br>
            The application is in constant development process and new features
            will be implemented in accordance with the community's wishes.
          </h3>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    city: state.citySelector,
  };
};
export default connect(mapStateToProps)(Mapside);
