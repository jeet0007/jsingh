import classNames from "classnames";
import React from "react";
import ToolCard from "../components/ToolCard";
import { ROUTES } from "../config/routes";
import { FaPlay } from "react-icons/fa";

export default function Page() {
	return (
    <div className="px-4 py-8 md:px-12">
      <div className="flex flex-col-reverse md:flex-row-reverse">
        <div className="w-full md:w-1/2"></div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Full Stack Developer
          </h2>
          <h1 className="text-5xl md:text-8xl font-bold mb-4 uppercase">
            Taranjit Singh
          </h1>
          <button
            type="button"
            className={classNames(
              "btn btn-primary p-2 rounded-lg",
              "shadow-neumorphism active:shadow-neumorphismActive",
              "font-sans bg-"
            )}
          >
            Learn More About Me
          </button>
        </div>
      </div>
      <div className="mt-10 text-center md:text-left grid sm:justify-center ">
        <h2 className="text-2xl font-bold mb-6">Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          <ToolCard
            imageSrc="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/screenshot-512.png"
            name="URL to Image"
            description="Convert a URL to an image"
            route={ROUTES.URL_TO_SCREENSHOT}
          />
          <ToolCard
            imageSrc="https://cdn0.iconfinder.com/data/icons/video-edit-tools/32/transition_conversion_convert_transfer_motion_split_slide-512.png"
            name="Format Converter"
            description="Convert between JSON and YAML formats"
            route={ROUTES.FORMAT_CONVERTER}
          />
          <ToolCard
            icon={FaPlay}
            name="HLS Player"
            description="Stream HLS videos with episode tracking"
            route={ROUTES.HLS_PLAYER}
          />
        </div>
      </div>
    </div>
  );
}
