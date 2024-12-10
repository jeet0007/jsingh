'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Form from 'next/form';
import { generateScreenshot } from './actions';

export default function UrlToScreenshot() {
    const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

    const screenshotMutation = useMutation({
        mutationFn: (url: string) => generateScreenshot(url),
        onSuccess: (blob) => {
            const imageUrl = URL.createObjectURL(blob);
            setScreenshotUrl(imageUrl);
        },
        onError: (error) => {
            console.error('Screenshot generation error:', error);
        }
    });

    const handleSubmit = async (formData: FormData) => {
        const url = formData.get('url') as string;
        screenshotMutation.mutate(url);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
                URL to Screenshot
            </h1>
            
            <Form action={handleSubmit} className="mb-6">
                <div className="flex space-x-2">
                    <input 
                        type="text" 
                        name="url" 
                        placeholder="Enter URL to screenshot" 
                        required 
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                    />
                    <button 
                        type="submit"
                        disabled={screenshotMutation.isPending}
                        className={`px-4 py-2 rounded-md text-white transition-colors duration-300 ${
                            screenshotMutation.isPending 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        }`}
                    >
                        {screenshotMutation.isPending ? 'Generating...' : 'Generate Screenshot'}
                    </button>
                </div>
            </Form>

            {screenshotMutation.isError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">
                        {screenshotMutation.error instanceof Error 
                            ? screenshotMutation.error.message 
                            : 'An unexpected error occurred'}
                    </span>
                </div>
            )}

            {screenshotMutation.isPending && (
                <div className="flex justify-center items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <svg 
                        className="animate-spin h-5 w-5" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                    >
                        <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                        ></circle>
                        <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span>Loading screenshot...</span>
                </div>
            )}

            {screenshotUrl && (
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Generated Screenshot:
                        </h2>
                        <button 
                            onClick={() => {
                                if (screenshotUrl) {
                                    const link = document.createElement('a');
                                    link.href = screenshotUrl;
                                    link.download = `screenshot_${new Date().toISOString().replace(/:/g, '-')}.png`;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }
                            }}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            <span>Download</span>
                        </button>
                    </div>
                    <div className="relative w-full h-[400px] border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                        <Image 
                            src={screenshotUrl} 
                            alt="Website Screenshot" 
                            fill
                            onLoadingComplete={() => {
                                // Revoke object URL to free up memory
                                URL.revokeObjectURL(screenshotUrl);
                            }}
                            className="object-contain" 
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
