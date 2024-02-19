'use client';
import { CONFIRMATION_DATA } from '@/app/checkout/checkout.constant';
import { CheckoutConfirmation } from '@/app/checkout/checkout.types';
import {
	formatDate,
	getNightsCount,
	subtractDaysFromDateStr,
} from '@/app/checkout/date';
import { BlockBreakLine } from '@/app/components/checkout/block-break-line/block-break-line';
import { CancellationPolicy } from '@/app/components/checkout/cancellation-policy/cancellation-policy';
import { ConfirmationInfo } from '@/app/components/checkout/confirmation-info/confirmation-info';
import { DatesAndGuests } from '@/app/components/checkout/dates-and-guest/dates-and-guest';
import { GroundRules } from '@/app/components/checkout/ground-rules/ground-rules';
import { MandatoryInfo } from '@/app/components/checkout/mandatory-info/mandatory-info';
import { PriceDetails } from '@/app/components/checkout/price-details/price-details';
import { TermsCondition } from '@/app/components/checkout/terms-condition/terms-condition';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const CheckoutPage = () => {
	const queryParams = useSearchParams();
	const checkin = queryParams?.get('checkin') || '';
	const checkout = queryParams?.get('checkout') || '';
	const formattedCheckin = formatDate(checkin);
	const formattedCheckout = formatDate(checkout);
	const guestCurrency = queryParams?.get('guestCurrency');
	const numberOfGuests = queryParams?.get('numberOfGuests');
	const propertyId = queryParams?.get('propertyId') || '';
	const propertyName = queryParams?.get('propertyName') || '';
	const propertyType = queryParams?.get('propertyType') || '';
	const pricePerNight = queryParams?.get('pricePerNight') || '0';
	const rating = queryParams?.get('rating') || '';
	const imageUrl = queryParams?.get('imageUrl') || '';
	const reviewsCount = queryParams?.get('reviewsCount') || '';
	const isSuperHost = (queryParams?.get('isSuperHost') || 'false') === 'true';

	const dates = `${formattedCheckin} - ${formattedCheckout}`;
	const safeDate = subtractDaysFromDateStr(checkin, 5);
	const totalNights = getNightsCount(checkin, checkout) || 1;
	const decodedImageUrl = decodeURIComponent(imageUrl);

	const confirmation: CheckoutConfirmation = CONFIRMATION_DATA;
	confirmation.tripDetails = {
		dates: { range: dates, editOption: false },
		guests: {
			count: Number(numberOfGuests),
			editOption: false,
		},
	};
	confirmation.cancellationPolicy = {
		safeDate,
		tripStartDate: formatDate(checkin),
	};
	confirmation.priceDetails = {
		basePrice: Number(pricePerNight),
		totalNights,
		serviceFee: Math.floor(Number(pricePerNight) * 0.01),
		taxes: Math.floor(Number(pricePerNight) * 0.1),
		currency: guestCurrency || 'USD',
	};
	confirmation.propertyDetails = {
		type: propertyType,
		superhost: isSuperHost,
		thumbnailUrl:
			decodedImageUrl || confirmation.propertyDetails.thumbnailUrl,
		name: propertyName,
		rating: rating,
		reviewsCount: Number(reviewsCount),
	};

	const totalPrice =
		confirmation.priceDetails.basePrice *
			confirmation.priceDetails.totalNights +
		confirmation.priceDetails.serviceFee +
		confirmation.priceDetails.taxes;
	const stripeTotalPrice = totalPrice * 100;

	const confirmCheckoutHandler = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		const httpBody = {
			price: stripeTotalPrice,
			title: `Booking ${confirmation.propertyDetails.name} for ${confirmation.tripDetails.guests.count} guests`,
			currency: confirmation.priceDetails.currency,
			startDate: checkin,
			endDate: checkout,
			listingId: propertyId,
			imageUrl: decodedImageUrl,
			pricePerNight: pricePerNight,
			type: propertyType,
			guestCount: numberOfGuests,
		};

		const headers = {
			'Content-Type': 'application/json',
		};
		const data = await axios.post('/api/checkout', httpBody, {
			headers,
		});
		window.location.assign(data.data);
	};

	return (
		<div className='mx-[15%]'>
			<div className='pt-16 pb-4'>
				<h2 className='text-3xl font-semibold'>Confirm and pay</h2>
			</div>
			<div className='flex relative'>
				<div className='w-1/2'>
					<DatesAndGuests tripDetails={confirmation.tripDetails} />
					<BlockBreakLine isMarginMedium />
					<CancellationPolicy
						safeDate={confirmation.cancellationPolicy.safeDate}
						tripStartDate={
							confirmation.cancellationPolicy.tripStartDate
						}
					/>
					<BlockBreakLine isMarginMedium />
					<GroundRules />
					<BlockBreakLine isMarginMedium />
					<TermsCondition
						onConfirmCheckout={confirmCheckoutHandler}
					/>
				</div>
				<div className='w-2/5 ml-[8.3%] sticky top-0'>
					<PriceDetails
						totalPrice={totalPrice}
						propertyDetails={confirmation.propertyDetails}
						costBreakup={confirmation.priceDetails}
					/>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
