import { SafeUser } from '@/app/types';
import { User } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';

export type UserState = SafeUser | null;

const initialState: UserState = null;

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser: (state, action) => {
			return action.payload;
		},
	},
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
