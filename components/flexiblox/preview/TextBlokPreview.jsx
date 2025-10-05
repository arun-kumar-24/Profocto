"use client";

import React from 'react';
import RichTextRenderer from '../RichTextRenderer';

/*

Text Blok Preview Component

- Clean text display for PDF preview
- No editing controls
- Click to select functionality

*/

const TextBlokPreview = ({
    blok,
    isSelected = false,
    onSelect
}) => {
    // Handle empty content
    if (!blok.content || blok.content.length === 0) {
        return (
            <div
                onClick={() => onSelect && onSelect(blok.id)}
                className={`
                    min-h-[20px] p-2 rounded cursor-pointer transition-colors
                    ${isSelected ? 'bg-pink-50 ring-2 ring-pink-300' : 'hover:bg-gray-50'}
                `}
            >
                <span className="text-gray-400 italic text-sm">Click to add text...</span>
            </div>
        );
    }

    // Get styling classes based on blok styling
    const getStyleClasses = () => {
        const { styling } = blok;
        if (!styling) return 'text-base';

        const classes = [];

        // Font size
        const fontSizeMap = {
            'xs': 'text-xs',
            'sm': 'text-sm',
            'base': 'text-base',
            'lg': 'text-lg',
            'xl': 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl'
        };
        classes.push(fontSizeMap[styling.fontSize] || 'text-base');

        // Font weight
        const fontWeightMap = {
            'normal': 'font-normal',
            'medium': 'font-medium',
            'semibold': 'font-semibold',
            'bold': 'font-bold'
        };
        classes.push(fontWeightMap[styling.fontWeight] || 'font-normal');

        // Line height
        const lineHeightMap = {
            'sm': 'leading-tight',
            'md': 'leading-normal',
            'lg': 'leading-relaxed'
        };
        classes.push(lineHeightMap[styling.lineHeight] || 'leading-normal');

        // Text decoration
        if (styling.underline) classes.push('underline');
        if (styling.italic) classes.push('italic');

        return classes.join(' ');
    };

    // Get layout classes
    const getLayoutClasses = () => {
        const { layout } = blok;
        if (!layout) return '';

        const classes = [];

        // Width
        const widthMap = {
            'full': 'w-full',
            'half': 'w-1/2',
            'third': 'w-1/3',
            'quarter': 'w-1/4'
        };
        classes.push(widthMap[layout.width] || 'w-full');

        // Alignment
        const alignmentMap = {
            'left': 'text-left',
            'center': 'text-center',
            'right': 'text-right',
            'justify': 'text-justify'
        };
        classes.push(alignmentMap[layout.alignment] || 'text-left');

        return classes.join(' ');
    };

    return (
        <div
            onClick={() => onSelect && onSelect(blok.id)}
            className={`
                p-2 rounded cursor-pointer transition-colors
                ${isSelected ? 'bg-pink-50 ring-2 ring-pink-300' : 'hover:bg-gray-50'}
                ${getLayoutClasses()}
            `}
        >
            <RichTextRenderer
                nodes={blok.content}
                className={getStyleClasses()}
                mode="display"
            />
        </div>
    );
};

export default TextBlokPreview;