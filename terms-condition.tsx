'use client';

import Button from '@/app/components/Button';
import { ConfirmationPageBox } from '@/app/components/checkout/confirmation-page-box/confirmation-page-box';

interface TermsConditionProps {
	onConfirmCheckout: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
}

export const TermsCondition = ({ onConfirmCheckout }: TermsConditionProps) => {
	const onCheckout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
		onConfirmCheckout(e);
	return (
		<ConfirmationPageBox title=''>
			<div>
				<div className='text-xs'>
					By selecting the button below, I agree to the{' '}
					<span
						role='button'
						className='font-semibold underline underline-offset-2'>
						{"Host's House Rules"}
					</span>
					,{' '}
					<a
						target='_blank'
						href='https://www.airbnb.co.in/help/article/2894'
						className='font-semibold underline underline-offset-2'>
						Ground rules for guests
					</a>
					,{' '}
					<span
						role='button'
						className='font-semibold underline underline-offset-2'>
						{"Nammabnb's Rebooking and Refund Policy"}
					</span>{' '}
					and that Nammabnb can{' '}
					<span
						role='button'
						className='font-semibold underline underline-offset-2'>
						charge my payment method
					</span>{' '}
				</div>
				<div className='text-xs pt-4'>
					if I’m responsible for damage. I also agree to the{' '}
					<BlueAnchorLink href='https://www.airbnb.co.in/help/article/2877'>
						{'updated '}
					</BlueAnchorLink>
					<BlueAnchorLink href='https://www.airbnb.co.in/help/article/2908'>
						Terms of Service
					</BlueAnchorLink>
					,{' '}
					<BlueAnchorLink href='https://www.airbnb.co.in/help/article/2909'>
						Payments Terms of Service
					</BlueAnchorLink>{' '}
					and I acknowledge the{' '}
					<BlueAnchorLink href='https://www.airbnb.co.in/help/article/2855'>
						Privacy Policy
					</BlueAnchorLink>
					.
				</div>
				<div className='py-6 mt-4'>
					<Button label='Confirm and pay' onClick={onCheckout} />
				</div>
			</div>
		</ConfirmationPageBox>
	);
};

type BlueAnchorLinkProps = {
	href: string;
	children: string;
};

const BlueAnchorLink = ({ href, children }: BlueAnchorLinkProps) => (
	<a
		target='_blank'
		href={href}
		className='text-blue-700 underline underline-offset-2'>
		{children}
	</a>
);

