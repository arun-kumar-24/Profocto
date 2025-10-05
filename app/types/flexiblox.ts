/*

Flexiblox - flexibility first resume building concept 

Everything is a "Blok" - the smallest unit in the flexiblox concept

which can be
- combined
- nested
- styled 

*/

// Core blok interface 

export interface Blok {
    id: string;                   
    type: BlokType;               
    content?: RichTextNode[];     
    link?: string;                
    dateRange?: DateRange;        
    children?: Blok[];            // Allowing nesting of other bloks
    layout?: BlokLayout;          
    styling?: BlokStyling;        
}

// Blok types 

export type BlokType =
    | 'text'        
    | 'heading'     
    | 'list'        
    | 'contact'     
    | 'divider'     
    | 'spacer'      
    | 'container'   
    | string;       

// Rich text interface - preserve the text formatting 

export interface RichTextNode {
    type: 'text' | 'bold' | 'italic' | 'link';
    text?: string;                
    children?: RichTextNode[];               
}

export type TextContent = RichTextNode[];

// Date interface to add for formatting in displaying dates

export interface DateRange {
    start?: string;               
    end?: string;                 
    displayFormat?: DateDisplayFormat;
    customLabel?: string;        
    showDuration?: boolean;      
}

// Date display types

export type DateDisplayFormat =
    | 'MMM YYYY'    
    | 'YYYY'        
    | 'custom';     

// Layout interface 

export interface BlokLayout {
    width: BlokWidth;             
    alignment?: TextAlignment;    
    columns?: number;             
    gap?: SpacingSize;           
}

export type BlokWidth =
    | 'full'      
    | 'half'      
    | 'third'     
    | 'quarter';  

export type TextAlignment =
    | 'left'
    | 'center'
    | 'right'
    | 'justify';

export type SpacingSize =
    | 'none'      
    | 'sm'        
    | 'md'        
    | 'lg';       

// Blok styling interface

export interface BlokStyling {
    fontSize?: FontSize;          
    fontWeight?: FontWeight;      
    lineHeight?: LineHeight;      
    underline?: boolean;          
    italic?: boolean;             
}

export type FontSize =
    | 'xs'        
    | 'sm'        
    | 'base'      
    | 'lg'        
    | 'xl'        
    | '2xl'       
    | '3xl';      

export type FontWeight =
    | 'normal'    
    | 'medium'    
    | 'semibold'  
    | 'bold';     

export type LineHeight =
    | 'sm'        
    | 'md'        
    | 'lg';       

// Utility types for initial creation of bloks

export type PartialBlok = Partial<Blok> & {
    type: BlokType;
};

// checks if the given blok is a container

export function isContainerBlok(blok: Blok): blok is Blok & { children: Blok[] } {
    return blok.type === 'container' && Array.isArray(blok.children);
}

// checks if the blok has content

export function hasContent(blok: Blok): blok is Blok & { content: RichTextNode[] } {
    return Array.isArray(blok.content) && blok.content.length > 0;
}

// checks if a blok has date ranges

export function hasDateRange(blok: Blok): blok is Blok & { dateRange: DateRange } {
    return blok.dateRange !== undefined;
}