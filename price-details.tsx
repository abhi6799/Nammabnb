import { RatingIcon } from '@/app/assets/rating-icon';
import { SuperHostIcon } from '@/app/assets/super-host-icon';
import { BlockBreakLine } from '@/app/components/checkout/block-break-line/block-break-line';
import { ConfirmationPageBox } from '@/app/components/checkout/confirmation-page-box/confirmation-page-box';
import { PriceBreakup, PropertyDetails } from '@/app/types/checkout.types';
import Image from 'next/image';

interface PriceDetails {
	costBreakup: PriceBreakup;
	propertyDetails: PropertyDetails;
	totalPrice: number;
}

const LOCALE = 'en-IN';

export const PriceDetails = ({
	totalPrice,
	propertyDetails,
	costBreakup,
}: PriceDetails) => {
	const basePrice = getCurrenyFormat(
		costBreakup.basePrice,
		costBreakup.currency,
		LOCALE
	);
	const totalRoomRent = getCurrenyFormat(
		costBreakup.basePrice * costBreakup.totalNights,
		costBreakup.currency,
		LOCALE
	);
	const serviceFee = getCurrenyFormat(
		costBreakup.serviceFee,
		costBreakup.currency,
		LOCALE
	);
	const taxes = getCurrenyFormat(
		costBreakup.taxes,
		costBreakup.currency,
		LOCALE
	);

	const totalPriceLocal = getCurrenyFormat(
		totalPrice,
		costBreakup.currency,
		LOCALE
	);
	return (
		<div className='p-6 border border-gray-300 rounded-lg'>
			<div className='flex items-start h-[106px] pb-6'>
				<Image
					className='rounded-lg h-full'
					src={propertyDetails.thumbnailUrl}
					alt='property image'
					width={124}
					height={106}
				/>
				<div className='pl-3 w-full h-full flex flex-col justify-between'>
					<div>
						<p className='text-xs text-[#717171]'>
							{propertyDetails.type}
						</p>
						<p className='text-sm mt-1'>{propertyDetails.name}</p>
					</div>
					<div className='flex text-xs gap-2'>
						<div className='flex items-center gap-1'>
							<RatingIcon />
							<span className='font-semibold'>
								{propertyDetails.rating}
								<span className='text-[#717171]'>
									({propertyDetails.reviewsCount} reviews)
								</span>
							</span>
						</div>
						{propertyDetails.superhost && (
							<div className='flex items-center gap-2'>
								•
								<SuperHostIcon />
								<span className='-ml-1 text-[#717171]'>
									Superhost
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
			<BlockBreakLine isMarginSmall />
			<ConfirmationPageBox title='Price details'>
				<div>
					<PriceRow
						title={`${basePrice} x ${costBreakup.totalNights} nights`}
						value={totalRoomRent + ''}
					/>
					<PriceRow title='Airbnb service fee' value={serviceFee} />
					<PriceRow title='Taxes' value={taxes} />
					<BlockBreakLine isMarginSmall />
					<PriceRow
						title={`Total (${costBreakup.currency})`}
						value={totalPriceLocal}
						isTextBold
					/>
				</div>
			</ConfirmationPageBox>
		</div>
	);
};

type PriceRowProps = {
	title: string;
	value: string;
	isTextBold?: boolean;
};

const PriceRow = ({ title, value, isTextBold = false }: PriceRowProps) => (
	<div
		className={`flex justify-between text-base mt-3 ${
			isTextBold ? 'font-bold' : 'font-normal'
		}`}>
		<span>{title}</span> <span>{value}</span>
	</div>
);

const getCurrenyFormat = (value: number, currency: string, locale: string) => {
	return value.toLocaleString(locale, {
		currency: currency,
		style: 'currency',
	});
};
