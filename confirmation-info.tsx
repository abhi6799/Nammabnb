import { BookmarkIcon } from '@/app/assets/bookmark-icon';
import { PriceAlert } from '@/app/types/checkout.types';

interface ConfirmationInfoProps {
	priceAlert?: PriceAlert;
}

export const ConfirmationInfo = ({ priceAlert }: ConfirmationInfoProps) => {
	if (!priceAlert) {
		return null;
	}
	return (
		<div className='p-6 border-2 border-gray-200 rounded-lg mb-6'>
			<div className='flex items-start'>
				<div>
					<h3 className='text-base font-semibold'>
						{priceAlert.message}
					</h3>
					<p className='text-base leading-5'>{priceAlert.details}</p>
				</div>
				<div className='ml-6 mr-2'>
					<BookmarkIcon />
				</div>
			</div>
		</div>
	);
};
