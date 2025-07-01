import React from "react";
import { Spinner } from "./Spinner";

const SpinnerGlobal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/10  z-50">
      <Spinner size={"large"} />
    </div>
  );
};

export default SpinnerGlobal;
