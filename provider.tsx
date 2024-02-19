'use client';

import { store } from '@/app/global-redux/store';
import { Provider as ReduxProvider } from 'react-redux';

export const Provider = ({ children }: { children: React.ReactNode }) => (
	<ReduxProvider store={store}>{children}</ReduxProvider>
);
