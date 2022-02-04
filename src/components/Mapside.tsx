import { useEffect, useState } from "react";
import "../styling/Mapside.scss";
import CityDropdown from "./CityDropdown";
import Summary from "../models/Summary";
import About from "./About";
import { Circles, Rings } from "react-loader-spinner";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Mapside = () => {
  const [collapse, setCollapse] = useState(false);
  const [section, setSection] = useState("Overview");
  const [details, setDetails] = useState<Summary[]>([]);

  const city = useTypedSelector((state) => state.citySelector);
  const incidentsSumRedux = useTypedSelector(
    (state) => state.incidentsList.summary
  );

  const handleCollapse = () => {
    collapse === false ? setCollapse(true) : setCollapse(false);
  };

  const handleSectionChange = (x: string, y: string) => {
    section === x && setSection(y);
  };

  const getDetailsOnCity = (city: string) => {
    return incidentsSumRedux.filter(
      (incident: any) => incident.city === city && incident
    );
  };

  useEffect(() => {
    if (incidentsSumRedux !== undefined && incidentsSumRedux.length > 0) {
      setDetails(getDetailsOnCity(city.name.toLowerCase()));
    } else if (details.length < 0) {
    }
  }, [city.name, incidentsSumRedux.length]);

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
          <h3> Common incidents in {city.name} county </h3>
          {details.length === 0 ? (
            <Rings color="#f95738" height={40} width={40} />
          ) : (
            details[0].incidentSum.map((incident, i) => (
              <div className="numberedlist">
                <h4>
                  {" "}
                  {i + 1}-{incident.incidentType} ({incident.numberOfIncidents}){" "}
                </h4>
              </div>
            ))
          )}

          <h3>Top 5 incident reporting municipalities </h3>

          {details.length === 0 ? (
            <Rings color="#f95738" height={40} width={40} />
          ) : (
            details[0].topReportingCities.slice(0, 5).map((incident, i) => (
              <div className="numberedlist">
                <h4>
                  {" "}
                  {i + 1}-{incident.city} ({incident.numberOfIncidents}){" "}
                </h4>
              </div>
            ))
          )}

          <h3>Number of incidents per 100.000 people</h3>
          {details.length === 0 ? (
            <Rings color="#f95738" height={40} width={40} />
          ) : (
            <div className="PerPeople">
              <h4>{details[0].incidentsPer}</h4>
            </div>
          )}
          <h3>Last reported incidents</h3>
          {details.length === 0 ? (
            <Rings color="#f95738" height={40} width={40} />
          ) : (
            details[0].lastReported
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
              ))
          )}
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
