
import { createSlice, configureStore } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    value: number;
    showCounter: boolean;
}

const initialCounterState: CounterState = {
    value: 0,
    showCounter: true,
};
//createSlice automatically generates action creators and action types that correspond to the reducers and state.
//no state mutation, it uses immer library internally
//so we can write code that "mutates" some state, but actually it creates a new immutable state internally
const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        increase: (state, action: PayloadAction<number>) => {
            state.value = state.value + action.payload;
        },
        toggleCounter: (state) => {
            state.showCounter = !state.showCounter;
        },
    },
});

const initialAuthState = {
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    }
})


export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;