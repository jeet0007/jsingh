import classNames from "classnames";
import React from "react";
import { InteractiveBlock } from "../components/generic/InteractiveBlock";
import About from "../pages/about";

export default function Page() {
	return (
		<div className="px-4 py-8 md:px-12">
			<div className="flex flex-col-reverse md:flex-row-reverse">
				<div className="w-full md:w-1/2">
					<InteractiveBlock />
				</div>
				<div className="w-full md:w-1/2 text-center md:text-left">
					<h2 className="text-2xl md:text-3xl font-bold mb-2">
						Full Stack Developer
					</h2>
					<h1 className="text-5xl md:text-8xl font-bold mb-4 uppercase">
						Taranjit Singh
					</h1>
					<button
						className={classNames(
							"btn btn-primary p-2 rounded-lg",
							"shadow-neumorphism active:shadow-neumorphismActive",
							"font-sans bg-",
						)}
					>
						Learn More About Me
					</button>
				</div>
			</div>
			<div className="flex flex-col md:flex-row mt-8" id="about">
				<div className="w-full md:w-1/2">
					<About />
				</div>
			</div>
		</div>
	);
}
