import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const initialState = {
    count : 0
};

const ADD = 'ADD';

function countReducer(state = initialState, action) {
    console.log(state, action);
    switch (action.type) {
        case ADD:
            return{
                ...state,
                count: state.count + (action.num || 1),
            };
        default: {
            return state
        }
    }
}

const userInitialState = {
    userName : 'jok'
};

const UPDATE = 'UPDATE';
function userReducer(state = userInitialState, action) {
    console.log(state, action);
    switch (action.type) {
        case UPDATE:
            return{
                ...state,
                userName: action.userName,
            };
        default: {
            return state
        }
    }
}


const allReducer = combineReducers({
    counter: countReducer,
    user: userReducer,
});


const store = createStore(
    allReducer,
    {
        counter: initialState,
        user: userInitialState,
    },
    composeWithDevTools(applyMiddleware(thunk))
    );

function add(num) {
    return{
        type: ADD,
        num,
    }
}

function addAsync(num) {
    return dispatch => {
        setTimeout(()=> {
            dispatch(add(num))
        }, 1000)
    }
}

store.subscribe(()=> {
    console.log('change', store.getState())
});

store.dispatch({type: ADD });
store.dispatch(addAsync(5));
store.dispatch({type: UPDATE, userName: 'tom'});
export default store
