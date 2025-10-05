"use client";

import React, { useState, useEffect } from 'react';

/*

Date Range Picker Component

- Smart date input with format options
- Support for "Present", custom labels
- Dark theme matching repo style

*/

const DateRangePicker = ({
    value,
    onChange,
    className = ""
}) => {
    const [startDate, setStartDate] = useState(value?.start || '');
    const [endDate, setEndDate] = useState(value?.end || '');
    const [isPresent, setIsPresent] = useState(value?.end === 'Present' || !value?.end);
    const [displayFormat, setDisplayFormat] = useState(value?.displayFormat || 'MMM YYYY');
    const [customLabel, setCustomLabel] = useState(value?.customLabel || '');
    const [showDuration, setShowDuration] = useState(value?.showDuration || false);

    // Update parent when values change
    useEffect(() => {
        const dateRange = {
            start: startDate,
            end: isPresent ? 'Present' : endDate,
            displayFormat,
            customLabel: customLabel.trim() || undefined,
            showDuration
        };

        if (onChange) {
            onChange(dateRange);
        }
    }, [startDate, endDate, isPresent, displayFormat, customLabel, showDuration, onChange]);

    // Update local state when prop changes
    useEffect(() => {
        if (value) {
            setStartDate(value.start || '');
            setEndDate(value.end === 'Present' ? '' : value.end || '');
            setIsPresent(value.end === 'Present' || !value.end);
            setDisplayFormat(value.displayFormat || 'MMM YYYY');
            setCustomLabel(value.customLabel || '');
            setShowDuration(value.showDuration || false);
        }
    }, [value]);

    // Get today's date for max attribute
    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Date Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
                <div>
                    <label className="label-text">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="other-input w-full text-gray-200"
                        max={getTodayDate()}
                        min="1950-01-01"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="label-text">End Date</label>
                    <div className="space-y-2">
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            disabled={isPresent}
                            className={`
                                other-input w-full text-gray-200
                                ${isPresent ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                            max={getTodayDate()}
                            min={startDate || "1950-01-01"}
                        />

                        {/* Present Checkbox */}
                        <label className="flex items-center gap-2 text-gray-300 text-sm">
                            <input
                                type="checkbox"
                                checked={isPresent}
                                onChange={(e) => setIsPresent(e.target.checked)}
                                className="w-4 h-4 text-pink-600 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                            />
                            Present (Current position)
                        </label>
                    </div>
                </div>
            </div>

            {/* Display Format */}
            <div>
                <label className="label-text">Display Format</label>
                <select
                    value={displayFormat}
                    onChange={(e) => setDisplayFormat(e.target.value)}
                    className="other-input w-full text-gray-200"
                >
                    <option value="MMM YYYY">Month Year (Jan 2022)</option>
                    <option value="YYYY">Year Only (2022)</option>
                    <option value="custom">Custom Label</option>
                </select>
            </div>

            {/* Custom Label Input */}
            {displayFormat === 'custom' && (
                <div>
                    <label className="label-text">Custom Label</label>
                    <input
                        type="text"
                        value={customLabel}
                        onChange={(e) => setCustomLabel(e.target.value)}
                        placeholder="e.g., Summer 2022, Q1 2023"
                        className="other-input w-full text-gray-200"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                        This will override the date format and show your custom text
                    </p>
                </div>
            )}

            {/* Show Duration Option */}
            <div>
                <label className="flex items-center gap-2 text-gray-300 text-sm">
                    <input
                        type="checkbox"
                        checked={showDuration}
                        onChange={(e) => setShowDuration(e.target.checked)}
                        className="w-4 h-4 text-pink-600 bg-gray-800 border-gray-600 rounded focus:ring-pink-500"
                    />
                    Show duration (e.g., "2 yrs 3 mos")
                </label>
            </div>

            {/* Preview */}
            {(startDate || customLabel) && (
                <div className="p-3 bg-gray-800 border border-gray-700 rounded">
                    <label className="label-text mb-1">Preview</label>
                    <div className="text-gray-300 text-sm">
                        {customLabel && displayFormat === 'custom' ? (
                            customLabel
                        ) : (
                            (() => {
                                // Preview logic
                                const formatDate = (dateString, format) => {
                                    if (!dateString) return 'Present';
                                    const date = new Date(dateString);
                                    if (isNaN(date.getTime())) return 'Present';

                                    if (format === 'YYYY') {
                                        return date.getFullYear().toString();
                                    } else {
                                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                        return `${months[date.getMonth()]} ${date.getFullYear()}`;
                                    }
                                };

                                const start = formatDate(startDate, displayFormat);
                                const end = isPresent ? 'Present' : formatDate(endDate, displayFormat);
                                let preview = `${start} - ${end}`;

                                if (showDuration && startDate) {
                                    // Simple duration calculation for preview
                                    const startDateObj = new Date(startDate);
                                    const endDateObj = isPresent ? new Date() : new Date(endDate);
                                    const diffTime = Math.abs(endDateObj - startDateObj);
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                    const years = Math.floor(diffDays / 365);
                                    const months = Math.floor((diffDays % 365) / 30);

                                    if (years > 0 || months > 0) {
                                        let duration = ' (';
                                        if (years > 0) duration += `${years} ${years === 1 ? 'yr' : 'yrs'}`;
                                        if (months > 0) {
                                            if (years > 0) duration += ' ';
                                            duration += `${months} ${months === 1 ? 'mo' : 'mos'}`;
                                        }
                                        duration += ')';
                                        preview += duration;
                                    }
                                }

                                return preview;
                            })()
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;