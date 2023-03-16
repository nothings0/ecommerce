import React from "react";
import { TProvince } from "@/type";
import useFetchAddress from "../Hooks/useFetchAddress";

interface IProps {
  setProvince: (obj: { text: string; code: string }) => void;
}

const SelectProvince: React.FC<IProps> = ({ setProvince }) => {
  const { data } = useFetchAddress<TProvince>("/data/tinh_tp.json");

  return (
    <div className="address-item">
      <label htmlFor="province">Thành phố:</label>
      <select
        id="province"
        required
        onChange={(e) =>
          setProvince({
            code: e.target.value,
            text: e.target.value
              ? e.target.options[e.target.selectedIndex].textContent!
              : "",
          })
        }
      >
        <option value="">Chọn thành phố</option>
        {data &&
          Object.values(data).map((item) => (
            <option value={item.code} key={item.code}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectProvince;
