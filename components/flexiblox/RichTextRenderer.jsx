"use client";

import React from 'react';

/*

Rich Text Renderer for FlexiBlox

- Convert RichTextNode[] to styled JSX
- Support display and PDF modes
- Handle nested formatting

*/

const RichTextRenderer = ({
    nodes,
    className = '',
    mode = 'display'
}) => {
    // Handle empty or invalid nodes
    if (!nodes || !Array.isArray(nodes) || nodes.length === 0) {
        return null;
    }

    // Render individual node
    const renderNode = (node, index) => {
        if (!node || typeof node !== 'object') {
            return null;
        }

        switch (node.type) {
            case 'text':
                return node.text || '';

            case 'bold':
                const boldContent = node.children ?
                    node.children.map((child, childIndex) => renderNode(child, childIndex)) :
                    null;

                return (
                    <span key={index} className={mode === 'pdf' ? 'font-bold' : 'font-bold'}>
                        {boldContent}
                    </span>
                );

            case 'italic':
                const italicContent = node.children ?
                    node.children.map((child, childIndex) => renderNode(child, childIndex)) :
                    null;

                return (
                    <span key={index} className={mode === 'pdf' ? 'italic' : 'italic'}>
                        {italicContent}
                    </span>
                );

            default:
                return null;
        }
    };

    // Render all nodes
    const renderedContent = nodes.map((node, index) => renderNode(node, index));

    // Wrap in appropriate container
    if (mode === 'pdf') {
        return (
            <span className={className}>
                {renderedContent}
            </span>
        );
    }

    return (
        <span className={className}>
            {renderedContent}
        </span>
    );
};

export default RichTextRenderer;