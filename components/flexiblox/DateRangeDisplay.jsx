"use client";

import React, { useMemo } from 'react';

/*

Date Range Display Component

- Formatted output with duration calculation
- Support for "Present", custom labels, different formats
- Clean display for PDF preview

*/

const DateRangeDisplay = ({
    dateRange,
    className = "text-sm text-gray-600"
}) => {
    // Calculate and format date display
    const formattedDisplay = useMemo(() => {
        if (!dateRange) return '';

        const { start, end, displayFormat, customLabel, showDuration } = dateRange;

        // Use custom label if provided
        if (customLabel && customLabel.trim()) {
            return customLabel;
        }

        // Format individual dates
        const formatDate = (dateString, format) => {
            if (!dateString) return 'Present';
            if (dateString.toLowerCase() === 'present') return 'Present';

            try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return 'Present';

                switch (format) {
                    case 'YYYY':
                        return date.getFullYear().toString();

                    case 'MMM YYYY':
                    default:
                        const months = [
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                        ];
                        return `${months[date.getMonth()]} ${date.getFullYear()}`;
                }
            } catch (error) {
                return 'Present';
            }
        };

        // Calculate duration if requested
        const calculateDuration = (startDate, endDate) => {
            if (!startDate) return '';

            try {
                const start = new Date(startDate);
                const end = endDate && endDate.toLowerCase() !== 'present'
                    ? new Date(endDate)
                    : new Date();

                if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';

                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                const years = Math.floor(diffDays / 365);
                const months = Math.floor((diffDays % 365) / 30);

                if (years === 0 && months === 0) {
                    return '(Less than 1 month)';
                } else if (years === 0) {
                    return `(${months} ${months === 1 ? 'month' : 'months'})`;
                } else if (months === 0) {
                    return `(${years} ${years === 1 ? 'year' : 'years'})`;
                } else {
                    return `(${years} ${years === 1 ? 'yr' : 'yrs'} ${months} ${months === 1 ? 'mo' : 'mos'})`;
                }
            } catch (error) {
                return '';
            }
        };

        // Format start and end dates
        const format = displayFormat || 'MMM YYYY';
        const startFormatted = formatDate(start, format);
        const endFormatted = formatDate(end, format);

        // Build display string
        let display = '';
        if (startFormatted && endFormatted) {
            display = `${startFormatted} - ${endFormatted}`;
        } else if (startFormatted) {
            display = startFormatted;
        } else if (endFormatted) {
            display = endFormatted;
        }

        // Add duration if requested
        if (showDuration && start) {
            const duration = calculateDuration(start, end);
            if (duration) {
                display += ` ${duration}`;
            }
        }

        return display;
    }, [dateRange]);

    // Don't render if no date range or empty display
    if (!dateRange || !formattedDisplay) {
        return null;
    }

    return (
        <span className={className}>
            {formattedDisplay}
        </span>
    );
};

export default DateRangeDisplay;