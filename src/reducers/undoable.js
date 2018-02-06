// TODO: group undoable actions, 

const undoable = reducer => {
    let history = {
        past: [],
        future: []
    };

    return function (state, action) {
        switch (action.type) {
          case 'UNDO':
            const previous = history.past[history.past.length - 1];
            history.past = history.past.slice(0, history.past.length - 1);
            history.future = [state, ...history.future];
            return {
                ...previous,
                canUndo: history.past.length > 0,
                canRedo: history.future.length > 0
            };
          case 'REDO':
            const next = history.future[0];
            history.past = [...history.past, state];
            history.future = history.future.slice(1);
            return {
                ...next,
                canUndo: history.past.length > 0,
                canRedo: history.future.length > 0
            };
          default:
            // Delegate handling the action to the passed reducer
            const newState = reducer(state, action);
            if (state === newState) {
              return state;
            }
            if (!action.ignoreUndo) {
                history.past = [...history.past, state];
                history.future = [];
            }
            return {
                ...newState,
                canUndo: history.past.length > 0,
                canRedo: history.future.length > 0
            };
        }
    }
};

export default undoable;