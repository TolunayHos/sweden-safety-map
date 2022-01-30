import { useEffect, useState } from "react";
import "../styling/Mapside.scss";
import CityDropdown from "./CityDropdown";
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";
// import { getCityIncidentSummary } from "../state/actions/index";
import Summary from "../models/Summary";

const Mapside = (props: any) => {
  const [collapse, setCollapse] = useState(false);
  const [section, setSection] = useState("Overview");
  const [details, setDetails] = useState<Summary[]>([]);

  const handleCollapse = () => {
    collapse === false ? setCollapse(true) : setCollapse(false);
  };

  const handleSectionChange = (x: string, y: string) => {
    section === x && setSection(y);
  };

  const { summary } = props;

  const getDetailsOnCity = (city: string) => {
    return summary.filter(
      (incident: any) => incident.city === city && incident
    );
  };

  useEffect(() => {
    if (summary !== undefined && summary.length > 0) {
      console.log("summary is not undefined and length is bigger than 0!");
      setDetails(getDetailsOnCity(props.city.name.toLowerCase()));
      console.log(details);
    } else if (details.length < 0) {
      console.log("We got a serious problem");
    }
  }, [props.city.name, summary.length]);

  console.log(details);

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
          <h3>Choose a county:</h3>
          {collapse === false ? <CityDropdown /> : ""}
          <h3> Common incidents in {props.city.name} county </h3>
          {details.length === 0
            ? "Loading"
            : details[0].incidentSum.map((incident, i) => (
                <div className="commoncrime">
                  <h4>
                    {" "}
                    {/* <i className="exclamation circle icon"></i>{" "} */}
                    {i + 1}-{incident.incidentType} (
                    {incident.numberOfIncidents}){" "}
                  </h4>
                </div>
              ))}

          <h3>Top 5 incident reporting cities </h3>
          <h3>Number of incidents per 100.000 people</h3>
          {details.length === 0 ? (
            "Loading"
          ) : (
            <div className="PerPeople">
              <h4>{details[0].incidentsPer}</h4>
            </div>
          )}
          <h3>Last reported incidents</h3>
          {details.length === 0
            ? "Loading"
            : details[0].lastReported
                .slice(0)
                .reverse()
                .map((report, i) => (
                  <div className="LastReported">
                    <h5 className="LastReportedDescription">
                      {" "}
                      <i className="exclamation circle icon"></i> {report.name}
                    </h5>
                    <p>{report.summary}</p>
                  </div>
                ))}
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
          <p>
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
            If you seek a junior front-end developer in your organization, learn
            more about me from here.
            <br></br>
            <br></br>
            The application is in constant development process and new features
            will be implemented in accordance with the user wishes.
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    city: state.citySelector,
    summary: state.incidentsList.summary,
  };
};
export default connect(mapStateToProps)(Mapside);
