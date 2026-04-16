'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { FaArrowLeft, FaCopy, FaExchangeAlt, FaSpinner } from 'react-icons/fa';
import QueryProviderWrapper from '../../../components/QueryProviderWrapper';
import { convertFormat } from './actions';

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
    const inputLabelId = useId();
    const formatSelectId = useId();
    const outputId = useId();

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
        <div className="min-h-screen px-4 py-8 md:px-12">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/"
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-8 transition-colors w-fit"
                >
                    <FaArrowLeft className="w-3 h-3" /> Home
                </Link>

                <h1 className="text-4xl font-bold text-gray-800 mb-2">Format Converter</h1>
                <p className="text-gray-500 mb-8">Convert between JSON and YAML formats instantly</p>

                {error && (
                    <div className="mb-6 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-4">
                    {/* Input Section */}
                    <div className="flex-1">
                        <div className="mb-2 flex justify-between items-center">
                            <label htmlFor={inputLabelId} className="text-sm font-medium text-gray-600">Input</label>
                            <select
                                id={formatSelectId}
                                value={format}
                                onChange={(e) => setFormat(e.target.value as 'json-to-yaml' | 'yaml-to-json')}
                                className={classNames(
                                    "p-2 rounded-lg text-sm",
                                    "shadow-neumorphismInput focus:shadow-neumorphismInputActive",
                                    "bg-background",
                                    "text-gray-800",
                                    "focus:outline-none"
                                )}
                            >
                                <option value="json-to-yaml">JSON → YAML</option>
                                <option value="yaml-to-json">YAML → JSON</option>
                            </select>
                        </div>
                        <textarea
                            id={inputLabelId}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={format === 'json-to-yaml' ? 'Paste JSON here' : 'Paste YAML here'}
                            className={classNames(
                                "w-full h-96 p-4 rounded-lg font-mono text-sm",
                                "shadow-neumorphismInput focus:shadow-neumorphismInputActive",
                                "bg-background",
                                "text-gray-800",
                                "focus:outline-none resize-none"
                            )}
                        />
                    </div>

                    {/* Convert Button */}
                    <div className="flex md:flex-col justify-center items-center">
                        <button
                            type="button"
                            onClick={handleConvert}
                            disabled={convertMutation.isPending}
                            className={classNames(
                                "p-3 rounded-full",
                                "shadow-neumorphism active:shadow-neumorphismActive hover:shadow-neumorphismHover",
                                "text-gray-800 bg-background",
                                "transition-shadow duration-200 ease-in-out",
                                convertMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
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
                            <span id={outputId} className="text-sm font-medium text-gray-600">Output</span>
                            <button
                                type="button"
                                onClick={handleCopy}
                                disabled={!convertMutation.data}
                                className={classNames(
                                    "p-2 rounded-lg flex items-center gap-2 text-sm",
                                    "shadow-neumorphism active:shadow-neumorphismActive hover:shadow-neumorphismHover",
                                    "text-gray-800 bg-background",
                                    "transition-shadow duration-200 ease-in-out",
                                    !convertMutation.data ? 'opacity-50 cursor-not-allowed' : ''
                                )}
                            >
                                <FaCopy className="w-3 h-3" /> Copy
                            </button>
                        </div>
                        <div
                            aria-labelledby={outputId}
                            role="region"
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
