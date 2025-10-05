import {
    Blok,
    BlokType,
    RichTextNode
} from '../app/types/flexiblox';

/*

FlexiBlox Factory System

- Organized functions for creating bloks with smart defaults.
- Users fill in the content manually - provides structure

*/

// Create a blok with smart defaults based on type

export function createBlok(type: BlokType, options: Partial<Blok> = {}): Blok {
    const baseBlok: Blok = {
        id: crypto.randomUUID(),
        type,
        layout: {
            width: 'full',
            alignment: 'left',
            gap: 'md'
        },
        styling: {
            fontSize: 'base',
            fontWeight: 'normal',
            lineHeight: 'md'
        },
        ...options
    };

    return baseBlok;
}

// Create simple text content from a string

export function createTextContent(text: string): RichTextNode[] {
    return [{ type: 'text', text }];
}

// Create rich text content with formatting

export function createRichTextContent(nodes: RichTextNode[]): RichTextNode[] {
    return nodes;
}

// Create a text blok for paragraphs and descriptions

export function createTextBlok(content?: string): Blok {
    return createBlok('text', {
        content: content ? createTextContent(content) : createTextContent('Add your text here...'),
        styling: {
            fontSize: 'base',
            fontWeight: 'normal',
            lineHeight: 'md'
        }
    });
}

// Create a heading blok for section titles

export function createHeadingBlok(content?: string, level: 1 | 2 | 3 = 1): Blok {
    const fontSizes = {
        1: '2xl' as const,
        2: 'xl' as const,
        3: 'lg' as const
    };

    return createBlok('heading', {
        content: content ? createTextContent(content) : createTextContent('Section Heading'),
        styling: {
            fontSize: fontSizes[level],
            fontWeight: 'bold',
            lineHeight: 'sm',
            underline: level === 1
        }
    });
}

// Create a list blok for bullet points

export function createListBlok(items?: string[]): Blok {
    const defaultItems = items || ['First item', 'Second item', 'Third item'];

    return createBlok('list', {
        content: defaultItems.map(item => ({ type: 'text', text: item } as RichTextNode)),
        styling: {
            fontSize: 'base',
            fontWeight: 'normal',
            lineHeight: 'md'
        }
    });
}

// Create a contact blok for contact information

export function createContactBlok(contactType: 'email' | 'phone' | 'address' | 'website' = 'email'): Blok {
    const placeholders = {
        email: 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        address: 'City, State, Country',
        website: 'www.yourwebsite.com'
    };

    return createBlok('contact', {
        content: createTextContent(placeholders[contactType]),
        styling: {
            fontSize: 'base',
            fontWeight: 'normal',
            lineHeight: 'md'
        }
    });
}

// Create a divider blok for visual separation

export function createDividerBlok(): Blok {
    return createBlok('divider', {
        layout: {
            width: 'full',
            alignment: 'center',
            gap: 'md'
        }
    });
}

// Create a spacer blok for vertical spacing

export function createSpacerBlok(size: 'sm' | 'md' | 'lg' = 'md'): Blok {
    return createBlok('spacer', {
        layout: {
            width: 'full',
            alignment: 'left',
            gap: size
        }
    });
}

// Create a container blok for grouping other bloks

export function createContainerBlok(columns: number = 2): Blok {
    return createBlok('container', {
        children: [],
        layout: {
            width: 'full',
            alignment: 'left',
            columns,
            gap: 'md'
        }
    });
}

// Basic required templates to guide users to customize

/*
Create a work experience entry template
Container with: Job Title, Company, Date Range, Description, Achievements
*/
export function createWorkExperienceTemplate(): Blok[] {
    return [
        createContainerBlok(1), // Wrapper container
        createHeadingBlok('Job Title - Company Name', 2),
        createTextBlok('Job description and responsibilities...'),
        createListBlok([
            'Key achievement or responsibility',
            'Another important accomplishment',
            'Quantifiable result or impact'
        ])
    ];
}

/*
Create an education entry template
Container with: Degree, School, Date Range, Details
*/
export function createEducationTemplate(): Blok[] {
    return [
        createHeadingBlok('Degree Name', 2),
        createTextBlok('University/School Name'),
        createTextBlok('Additional details, GPA, honors, etc.')
    ];
}

/*
Create a skills section template
Heading + categorized lists
*/
export function createSkillsTemplate(): Blok[] {
    return [
        createHeadingBlok('Skills', 1),
        createTextBlok('Programming Languages: JavaScript, Python, Java'),
        createTextBlok('Frameworks: React, Node.js, Express'),
        createTextBlok('Tools: Git, Docker, AWS')
    ];
}

/*
Create a contact section template
Header with contact information
*/
export function createContactSectionTemplate(): Blok[] {
    return [
        createHeadingBlok('Your Name', 1),
        createTextBlok('Professional Title'),
        createContactBlok('email'),
        createContactBlok('phone'),
        createContactBlok('address')
    ];
}

/*
Create a project entry template
*/
export function createProjectTemplate(): Blok[] {
    return [
        createHeadingBlok('Project Name', 2),
        createTextBlok('Brief description of the project and technologies used...'),
        createListBlok([
            'Key feature or accomplishment',
            'Technical challenge solved',
            'Impact or results achieved'
        ])
    ];
}

// DEFAULT RESUME TEMPLATE

/*
Create a complete default resume template
Provides a good starting structure for users to customize
*/
export function createDefaultResumeTemplate(): Blok[] {
    return [
        // Header Section
        ...createContactSectionTemplate(),

        createSpacerBlok('md'),
        createDividerBlok(),
        createSpacerBlok('md'),

        // Professional Summary
        createHeadingBlok('Professional Summary', 1),
        createTextBlok('Write a compelling summary of your professional background, key skills, and career objectives...'),

        createSpacerBlok('md'),

        // Work Experience
        createHeadingBlok('Work Experience', 1),
        ...createWorkExperienceTemplate(),

        createSpacerBlok('sm'),

        // Add another work experience entry
        ...createWorkExperienceTemplate(),

        createSpacerBlok('md'),

        // Education
        createHeadingBlok('Education', 1),
        ...createEducationTemplate(),

        createSpacerBlok('md'),

        // Skills
        ...createSkillsTemplate(),

        createSpacerBlok('md'),

        // Projects
        createHeadingBlok('Projects', 1),
        ...createProjectTemplate()
    ];
}


// Utility functions

/*
Clone a blok with a new ID (for duplication)
*/
export function cloneBlok(blok: Blok): Blok {
    const cloned = JSON.parse(JSON.stringify(blok)) as Blok;
    cloned.id = crypto.randomUUID();

    // Recursively update IDs for children
    if (cloned.children) {
        cloned.children = cloned.children.map(child => cloneBlok(child));
    }

    return cloned;
}

/*
Get blok type display name for UI
*/
export function getBlokDisplayName(type: BlokType): string {
    const displayNames: Record<string, string> = {
        text: 'Text Block',
        heading: 'Heading',
        list: 'List',
        contact: 'Contact Info',
        divider: 'Divider',
        spacer: 'Spacer',
        container: 'Container'
    };

    return displayNames[type] || type;
}

/*
Get blok type description for UI
*/
export function getBlokDescription(type: BlokType): string {
    const descriptions: Record<string, string> = {
        text: 'Paragraph text with rich formatting',
        heading: 'Section titles and headers',
        list: 'Bullet points or numbered lists',
        contact: 'Contact information like email, phone',
        divider: 'Horizontal line separator',
        spacer: 'Add vertical spacing',
        container: 'Group other bloks with layout'
    };

    return descriptions[type] || 'Custom blok type';
}