import { ConfirmationPageBox } from '@/app/components/checkout/confirmation-page-box/confirmation-page-box';

interface CancellationPolicyProps {
	tripStartDate: string;
	safeDate: string;
}

export const CancellationPolicy = ({
	safeDate,
	tripStartDate,
}: CancellationPolicyProps) => {
	return (
		<ConfirmationPageBox title='Cancellation policy'>
			<p className='text-base'>
				<strong>Free cancellation before {safeDate}.</strong> Cancel
				before check-in on {tripStartDate} for a partial refund.{' '}
				<button className='text-base font-semibold underline underline-offset-2'>
					Learn more
				</button>
			</p>
		</ConfirmationPageBox>
	);
};
