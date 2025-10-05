"use client";

import React from 'react';
import RichTextRenderer from '../RichTextRenderer';

/*

List Blok Preview Component

- Clean list display for PDF preview
- Bullet or numbered lists
- No editing controls

*/

const ListBlokPreview = ({
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
                    min-h-[40px] p-2 rounded cursor-pointer transition-colors
                    ${isSelected ? 'bg-pink-50 ring-2 ring-pink-300' : 'hover:bg-gray-50'}
                `}
            >
                <ul className="list-disc list-inside">
                    <li className="text-gray-400 italic">Click to add list items...</li>
                </ul>
            </div>
        );
    }

    // Get styling classes
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

        return classes.join(' ');
    };

    // Get layout classes
    const getLayoutClasses = () => {
        const { layout } = blok;
        if (!layout) return 'w-full';

        const classes = [];

        // Width
        const widthMap = {
            'full': 'w-full',
            'half': 'w-1/2',
            'third': 'w-1/3',
            'quarter': 'w-1/4'
        };
        classes.push(widthMap[layout.width] || 'w-full');

        return classes.join(' ');
    };

    // Convert content array to list items
    const renderListItems = () => {
        if (!Array.isArray(blok.content)) return null;

        return blok.content.map((item, index) => {
            // Handle both RichTextNode format and simple text
            if (typeof item === 'string') {
                return (
                    <li key={index} className="mb-1">
                        {item}
                    </li>
                );
            }

            // Handle RichTextNode format
            if (item.type === 'text') {
                return (
                    <li key={index} className="mb-1">
                        {item.text}
                    </li>
                );
            }

            // Handle array of RichTextNodes
            if (Array.isArray(item)) {
                return (
                    <li key={index} className="mb-1">
                        <RichTextRenderer
                            nodes={item}
                            mode="display"
                        />
                    </li>
                );
            }

            return null;
        }).filter(Boolean);
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
            <ul className={`list-disc list-inside ${getStyleClasses()} text-gray-900`}>
                {renderListItems()}
            </ul>
        </div>
    );
};

export default ListBlokPreview;