// import { Dropdown } from "semantic-ui-react";
import "../styling/CityDropdown.scss";
import citiesJson from "../data/cities.json";
import City from "../models/city";
import { useActions } from "../hooks/useActions";

const CityDropdown = () => {
  const cities: City[] = citiesJson.cities;
  const { selectCity } = useActions();

  const onSelectedCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectCity(cities.find((city) => city.name === e.target.value));
  };

  return (
    <div className="DropdownWrapper">
      <select name="City" id="city" onChange={onSelectedCity}>
        {cities.map((city) => {
          return (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CityDropdown;
