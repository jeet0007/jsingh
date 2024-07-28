import React from "react";
import { InteractiveBlock } from "../components/generic/InteractiveBlock";

export default function Page() {
  return (
    <div className="px-12 py-8">
      <div className="flex flex-row">
        <div className="basis-1/2">
          <h1> Taranjit Singh</h1>
        </div>
        <div className="basis-1/2">
          <InteractiveBlock />
        </div>
      </div>
    </div>
  );
}
