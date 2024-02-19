'use client';

import { ConfirmationPageBox } from '@/app/components/checkout/confirmation-page-box/confirmation-page-box';
import { TripDetails } from '@/app/types/checkout.types';

interface DatesAndGuestsProps {
	tripDetails: TripDetails;
}

export const DatesAndGuests = ({ tripDetails }: DatesAndGuestsProps) => {
	const guestValue =
		tripDetails.guests.count +
		(tripDetails.guests.count > 1 ? ' guests' : ' guest');
	return (
		<ConfirmationPageBox title='Your Trip'>
			<BoxWrapper
				title='Dates'
				value={tripDetails.dates.range}
				isEditable={tripDetails.dates.editOption}
				editHandler={() => {}}
			/>
			<BoxWrapper
				title='Guests'
				value={guestValue}
				isEditable={tripDetails.guests.editOption}
				editHandler={() => {}}
			/>
		</ConfirmationPageBox>
	);
};

type BoxWrapperProps = {
	title: string;
	value: string;
	isEditable?: boolean;
	editHandler: () => void;
};

const BoxWrapper = ({
	title,
	value,
	isEditable = false,
	editHandler,
}: BoxWrapperProps) => (
	<div className='flex justify-between pb-6'>
		<div>
			<h3 className='text-base font-semibold'>{title}</h3>
			<span className='text-base'>{value}</span>
		</div>
		{isEditable && (
			<button
				className='text-base underline underline-offset-4'
				onClick={editHandler}>
				Edit
			</button>
		)}
	</div>
);
