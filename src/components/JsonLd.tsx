interface JsonLdProps {
    data: {
        '@context': string;
        '@type': string;
        [key: string]: any;
    };
}

// While dangerouslySetInnerHTML is generally discouraged, it's a valid use case for JSON-LD
// as we need to inject valid JSON data for search engines to parse
export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}