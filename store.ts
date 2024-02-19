'use client';

import userReducer from '@/app/global-redux/slice/user-slice/user-slice';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
