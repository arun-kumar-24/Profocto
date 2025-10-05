"use client";

import React from 'react';

/*

Divider Blok Preview Component

- Clean horizontal line for PDF preview
- Different styles and thicknesses
- No content editing needed

*/

const DividerBlokPreview = ({
    blok,
    isSelected = false,
    onSelect
}) => {
    // Get divider style from blok styling
    const getDividerStyle = () => {
        const { styling } = blok;

        // Default style
        let borderClass = 'border-gray-300';
        let thicknessClass = 'border-t';

        // Custom styling if available
        if (styling) {
            // Border thickness based on font weight
            if (styling.fontWeight === 'bold') {
                thicknessClass = 'border-t-2';
            } else if (styling.fontWeight === 'semibold') {
                thicknessClass = 'border-t-2';
            }

            // Color based on text color (reuse for border)
            // This is a simple mapping - could be enhanced
            borderClass = 'border-gray-300';
        }

        return `${thicknessClass} ${borderClass}`;
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

        // Alignment (for centering shorter dividers)
        const alignmentMap = {
            'left': 'ml-0',
            'center': 'mx-auto',
            'right': 'ml-auto'
        };
        classes.push(alignmentMap[layout.alignment] || 'mx-auto');

        return classes.join(' ');
    };

    return (
        <div
            onClick={() => onSelect && onSelect(blok.id)}
            className={`
                py-3 px-2 rounded cursor-pointer transition-colors
                ${isSelected ? 'bg-pink-50 ring-2 ring-pink-300' : 'hover:bg-gray-50'}
            `}
        >
            <hr className={`${getDividerStyle()} ${getLayoutClasses()}`} />
        </div>
    );
};

export default DividerBlokPreview;