import { useState } from "react";
import "../styling/Mapside.scss";
import CityDropdown from "./CityDropdown";
// import CityDropdown from "./CityDropdown";
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";

const Mapside = (props: any) => {
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    collapse === false ? setCollapse(true) : setCollapse(false);
  };

  console.log(props);

  // const onSelectedCity = (e: Event) => {
  //   console.log("I selected" + e);
  // };

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
        {/* <CityDropdown /> */}
        <CityDropdown />
        <h3>Incidents summary for {props.city} </h3>
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
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    city: state.citySelector,
  };
};
export default connect(mapStateToProps)(Mapside);
