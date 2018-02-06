export const updateLayout = layout => ({
    type: 'UPDATE_LAYOUT',
    layout
});

export const selectGridItem = id => ({
    type: 'SELECT_GRID_ITEM',
    id,
    ignoreUndo: true
});

export const undo = {
    type: 'UNDO'
};

export const redo = {
    type: 'REDO'
};

export const addGridItem = {
    type: 'ADD_GRID_ITEM'
};