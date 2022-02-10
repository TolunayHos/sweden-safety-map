import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Incident } from "../map/leaflet";

const LastReportedPage = (props: any) => {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const [indexedIncidents, setindexedIncidents] = useState([] as Incident[]);

  const incidentsRedux = useTypedSelector(
    (state) => state.incidentsList.incidents
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearch(value);
  };

  const searchIncidents = (keyword: string) => {
    indexedIncidents.splice(0, indexedIncidents.length);
    for (let i = 0; i < incidentsRedux.length; i++) {
      if (
        incidentsRedux[i].description
          .toLowerCase()
          .includes(keyword.toLowerCase())
      ) {
        indexedIncidents.push(incidentsRedux[i]);
      }
    }
  };

  return (
    <div className="LastReportedPageWrapper">
      <i
        className="chevron circle left icon "
        onClick={() => props.handleExpand(false)}
        style={{ color: "#f95738", fontSize: "1.1rem" }}
      >
        <span>BACK</span>
      </i>
      <div className="inputAreaContainer">
        <h4>Search among all incidents based on keyword</h4>
        <form onSubmit={handleSubmit}>
          <div className="inputArea">
            <input
              placeholder="Kista"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <button type="submit" onClick={() => searchIncidents(value)}>
              <i className="search icon"></i>
            </button>
          </div>
        </form>
      </div>
      <p>
        {indexedIncidents.length > 0
          ? `Indexing ${indexedIncidents.length} results`
          : `Search among ${incidentsRedux.length} incidents`}
      </p>
      <div className="LastReportedContainer">
        {indexedIncidents.length > 0 ? (
          <div>
            {" "}
            {indexedIncidents.map((incident: any) => (
              <div className="LastReported">
                <h5 className="LastReportedDescription">
                  {" "}
                  <i className="exclamation circle icon"></i> {incident.time},{" "}
                  {incident.city}, {incident.type}
                </h5>
                <p>{incident.description}</p>
              </div>
            ))}{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default LastReportedPage;
