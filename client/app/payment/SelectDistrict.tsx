import React from "react";
import { TProvince } from "@/type";
import useFetchAddress from "../Hooks/useFetchAddress";

interface IProps {
  setDistrict: (obj: { text: string; code: string }) => void;
  provinceCode: string | undefined;
  value: { text: string; code: string };
}

const SelectDistrict: React.FC<IProps> = ({
  setDistrict,
  provinceCode,
  value,
}) => {
  const { data } = useFetchAddress<TProvince>(
    `/data/quan-huyen/${provinceCode}.json`
  );

  return (
    <div className="address-item">
      <label htmlFor="province">Quận huyện:</label>
      <select
        id="province"
        required
        onChange={(e) =>
          setDistrict({
            code: e.target.value,
            text: e.target.value
              ? e.target.options[e.target.selectedIndex].textContent!
              : "",
          })
        }
      >
        <option value={value.code ? value.code : ""}>
          {value.text ? value.text : "Chọn quận huyện"}
        </option>
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

export default SelectDistrict;
