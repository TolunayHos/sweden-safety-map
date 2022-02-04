import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Summary from "../models/Summary";
import { Circles, Rings } from "react-loader-spinner";

const CountyStats = () => {
  const [details, setDetails] = useState<Summary[]>([]);
  const city = useTypedSelector((state) => state.citySelector);
  const incidentsSumRedux = useTypedSelector(
    (state) => state.incidentsList.summary
  );

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

  console.log(details);

  return (
    <div className="CountyStats">
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
    </div>
  );
};

export default CountyStats;
