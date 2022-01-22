// import { Dropdown } from "semantic-ui-react";
import "../styling/CityDropdown.scss";
import citiesJson from "../data/cities.json";
import city from "../models/city";
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";
import { selectCity } from "../actions";
import { PropsWithChildren, PropsWithoutRef } from "react";
import City from "../models/city";

interface ReduxProps {
  selectCity: any;
}

const CityDropdown = (props: ReduxProps) => {
  const cities: city[] = citiesJson.cities;
  const selectCity = props.selectCity;

  const onSelectedCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    selectCity(e.target.value);
  };

  console.log(props);

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
const mapStateToProps = (state: RootStateOrAny) => {
  return {
    city: state.citySelector,
  };
};
export default connect(mapStateToProps, { selectCity })(CityDropdown);
