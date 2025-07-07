import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

interface ToolCardProps {
    imageSrc?: string;
    icon?: React.ComponentType<{ className?: string; size?: number }>;
    name: string;
    description: string;
    route: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ imageSrc, icon: Icon, name, description, route }) => {
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
                <div className="flex justify-center mb-4">
                    {Icon ? (
                        <Icon 
                            className="text-gray-600 dark:text-gray-400" 
                            size={80} 
                        />
                    ) : imageSrc ? (
                        <Image 
                            src={imageSrc}
                            alt={name}
                            width={80}
                            height={80} 
                            className="object-contain"
                        />
                    ) : null}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">{name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            </div>
        </Link>
    );
};

export default ToolCard;
