import React from "react";
import { TProvince } from "@/type";
import useFetchAddress from "../Hooks/useFetchAddress";

interface IProps {
  setWard: (obj: { text: string; code: string }) => void;
  districtCode: string | undefined;
  value: { text: string; code: string };
}

const SelectWard: React.FC<IProps> = ({ setWard, districtCode, value }) => {
  const { data } = useFetchAddress<TProvince>(
    `/data/xa-phuong/${districtCode}.json`
  );

  return (
    <div className="address-item">
      <label htmlFor="province">Phường xã:</label>
      <select
        id="province"
        required
        onChange={(e) =>
          setWard({
            code: e.target.value,
            text: e.target.value
              ? e.target.options[e.target.selectedIndex].textContent!
              : "",
          })
        }
      >
        <option value={value.code ? value.code : ""}>
          {value.text ? value.text : "Chọn phường xã"}
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

export default SelectWard;
