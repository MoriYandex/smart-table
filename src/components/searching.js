import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(
        ['skipEmptyTargetValues'],
        [rules.searchMultipleFields(searchField, ['customer', 'seller', 'date'], false)]
    );

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        const searchValue = state.search;
        
        if (!searchValue || searchValue.trim() === '') {
            return data;
        }

        return data.filter(row => compare(row, { search: searchValue }));
    }
}