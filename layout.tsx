import { Nunito } from 'next/font/google';

import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css';
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';
import { Provider } from '@/app/global-redux/provider';

export const metadata = {
	title: 'Nammabnb',
	description: 'feel like you own',
};

const font = Nunito({
	subsets: ['latin'],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang='en'>
			<body className={font.className}>
				<Provider>
					<ClientOnly>
						<ToasterProvider />
						<LoginModal />
						<RegisterModal />
						<SearchModal />
						<RentModal />
						<Navbar currentUser={currentUser} />
					</ClientOnly>
					<div className='pb-20 pt-28'>{children}</div>
				</Provider>
				<script src='https://embed.tawk.to/657245fabfb79148e59b95d9/1hh362man' />
			</body>
		</html>
	);
}
