"use client";

import React from 'react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { CgWebsite } from 'react-icons/cg';

/*

Contact Blok Preview Component

- Clean contact display for PDF preview
- Different contact types with icons
- Clickable links where appropriate

*/

const ContactBlokPreview = ({
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
                    min-h-[24px] p-2 rounded cursor-pointer transition-colors flex items-center gap-2
                    ${isSelected ? 'bg-pink-50 ring-2 ring-pink-300' : 'hover:bg-gray-50'}
                `}
            >
                <MdEmail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 italic text-sm">Click to add contact info...</span>
            </div>
        );
    }

    // Get contact type from blok metadata or infer from content
    const getContactType = () => {
        if (blok.contactType) return blok.contactType;

        // Infer from content
        const text = getContactText();
        if (text.includes('@')) return 'email';
        if (text.includes('+') || /\d{3}/.test(text)) return 'phone';
        if (text.includes('www.') || text.includes('http')) return 'website';
        return 'address';
    };

    // Get contact text from RichTextNode[]
    const getContactText = () => {
        if (!blok.content || blok.content.length === 0) return '';

        // Handle RichTextNode format
        if (blok.content[0]?.type === 'text') {
            return blok.content[0].text || '';
        }

        // Handle simple string (fallback)
        if (typeof blok.content[0] === 'string') {
            return blok.content[0];
        }

        return '';
    };

    // Get appropriate icon
    const getIcon = () => {
        const contactType = getContactType();
        const iconProps = { className: "w-4 h-4 text-gray-600 flex-shrink-0" };

        switch (contactType) {
            case 'email':
                return <MdEmail {...iconProps} />;
            case 'phone':
                return <MdPhone {...iconProps} />;
            case 'website':
                return <CgWebsite {...iconProps} />;
            case 'address':
            default:
                return <MdLocationOn {...iconProps} />;
        }
    };

    // Get clickable link if applicable
    const getLink = () => {
        const contactType = getContactType();
        const text = getContactText();

        switch (contactType) {
            case 'email':
                return `mailto:${text}`;
            case 'phone':
                return `tel:${text}`;
            case 'website':
                return text.startsWith('http') ? text : `https://${text}`;
            default:
                return null;
        }
    };

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
            'left': 'justify-start',
            'center': 'justify-center',
            'right': 'justify-end'
        };
        classes.push(alignmentMap[layout.alignment] || 'justify-start');

        return classes.join(' ');
    };

    const contactText = getContactText();
    const link = getLink();
    const icon = getIcon();

    const contactContent = (
        <div className={`flex items-center gap-2 ${getLayoutClasses()}`}>
            {icon}
            <span className={`${getStyleClasses()} text-gray-900`}>
                {contactText}
            </span>
        </div>
    );

    return (
        <div
            onClick={() => onSelect && onSelect(blok.id)}
            className={`
                p-2 rounded cursor-pointer transition-colors
                ${isSelected ? 'bg-pink-50 ring-2 ring-pink-300' : 'hover:bg-gray-50'}
            `}
        >
            {link ? (
                <a
                    href={link}
                    className="hover:text-blue-600 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                >
                    {contactContent}
                </a>
            ) : (
                contactContent
            )}
        </div>
    );
};

export default ContactBlokPreview;