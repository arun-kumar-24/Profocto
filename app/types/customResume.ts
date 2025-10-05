import { Blok } from './flexiblox';

/*

Custom Resume Data Model

- Separate from the traditional resume system, this uses FlexiBlox.
- Creates completely customizable resume layouts.

*/

// Main data structure for FlexiBlox-based resumes
// Simple and clean - just an array of bloks

export interface CustomResumeData {            
    bloks: Blok[];               
}

// React Context interface for managing custom resume state

export interface CustomResumeContextType {
    customResumeData: CustomResumeData;
    setCustomResumeData: React.Dispatch<React.SetStateAction<CustomResumeData>>;

    // Blok management methods
    addBlok: (blok: Blok, index?: number) => void;
    updateBlok: (blokId: string, updates: Partial<Blok>) => void;
    deleteBlok: (blokId: string) => void;
    reorderBloks: (fromIndex: number, toIndex: number) => void;

    // Utility methods
    findBlok: (blokId: string) => Blok | undefined;
    duplicateBlok: (blokId: string) => void;
}

// Default empty custom resume
// Used when creating a new FlexiBlox resume

export const createEmptyCustomResume = (): CustomResumeData => ({
    bloks: []
});

// Type for blok operations in the UI

export type BlokOperation =
    | 'add'
    | 'update'
    | 'delete'
    | 'reorder'
    | 'duplicate';

// Event type for blok changes

export interface BlokChangeEvent {
    operation: BlokOperation;
    blokId?: string;
    blok?: Blok;
    index?: number;
    updates?: Partial<Blok>;
}