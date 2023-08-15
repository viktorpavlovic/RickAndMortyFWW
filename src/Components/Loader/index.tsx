import React from "react";
import { Alert, Spin } from "antd";

const Loader: React.FC = () => (
  <>
    <Alert
      message="Loading..."
      description="Further details about the context of this alert."
    />
    <Spin></Spin>
  </>
);

export default Loader;
