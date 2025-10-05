"use client";

import React from 'react';

/*

Spacer Blok Preview Component

- Clean vertical spacing for PDF preview
- Different spacing sizes
- Visual indicator in edit mode only

*/

const SpacerBlokPreview = ({
    blok,
    isSelected = false,
    onSelect
}) => {
    // Get spacing size from layout gap
    const getSpacingHeight = () => {
        const { layout } = blok;
        const gap = layout?.gap || 'md';

        const heightMap = {
            'none': 'h-0',
            'sm': 'h-2',
            'md': 'h-4',
            'lg': 'h-8'
        };

        return heightMap[gap] || 'h-4';
    };

    // Get spacing label for display
    const getSpacingLabel = () => {
        const { layout } = blok;
        const gap = layout?.gap || 'md';

        const labelMap = {
            'none': 'No Space',
            'sm': 'Small Space',
            'md': 'Medium Space',
            'lg': 'Large Space'
        };

        return labelMap[gap] || 'Medium Space';
    };

    const spacingHeight = getSpacingHeight();
    const spacingLabel = getSpacingLabel();

    return (
        <div
            onClick={() => onSelect && onSelect(blok.id)}
            className={`
                relative cursor-pointer transition-colors
                ${isSelected ? 'bg-pink-50 ring-2 ring-pink-300 rounded' : 'hover:bg-gray-50 rounded'}
                ${spacingHeight}
            `}
        >
            {/* Visual indicator when selected or hovered */}
            {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-pink-200 text-pink-800 px-2 py-1 rounded text-xs font-medium border border-dashed border-pink-400">
                        {spacingLabel}
                    </div>
                </div>
            )}

            {/* Invisible spacer content */}
            <div className={spacingHeight} />
        </div>
    );
};

export default SpacerBlokPreview;