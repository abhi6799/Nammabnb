import { ConfirmationPageBox } from '@/app/components/checkout/confirmation-page-box/confirmation-page-box';

interface MandatoryInfoProps {}

export const MandatoryInfo = ({ ...props }: MandatoryInfoProps) => {
	return (
		<ConfirmationPageBox title='Required for your trip'>
			<div className='flex justify-between items-start'>
				<div>
					<h3 className='text-base font-semibold m-0'>
						Phone number
					</h3>
					<p className='text-base m-0'>
						Add and confirm your phone number to get trip updates.
					</p>
				</div>
				<button className='text-sm border border-black rounded-lg px-4 py-2'>
					Add
				</button>
			</div>
		</ConfirmationPageBox>
	);
};
