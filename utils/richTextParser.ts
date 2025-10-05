import { RichTextNode } from '../app/types/flexiblox';

/*

Rich Text Parser for FlexiBlox

- Convert between string <-> RichTextNode[]
- Handle bold, italic formatting
- Support nested formatting

*/

// Convert string with markdown-like syntax to RichTextNode[]

export function parseStringToRichText(text: string): RichTextNode[] {
    if (!text || text.trim() === '') {
        return [];
    }

    const nodes: RichTextNode[] = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
        // Check for bold formatting **text**
        const boldMatch = text.slice(currentIndex).match(/^\*\*(.*?)\*\*/);
        if (boldMatch) {
            const boldText = boldMatch[1];
            if (boldText) {
                nodes.push({
                    type: 'bold',
                    children: parseStringToRichText(boldText)
                });
            }
            currentIndex += boldMatch[0].length;
            continue;
        }

        // Check for italic formatting *text*
        const italicMatch = text.slice(currentIndex).match(/^\*(.*?)\*/);
        if (italicMatch) {
            const italicText = italicMatch[1];
            if (italicText) {
                nodes.push({
                    type: 'italic',
                    children: parseStringToRichText(italicText)
                });
            }
            currentIndex += italicMatch[0].length;
            continue;
        }

        // Regular text - find next formatting or end
        const remainingText = text.slice(currentIndex);
        const nextFormatMatch = remainingText.match(/(\*\*|\*)/);

        if (nextFormatMatch) {
            const plainText = remainingText.slice(0, nextFormatMatch.index);
            if (plainText) {
                nodes.push({
                    type: 'text',
                    text: plainText
                });
            }
            currentIndex += plainText.length;
        } else {
            // No more formatting, add rest as plain text
            nodes.push({
                type: 'text',
                text: remainingText
            });
            break;
        }
    }

    return nodes;
}

// Convert RichTextNode[] back to string with markdown

export function richTextToString(nodes: RichTextNode[]): string {
    if (!nodes || nodes.length === 0) {
        return '';
    }

    return nodes.map(node => {
        switch (node.type) {
            case 'text':
                return node.text || '';

            case 'bold':
                const boldContent = node.children ? richTextToString(node.children) : '';
                return `**${boldContent}**`;

            case 'italic':
                const italicContent = node.children ? richTextToString(node.children) : '';
                return `*${italicContent}*`;

            default:
                return '';
        }
    }).join('');
}

// Convert RichTextNode[] to plain text (no formatting)

export function richTextToPlainText(nodes: RichTextNode[]): string {
    if (!nodes || nodes.length === 0) {
        return '';
    }

    return nodes.map(node => {
        switch (node.type) {
            case 'text':
                return node.text || '';

            case 'bold':
            case 'italic':
                return node.children ? richTextToPlainText(node.children) : '';

            default:
                return '';
        }
    }).join('');
}

// Create simple text content from string

export function createTextContent(text: string): RichTextNode[] {
    return [{ type: 'text', text }];
}

// Check if RichTextNode[] is empty or just whitespace

export function isEmptyRichText(nodes: RichTextNode[]): boolean {
    if (!nodes || nodes.length === 0) {
        return true;
    }

    const plainText = richTextToPlainText(nodes);
    return plainText.trim() === '';
}

// Merge consecutive text nodes for optimization

export function optimizeRichText(nodes: RichTextNode[]): RichTextNode[] {
    if (!nodes || nodes.length === 0) {
        return [];
    }

    const optimized: RichTextNode[] = [];
    let currentTextContent = '';

    for (const node of nodes) {
        if (node.type === 'text') {
            currentTextContent += node.text || '';
        } else {
            // Add accumulated text if any
            if (currentTextContent) {
                optimized.push({ type: 'text', text: currentTextContent });
                currentTextContent = '';
            }

            // Add formatted node with optimized children
            if (node.children) {
                optimized.push({
                    ...node,
                    children: optimizeRichText(node.children)
                });
            } else {
                optimized.push(node);
            }
        }
    }

    // Add remaining text
    if (currentTextContent) {
        optimized.push({ type: 'text', text: currentTextContent });
    }

    return optimized;
}

// Validate RichTextNode[] structure

export function validateRichText(nodes: RichTextNode[]): boolean {
    if (!Array.isArray(nodes)) {
        return false;
    }

    for (const node of nodes) {
        if (!node || typeof node !== 'object') {
            return false;
        }

        if (!['text', 'bold', 'italic'].includes(node.type)) {
            return false;
        }

        if (node.type === 'text') {
            if (typeof node.text !== 'string') {
                return false;
            }
        } else {
            if (!Array.isArray(node.children)) {
                return false;
            }
            if (!validateRichText(node.children)) {
                return false;
            }
        }
    }

    return true;
}