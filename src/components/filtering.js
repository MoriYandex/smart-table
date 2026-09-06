export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            const select = elements[elementName];
            if (select && select.tagName === 'SELECT') {
                select.innerHTML = '';
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = '—';
                select.appendChild(defaultOption);
                
                Object.values(indexes[elementName]).forEach(name => {
                    const el = document.createElement('option');
                    el.textContent = name;
                    el.value = name;
                    select.appendChild(el);
                });
            }
        });
    };

    const applyFiltering = (query, state, action) => {
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
        }

        const filter = {};
        
        // Обработка полей фильтра из elements
        Object.keys(elements).forEach(key => {
            const element = elements[key];
            if (element) {
                const tagName = element.tagName;
                const name = element.name;
                const value = element.value;
                
                if (['INPUT', 'SELECT'].includes(tagName) && value && value !== '') {
                    filter[`filter[${name}]`] = value;
                }
            }
        });

        /*
        // Обработка диапазона totalFrom/totalTo из state
        if (state.totalFrom || state.totalTo) {
            const from = state.totalFrom ? parseFloat(state.totalFrom) : undefined;
            const to = state.totalTo ? parseFloat(state.totalTo) : undefined;
            if (!isNaN(from) || !isNaN(to)) {
                const range = [];
                if (!isNaN(from)) range.push(from);
                if (!isNaN(to)) range.push(to);
                filter['filter[total]'] = range;
            }
        }*/

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}