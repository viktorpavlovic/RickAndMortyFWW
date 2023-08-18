import React from "react";
import "./gender-select.scss";
import { Select } from "antd";

interface GenderSelectProps {
  onSearch: (value: string) => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ onSearch }) => {
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    onSearch(value.value);
  };

  return (
    <div className="div-gender-select">
    <Select
      labelInValue
      defaultValue={{ value: "gender", label: "gender" }}
      onChange={handleChange}
      style={{ width: 236 }}
      options={[
        { value: "male", label: "male" },
        { value: "female", label: "female" },
        { value: "genderless", label: "genderless" },
        { value: "unknown", label: "unknown" },
      ]}
    />
    </div>
  );
};

export default GenderSelect;
