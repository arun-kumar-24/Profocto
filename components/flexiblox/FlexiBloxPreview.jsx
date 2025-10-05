"use client";

import React, { useState } from 'react';
import BlokRenderer from './BlokRenderer';

/*

FlexiBlox Preview Component

- Clean PDF preview area (right panel)
- A4 paper simulation
- Click to select bloks
- No editing controls

*/

const FlexiBloxPreview = ({
    bloks = [],
    selectedBlokId,
    onBlokSelect
}) => {
    // Handle empty bloks array
    if (!bloks || bloks.length === 0) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Resume</h3>
                    <p className="text-gray-600 mb-4">
                        Drag bloks from the library on the left to create your custom resume layout.
                    </p>
                    <div className="text-sm text-gray-500">
                        <p>💡 Try adding a <strong>Heading</strong> blok for your name first!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-gray-100 overflow-y-auto">
            {/* Preview Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-3 z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Resume Preview</h2>
                        <p className="text-sm text-gray-600">{bloks.length} bloks</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                            Zoom Fit
                        </button>
                        <button className="px-3 py-1 text-xs bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200 transition-colors">
                            Export PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* A4 Paper Preview */}
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    {/* A4 Paper Container */}
                    <div
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                        style={{
                            width: '210mm',
                            minHeight: '297mm',
                            maxWidth: '100%',
                            margin: '0 auto'
                        }}
                    >
                        {/* Paper Content */}
                        <div className="p-8 space-y-1">
                            {bloks.map((blok) => (
                                <BlokRenderer
                                    key={blok.id}
                                    blok={blok}
                                    isSelected={selectedBlokId === blok.id}
                                    onSelect={onBlokSelect}
                                    selectedBlokId={selectedBlokId}
                                    onBlokSelect={onBlokSelect}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Paper Shadow/Footer */}
                    <div className="text-center mt-4 text-xs text-gray-500">
                        A4 Size Preview • {bloks.length} Bloks
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlexiBloxPreview;