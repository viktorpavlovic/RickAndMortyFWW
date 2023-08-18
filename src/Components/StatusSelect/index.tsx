import React from "react";
import "./select.scss";
import { Select } from "antd";

interface StatusSelectProps {
  onSearch: (value: string) => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ onSearch }) => {
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    onSearch(value.value);
  };
  return (
    <div className="div-status-select">
      <Select
        labelInValue
        defaultValue={{ value: "status", label: "status" }}
        style={{ width: 236 }}
        onChange={handleChange}
        options={[
          {
            value: "alive",
            label: "alive",
          },
          {
            value: "dead",
            label: "dead",
          },
          {
            value: "unknown",
            label: "unknown",
          },
        ]}
      />
    </div>
  );
};

export default StatusSelect;
