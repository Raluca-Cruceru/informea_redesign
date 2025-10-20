import React, { createContext, useContext, useState } from 'react';

export type CategoryKey =
    | 'all'
    | 'treaty-texts' | 'decision-texts'
    | 'national-plans' | 'national-reports'
    | 'legislation' | 'court-decisions'
    | 'documents' | 'literature'
    | 'news' | 'events'
    | 'goals' | 'declarations';

export type Facets = {
    yearMin: number;
    yearMax: number;
    topics: string[];
    regions: string[];
    documentTypes: string[];
    leoThesaurus: string[];
    relatedTreaties: string; // "All related treaties" or a specific one
    partiesScope: string;    // "All parties" or a specific party filter
    sources: string[];       // FAOLEX, ECOLEX/ELIS, InforMEA, Sabin Center
    textTypes: string[];     // Agreement, Bilateral, Constitution, …
};

export type SearchState = {
    q: string;
    category: CategoryKey;
    facets: Facets;
};

// search-state.tsx
export const DEFAULT_FACETS: Facets = {
    yearMin: 1970,
    yearMax: 2026,
    topics: [],
    regions: [],
    documentTypes: [],
    leoThesaurus: [],
    relatedTreaties: 'All related treaties',
    partiesScope: 'All parties',
    sources: [],
    textTypes: [],
};

// and when creating default state:
const defaultState: SearchState = { q: '', category: 'all', facets: DEFAULT_FACETS };






const Ctx = createContext<{ state: SearchState; setState: (s: SearchState) => void; }>({
    state: defaultState,
    setState: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<SearchState>(defaultState);
    return <Ctx.Provider value={{ state, setState }}>{children}</Ctx.Provider>;
}

export function useSearch() {
    return useContext(Ctx);
}
