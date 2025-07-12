'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FaSpinner, FaCopy, FaExchangeAlt } from 'react-icons/fa';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import QueryProviderWrapper from '../../../components/QueryProviderWrapper';
import { convertFormat } from './actions';

// Dynamic import for Prism renderer - only loads when needed
const CodeHighlight = dynamic(
  () => import('./CodeHighlight'),
  {
    loading: () => (
      <div className="p-4 h-full flex items-center justify-center">
        <FaSpinner className="animate-spin h-6 w-6 text-gray-600" />
      </div>
    ),
    ssr: false,
  }
);

function FormatConverterInner() {
    const [input, setInput] = useState('');
    const [format, setFormat] = useState<'json-to-yaml' | 'yaml-to-json'>('json-to-yaml');
    const [error, setError] = useState<string | null>(null);

    const convertMutation = useMutation({
        mutationFn: () => convertFormat(input, format),
        onError: (error) => {
            setError(error instanceof Error ? error.message : 'Conversion failed');
        },
        onSuccess: () => {
            setError(null);
        },
    });

    const handleConvert = () => {
        if (!input.trim()) {
            setError('Please enter some content to convert');
            return;
        }
        convertMutation.mutate();
    };

    const handleCopy = async () => {
        if (convertMutation.data) {
            await navigator.clipboard.writeText(convertMutation.data);
        }
    };

    return (
        <div className="px-4 py-8 md:px-12">
            <div className={classNames(
                "min-w-4xl mx-auto p-6 rounded-lg",
                "shadow-neumorphism",
                "bg-background"
            )}>
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
                    Format Converter
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-4">
                    {/* Input Section */}
                    <div className="flex-1">
                        <div className="mb-2 flex justify-between items-center">
                            <label htmlFor="input-textarea" className="text-gray-700 dark:text-gray-300">Input</label>
                            <select
                                id="format-select"
                                value={format}
                                onChange={(e) => setFormat(e.target.value as 'json-to-yaml' | 'yaml-to-json')}
                                className={classNames(
                                    "p-2 rounded-lg",
                                    "shadow-neumorphismInput focus:shadow-neumorphismInputActive",
                                    "bg-background",
                                    "text-gray-800 dark:text-gray-200",
                                    "focus:outline-none"
                                )}
                            >
                                <option value="json-to-yaml">JSON → YAML</option>
                                <option value="yaml-to-json">YAML → JSON</option>
                            </select>
                        </div>
                        <textarea
                            id="input-textarea"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={format === 'json-to-yaml' ? 'Paste JSON here' : 'Paste YAML here'}
                            className={classNames(
                                "w-full h-96 p-4 rounded-lg font-mono text-sm",
                                "shadow-neumorphismInput focus:shadow-neumorphismInputActive",
                                "bg-background",
                                "text-gray-800 dark:text-gray-200",
                                "focus:outline-none"
                            )}
                        />
                    </div>

                    {/* Convert Button */}
                    <div className="flex md:flex-col justify-center items-center">
                        <button
                            onClick={handleConvert}
                            disabled={convertMutation.isPending}
                            className={classNames(
                                "p-3 rounded-full",
                                "shadow-neumorphism active:shadow-neumorphismActive",
                                "text-gray-800 dark:text-gray-200 bg-background",
                                "transition-shadow duration-200 ease-in-out",
                                convertMutation.isPending ? 'opacity-50 cursor-not-allowed' : '',
                                "hover:shadow-neumorphismHover"
                            )}
                            aria-label="Convert format"
                        >
                            {convertMutation.isPending ? (
                                <FaSpinner className="animate-spin h-6 w-6" />
                            ) : (
                                <FaExchangeAlt className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Output Section */}
                    <div className="flex-1">
                        <div className="mb-2 flex justify-between items-center">
                            <label htmlFor="output-section" className="text-gray-700 dark:text-gray-300">Output</label>
                            <button
                                onClick={handleCopy}
                                disabled={!convertMutation.data}
                                className={classNames(
                                    "p-2 rounded-lg flex items-center gap-2",
                                    "shadow-neumorphism active:shadow-neumorphismActive",
                                    "text-gray-800 dark:text-gray-200 bg-background",
                                    "transition-shadow duration-200 ease-in-out",
                                    !convertMutation.data ? 'opacity-50 cursor-not-allowed' : '',
                                    "hover:shadow-neumorphismHover"
                                )}
                            >
                                <FaCopy /> Copy
                            </button>
                        </div>
                        <div
                            id="output-section"
                            className={classNames(
                                "w-full h-96 rounded-lg overflow-auto",
                                "shadow-neumorphismInput",
                                "bg-background"
                            )}
                        >
                            {convertMutation.data && (
                                <CodeHighlight
                                    code={convertMutation.data}
                                    language={format === 'json-to-yaml' ? 'yaml' : 'json'}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FormatConverter() {
    return (
        <QueryProviderWrapper>
            <FormatConverterInner />
        </QueryProviderWrapper>
    );
}