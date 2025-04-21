import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

interface ToolCardProps {
    imageSrc: string;
    name: string;
    description: string;
    route: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ imageSrc, name, description, route }) => {
    return (
        <Link href={route} className="block no-underline text-inherit">
            <div className={classNames(
                "h-fit",
                "w-full max-w-sm p-4 rounded-lg",
                "shadow-neumorphism hover:shadow-neumorphismHover",
                "bg-white dark:bg-gray-800",
                "transition-shadow duration-200 ease-in-out",
                "cursor-pointer text-center"
            )}>
                <Image 
                    src={imageSrc}
                    alt={name}
                    width={200}
                    height={100} 
                    className="w-full rounded-t-lg mb-4 object-cover"
                />
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">{name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            </div>
        </Link>
    );
};

export default ToolCard;
