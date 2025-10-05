"use client";

import React from 'react';
import TextBlokPreview from './preview/TextBlokPreview';
import HeadingBlokPreview from './preview/HeadingBlokPreview';
import ListBlokPreview from './preview/ListBlokPreview';
import ContactBlokPreview from './preview/ContactBlokPreview';
import DividerBlokPreview from './preview/DividerBlokPreview';
import SpacerBlokPreview from './preview/SpacerBlokPreview';
import ContainerBlokPreview from './preview/ContainerBlokPreview';

/*

Blok Renderer Component

- Routes to correct blok component based on type
- Handles unknown blok types gracefully
- Supports custom blok types for extensibility

*/

const BlokRenderer = ({
    blok,
    isSelected = false,
    onSelect,
    selectedBlokId,
    onBlokSelect,
    mode = 'preview'
}) => {
    // Validate blok object
    if (!blok || !blok.type) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                Invalid blok: Missing type or blok object
            </div>
        );
    }

    // Common props passed to all blok components
    const commonProps = {
        blok,
        isSelected,
        onSelect,
        selectedBlokId,
        onBlokSelect
    };

    // Route to appropriate component based on blok type
    switch (blok.type) {
        case 'text':
            return <TextBlokPreview {...commonProps} />;

        case 'heading':
            return <HeadingBlokPreview {...commonProps} />;

        case 'list':
            return <ListBlokPreview {...commonProps} />;

        case 'contact':
            return <ContactBlokPreview {...commonProps} />;

        case 'divider':
            return <DividerBlokPreview {...commonProps} />;

        case 'spacer':
            return <SpacerBlokPreview {...commonProps} />;

        case 'container':
            return <ContainerBlokPreview {...commonProps} />;

        default:
            // Handle unknown/custom blok types
            return (
                <div
                    onClick={() => onSelect && onSelect(blok.id)}
                    className={`
                        p-4 border-2 border-dashed rounded cursor-pointer transition-colors
                        ${isSelected
                            ? 'bg-yellow-50 border-yellow-300 ring-2 ring-yellow-300'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }
                    `}
                >
                    <div className="text-center">
                        <div className="text-yellow-600 font-medium text-sm mb-1">
                            Unknown Blok Type: "{blok.type}"
                        </div>
                        <div className="text-gray-500 text-xs">
                            This blok type is not supported yet
                        </div>
                        {blok.content && (
                            <div className="mt-2 text-gray-700 text-sm">
                                Content: {JSON.stringify(blok.content).substring(0, 50)}...
                            </div>
                        )}
                    </div>
                </div>
            );
    }
};

export default BlokRenderer;