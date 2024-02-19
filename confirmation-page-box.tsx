import { ReactNode } from 'react';

interface ConfirmationPageBoxProps {
	title: string;
	children: ReactNode;
}

export const ConfirmationPageBox = ({
	title,
	children,
}: ConfirmationPageBoxProps) => {
	return (
		<div className='mb-6 last:mb-0'>
			<h2 className='text-[1.38rem] font-semibold leading-[1.625rem] pb-6'>
				{title}
			</h2>
			<div>{children}</div>
		</div>
	);
};
