"use client";

import React from 'react';
import BlokRenderer from '../BlokRenderer';

/*

Container Blok Preview Component

- Clean container layout for PDF preview
- Grid/flex layout system
- Recursive rendering of child bloks

*/

const ContainerBlokPreview = ({
    blok,
    isSelected = false,
    onSelect,
    selectedBlokId,
    onBlokSelect
}) => {
    // Handle empty container
    if (!blok.children || blok.children.length === 0) {
        return (
            <div
                onClick={() => onSelect && onSelect(blok.id)}
                className={`
                    min-h-[60px] p-4 rounded border-2 border-dashed cursor-pointer transition-colors
                    ${isSelected
                        ? 'bg-pink-50 border-pink-300 ring-2 ring-pink-300'
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }
                `}
            >
                <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400 italic text-sm">Empty container - drag bloks here</span>
                </div>
            </div>
        );
    }

    // Get layout classes for container
    const getContainerClasses = () => {
        const { layout } = blok;
        if (!layout) return 'grid grid-cols-1 gap-4';

        const classes = ['grid'];

        // Columns
        const columns = layout.columns || 1;
        const columnMap = {
            1: 'grid-cols-1',
            2: 'grid-cols-2',
            3: 'grid-cols-3',
            4: 'grid-cols-4'
        };
        classes.push(columnMap[columns] || 'grid-cols-1');

        // Gap
        const gapMap = {
            'none': 'gap-0',
            'sm': 'gap-2',
            'md': 'gap-4',
            'lg': 'gap-6'
        };
        classes.push(gapMap[layout.gap] || 'gap-4');

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

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onSelect && onSelect(blok.id);
            }}
            className={`
                p-2 rounded cursor-pointer transition-colors
                ${isSelected ? 'bg-pink-50 ring-2 ring-pink-300' : 'hover:bg-gray-50'}
            `}
        >
            <div className={getContainerClasses()}>
                {blok.children.map((childBlok) => (
                    <BlokRenderer
                        key={childBlok.id}
                        blok={childBlok}
                        isSelected={selectedBlokId === childBlok.id}
                        onSelect={onBlokSelect}
                        selectedBlokId={selectedBlokId}
                        onBlokSelect={onBlokSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContainerBlokPreview;