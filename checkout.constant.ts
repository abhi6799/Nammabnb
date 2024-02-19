import { CheckoutConfirmation } from '@/app/checkout/checkout.types';

export const CONFIRMATION_DATA: CheckoutConfirmation = {
	priceAlert: {
		message: 'Good price.',
		details:
			'Your dates are ₹2,001 less than the nightly rate over the last 3 months.',
	},
	tripDetails: {
		dates: {
			range: '9-12 Jan 2024',
			editOption: true,
		},
		guests: {
			count: 1,
			editOption: true,
		},
	},
	cancellationPolicy: {
		safeDate: '2 Jan',
		tripStartDate: '7 Jan',
	},
	propertyDetails: {
		type: 'Entire villa',
		name: 'Bloomingtondales',
		rating: '4.91',
		reviewsCount: 17,
		superhost: true,
		thumbnailUrl:
			'https://a0.muscache.com/im/pictures/miso/Hosting-51126751/original/f51043e1-a11e-433e-93ed-8eda53b496d8.jpeg?aki_policy=large',
	},
	priceDetails: {
		currency: '₹',
		basePrice: 75300,
		totalNights: 5,
		serviceFee: 5394,
		taxes: 4500,
	},
};
