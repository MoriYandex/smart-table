import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            })
        );
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const parent = action.closest('.filter-wrapper');
            const input = parent.querySelector('input');
            if (input) {
                input.value = '';
                if (state[field]) {
                    delete state[field];
                }
            }
            return data;
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор        
        if (state.totalFrom || state.totalTo) {
            const from = state.totalFrom ? parseFloat(state.totalFrom) : undefined;
            const to = state.totalTo ? parseFloat(state.totalTo) : undefined;
            if (!isNaN(from) || !isNaN(to)) {
                state.total = [from, to];
            }
        }
        return data.filter(row => compare(row, state));
    }
}