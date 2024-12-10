import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ToolCardProps {
    imageSrc: string;
    name: string;
    description: string;
    route: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ imageSrc, name, description, route }) => {
    return (
        <Link href={route} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '200px', textAlign: 'center', cursor: 'pointer' }}>
                <Image 
                src={imageSrc} 
                alt={name} 
                width={200} 
                height={100} 
                style={{ borderRadius: '8px 8px 0 0' }} 
                />
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </Link>
    );
};

export default ToolCard;
