import React from "react";
import "./select.scss";
import { Select } from "antd";

interface StatusSelectProps {
  statusSearch: (value: string) => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ statusSearch }) => {
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    statusSearch(value.value);
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
