import classNames from "classnames";
import React from "react";
import Link from 'next/link';
import ToolCard from '../components/ToolCard';
import { ROUTES } from '../config/routes';

export default function Page() {
	return (
		<div className="px-4 py-8 md:px-12">
			<div className="flex flex-col-reverse md:flex-row-reverse">
				<div className="w-full md:w-1/2">
				</div>
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
							"font-sans bg-",
						)}
					>
						Learn More About Me
					</button>
				</div>
			</div>
			<div style={{ marginTop: '40px' }}>
                <h2>Tools</h2>
                <ToolCard 
                    imageSrc="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/screenshot-512.png" 
                    name="URL to Image" 
                    description="Convert a URL to an image" 
                    route={ROUTES.URL_TO_SCREENSHOT} 
                />
            </div>
		</div>
	);
}
