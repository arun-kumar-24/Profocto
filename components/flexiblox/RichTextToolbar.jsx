"use client";

import React from 'react';
import { FaBold, FaItalic, FaTimes } from 'react-icons/fa';

/*

Rich Text Toolbar for FlexiBlox

- Dark theme matching repo style
- Bold, italic, clear formatting buttons
- Mobile-friendly touch targets

*/

const RichTextToolbar = ({
    onBold,
    onItalic,
    onClear,
    isBoldActive = false,
    isItalicActive = false
}) => {
    return (
        <div className="flex items-center gap-1 p-2 bg-gray-800 border border-gray-700 rounded-t-lg">
            {/* Bold Button */}
            <button
                type="button"
                onClick={onBold}
                className={`
                    flex items-center justify-center w-8 h-8 rounded transition-colors
                    ${isBoldActive
                        ? 'bg-pink-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                `}
                title="Bold (Ctrl+B)"
                aria-label="Toggle bold formatting"
            >
                <FaBold className="w-3 h-3" />
            </button>

            {/* Italic Button */}
            <button
                type="button"
                onClick={onItalic}
                className={`
                    flex items-center justify-center w-8 h-8 rounded transition-colors
                    ${isItalicActive
                        ? 'bg-pink-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                `}
                title="Italic (Ctrl+I)"
                aria-label="Toggle italic formatting"
            >
                <FaItalic className="w-3 h-3" />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-600 mx-1" />

            {/* Clear Formatting Button */}
            <button
                type="button"
                onClick={onClear}
                className="
                    flex items-center justify-center w-8 h-8 rounded transition-colors
                    text-gray-300 hover:bg-gray-700 hover:text-white
                "
                title="Clear formatting"
                aria-label="Clear all formatting"
            >
                <FaTimes className="w-3 h-3" />
            </button>

            {/* Mobile spacing */}
            <div className="flex-1" />

            {/* Format indicator for mobile */}
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
                {isBoldActive && <span>B</span>}
                {isItalicActive && <span>I</span>}
                {!isBoldActive && !isItalicActive && <span>Plain</span>}
            </div>
        </div>
    );
};

export default RichTextToolbar;