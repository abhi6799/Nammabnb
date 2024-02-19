export type PriceAlert = {
	message: string;
	details: string;
};

type Editable = {
	range: string;
	editOption: boolean;
};

type GuestsDetails = {
	count: number;
	editOption: boolean;
};

type CancellationPolicy = {
	safeDate: string;
	tripStartDate: string;
};

export type PropertyDetails = {
	type: string;
	name: string;
	rating: string;
	reviewsCount: number;
	superhost: boolean;
	thumbnailUrl: string;
};

export type PriceBreakup = {
	currency: string;
	basePrice: number;
	totalNights: number;
	serviceFee: number;
	taxes: number;
};

export type TripDetails = {
	dates: Editable;
	guests: GuestsDetails;
};

export type CheckoutConfirmation = {
	priceAlert: PriceAlert;
	tripDetails: TripDetails;
	cancellationPolicy: CancellationPolicy;
	propertyDetails: PropertyDetails;
	priceDetails: PriceBreakup;
};
