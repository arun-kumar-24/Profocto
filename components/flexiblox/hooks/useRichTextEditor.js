"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { parseStringToRichText, richTextToString, richTextToPlainText } from '../../../utils/richTextParser';

/*

Rich Text Editor Hook

- Handle editor state and logic
- Manage selection and formatting
- Keyboard shortcuts support

*/

export const useRichTextEditor = (initialValue = [], onChange) => {
    const [nodes, setNodes] = useState(initialValue);
    const [selection, setSelection] = useState(null);
    const editorRef = useRef(null);

    // Update nodes and notify parent
    const updateNodes = useCallback((newNodes) => {
        setNodes(newNodes);
        if (onChange) {
            onChange(newNodes);
        }
    }, [onChange]);

    // Get current selection info
    const getCurrentSelection = useCallback(() => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return null;

        const range = selection.getRangeAt(0);
        const editorElement = editorRef.current;

        if (!editorElement || !editorElement.contains(range.commonAncestorContainer)) {
            return null;
        }

        return {
            text: selection.toString(),
            range: range,
            isEmpty: selection.isCollapsed
        };
    }, []);

    // Check if selection has formatting
    const getSelectionFormatting = useCallback(() => {
        const selection = getCurrentSelection();
        if (!selection) return { bold: false, italic: false };

        const range = selection.range;
        let element = range.commonAncestorContainer;

        // If text node, get parent element
        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentElement;
        }

        const isBold = element.closest('.font-bold') !== null;
        const isItalic = element.closest('.italic') !== null;

        return { bold: isBold, italic: isItalic };
    }, [getCurrentSelection]);

    // Apply formatting to selection
    const applyFormatting = useCallback((formatType) => {
        const selection = getCurrentSelection();
        if (!selection || selection.isEmpty) return;

        const selectedText = selection.text;
        if (!selectedText) return;

        // Convert current content to string
        const currentString = richTextToString(nodes);

        // Find selection position in string
        const beforeSelection = currentString.substring(0, currentString.indexOf(selectedText));
        const afterSelection = currentString.substring(currentString.indexOf(selectedText) + selectedText.length);

        // Apply formatting based on type
        let formattedText = '';
        if (formatType === 'bold') {
            formattedText = `**${selectedText}**`;
        } else if (formatType === 'italic') {
            formattedText = `*${selectedText}*`;
        }

        // Reconstruct string with formatting
        const newString = beforeSelection + formattedText + afterSelection;
        const newNodes = parseStringToRichText(newString);

        updateNodes(newNodes);
    }, [nodes, getCurrentSelection, updateNodes]);

    // Toggle bold formatting
    const toggleBold = useCallback(() => {
        applyFormatting('bold');
    }, [applyFormatting]);

    // Toggle italic formatting
    const toggleItalic = useCallback(() => {
        applyFormatting('italic');
    }, [applyFormatting]);

    // Clear all formatting
    const clearFormatting = useCallback(() => {
        const plainText = richTextToPlainText(nodes);
        const newNodes = parseStringToRichText(plainText);
        updateNodes(newNodes);
    }, [nodes, updateNodes]);

    // Handle content change
    const handleContentChange = useCallback((event) => {
        const newText = event.target.textContent || '';
        const newNodes = parseStringToRichText(newText);
        updateNodes(newNodes);
    }, [updateNodes]);

    // Handle keyboard shortcuts
    const handleKeyDown = useCallback((event) => {
        if (event.ctrlKey || event.metaKey) {
            switch (event.key.toLowerCase()) {
                case 'b':
                    event.preventDefault();
                    toggleBold();
                    break;
                case 'i':
                    event.preventDefault();
                    toggleItalic();
                    break;
                default:
                    break;
            }
        }
    }, [toggleBold, toggleItalic]);

    // Update internal state when prop changes
    useEffect(() => {
        setNodes(initialValue);
    }, [initialValue]);

    return {
        nodes,
        editorRef,
        selection,
        toggleBold,
        toggleItalic,
        clearFormatting,
        handleContentChange,
        handleKeyDown,
        getCurrentSelection,
        getSelectionFormatting
    };
};