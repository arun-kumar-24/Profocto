"use client";

import React from 'react';
import RichTextRenderer from '../RichTextRenderer';

/*

Heading Blok Preview Component

- Clean heading display for PDF preview
- Different levels (H1, H2, H3)
- No editing controls

*/

const HeadingBlokPreview = ({
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
                    min-h-[30px] p-2 rounded cursor-pointer transition-colors
                    ${isSelected ? 'bg-pink-50 ring-2 ring-pink-300' : 'hover:bg-gray-50'}
                `}
            >
                <span className="text-gray-400 italic text-lg font-semibold">Click to add heading...</span>
            </div>
        );
    }

    // Get heading level from font size
    const getHeadingLevel = () => {
        const fontSize = blok.styling?.fontSize || 'xl';
        switch (fontSize) {
            case '3xl': return 1;
            case '2xl': return 1;
            case 'xl': return 2;
            case 'lg': return 3;
            default: return 2;
        }
    };

    // Get styling classes
    const getStyleClasses = () => {
        const { styling } = blok;
        if (!styling) return 'text-xl font-bold';

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
        classes.push(fontSizeMap[styling.fontSize] || 'text-xl');

        // Font weight (headings are bold by default)
        const fontWeightMap = {
            'normal': 'font-semibold',
            'medium': 'font-semibold',
            'semibold': 'font-bold',
            'bold': 'font-bold'
        };
        classes.push(fontWeightMap[styling.fontWeight] || 'font-bold');

        // Line height (tighter for headings)
        const lineHeightMap = {
            'sm': 'leading-tight',
            'md': 'leading-snug',
            'lg': 'leading-normal'
        };
        classes.push(lineHeightMap[styling.lineHeight] || 'leading-tight');

        // Text decoration
        if (styling.underline) classes.push('underline');
        if (styling.italic) classes.push('italic');

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

    const headingLevel = getHeadingLevel();
    const HeadingTag = `h${headingLevel}`;

    return (
        <div
            onClick={() => onSelect && onSelect(blok.id)}
            className={`
                p-2 rounded cursor-pointer transition-colors
                ${isSelected ? 'bg-pink-50 ring-2 ring-pink-300' : 'hover:bg-gray-50'}
                ${getLayoutClasses()}
            `}
        >
            <HeadingTag className={`${getStyleClasses()} text-gray-900`}>
                <RichTextRenderer
                    nodes={blok.content}
                    mode="display"
                />
            </HeadingTag>
        </div>
    );
};

export default HeadingBlokPreview;