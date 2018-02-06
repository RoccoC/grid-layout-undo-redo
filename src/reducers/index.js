import undoable from './undoable';

const exampleReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_LAYOUT':
            return {
                ...state,
                layout: action.layout
            };
        case 'SELECT_GRID_ITEM':
            return {
                ...state,
                selectedGridItemId: action.id === state.selectedGridItemId ? undefined : action.id
            };
        case 'ADD_GRID_ITEM':
            return {
                ...state,
                layout: state.layout.concat({ x: 0, y: Infinity, w: 12, h: 2, i: state.layout.length.toString() })
            }
        default:
            return state;
    }
};
  
export default undoable(exampleReducer);