"use client";

import React, { useEffect, useState } from 'react';
import RichTextToolbar from './RichTextToolbar';
import RichTextRenderer from './RichTextRenderer';
import { useRichTextEditor } from './hooks/useRichTextEditor';
import { richTextToPlainText, parseStringToRichText } from '../../utils/richTextParser';

/*

Rich Text Editor for FlexiBlox

- Standalone editor with dark theme
- Toolbar above content area
- Mobile-friendly interface
- Button-only formatting (no markdown)

*/

const RichTextEditor = ({
    value = [],
    onChange,
    placeholder = "Enter text...",
    className = "",
    disabled = false
}) => {
    const {
        nodes,
        editorRef,
        toggleBold,
        toggleItalic,
        clearFormatting,
        handleContentChange,
        handleKeyDown,
        getSelectionFormatting
    } = useRichTextEditor(value, onChange);

    const [activeFormats, setActiveFormats] = useState({ bold: false, italic: false });
    const [isClient, setIsClient] = useState(false);

    // Handle client-side rendering
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Update active formats on selection change
    const updateActiveFormats = () => {
        if (!isClient) return;

        try {
            const formats = getSelectionFormatting();
            setActiveFormats(formats);
        } catch (error) {
            // Fallback to no formatting
            setActiveFormats({ bold: false, italic: false });
        }
    };

    // Handle selection change
    useEffect(() => {
        if (!isClient) return;

        const handleSelectionChange = () => {
            updateActiveFormats();
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, [isClient, getSelectionFormatting]);

    // Handle input changes
    const handleInput = (event) => {
        handleContentChange(event);
        updateActiveFormats();
    };

    // Handle paste events
    const handlePaste = (event) => {
        event.preventDefault();

        // Get plain text from clipboard
        const text = event.clipboardData.getData('text/plain');
        if (text) {
            // Insert as plain text
            document.execCommand('insertText', false, text);
            handleContentChange(event);
        }
    };

    // Get display content for editor
    const getEditorContent = () => {
        if (!nodes || nodes.length === 0) {
            return '';
        }
        return richTextToPlainText(nodes);
    };

    // Prevent hydration issues
    if (!isClient) {
        return (
            <div className={`rich-text-editor ${className}`}>
                <div className="bg-gray-800 border border-gray-700 rounded-t-lg p-2">
                    <div className="h-8 bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="bg-gray-900 border border-gray-700 border-t-0 rounded-b-lg p-3">
                    <div className="h-20 bg-gray-800 rounded animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className={`rich-text-editor ${className}`}>
            {/* Toolbar */}
            <RichTextToolbar
                onBold={toggleBold}
                onItalic={toggleItalic}
                onClear={clearFormatting}
                isBoldActive={activeFormats.bold}
                isItalicActive={activeFormats.italic}
            />

            {/* Editor Content */}
            <div className="relative">
                <div
                    ref={editorRef}
                    contentEditable={!disabled}
                    suppressContentEditableWarning={true}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    onFocus={updateActiveFormats}
                    className={`
                        min-h-[80px] p-3 bg-gray-900 border border-gray-700 border-t-0 rounded-b-lg
                        text-gray-200 text-sm leading-relaxed
                        focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
                    `}
                    style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                    }}
                >
                    {/* Render rich text content */}
                    {nodes && nodes.length > 0 ? (
                        <RichTextRenderer nodes={nodes} mode="display" />
                    ) : (
                        <span className="text-gray-500">{placeholder}</span>
                    )}
                </div>

                {/* Mobile formatting indicator */}
                <div className="sm:hidden absolute bottom-2 right-2 flex items-center gap-1">
                    {activeFormats.bold && (
                        <span className="px-1 py-0.5 bg-pink-600 text-white text-xs rounded">B</span>
                    )}
                    {activeFormats.italic && (
                        <span className="px-1 py-0.5 bg-pink-600 text-white text-xs rounded">I</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RichTextEditor;