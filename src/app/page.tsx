import React from "react";
import { InteractiveBlock } from "../components/generic/InteractiveBlock";
import classNames from "classnames";
import About from "../pages/about";


export default function Page() {
  return (
    <div className="px-12 py-8">
      <div className="flex flex-row">
        <div className="basis-1/2">
          <h2 className="text-3xl font-bold mb-2">Full Stack Developer</h2>
          <h1 className="text-8xl font-bold mb-4 uppercase">Taranjit Singh</h1>
          <div className="mt-10">
            <button className={classNames("btn btn-primary p-2 rounded-lg ",
              "shadow-neumorphism active:shadow-neumorphismActive", "font-sans")}>
              Learn More About Me
            </button>
          </div>
        </div>
        <div className="basis-1/2">
          <InteractiveBlock />
        </div>
      </div>
      <div className="flex flex-row" id="about">
        <div className="basis-1/2">
          <About />
        </div>
        <div className="basis-1/2">
          {/* <Skills /> */}
        </div>
      </div>
    </div >
  );
}
