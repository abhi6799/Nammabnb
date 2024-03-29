'use client';

import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Range } from 'react-date-range';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';

import Container from '@/app/components/Container';
import useLoginModal from '@/app/components/hooks/UseLoginModel';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { categories } from '@/app/components/navbar/Categories';
import { RootState } from '@/app/global-redux/store';
import { useSelector } from 'react-redux';
import axios from 'axios';

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: 'selection',
};

interface ListingClientProps {
	reservations?: SafeReservation[];
	listing: SafeListing & {
		user: SafeUser;
	};
}

const ListingClient: React.FC<ListingClientProps> = ({
	listing,
	reservations = [],
}) => {
	const currentUser = useSelector((state: RootState) => state.user);
	const loginModal = useLoginModal();
	const router = useRouter();

	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservation: any) => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});

			dates = [...dates, ...range];
		});

		return dates;
	}, [reservations]);

	const category = useMemo(() => {
		return categories.find((items) => items.label === listing.category);
	}, [listing.category]);

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	// const onCreateReservation = useCallback(() => {
	// 	if (!currentUser) {
	// 		return loginModal.onOpen();
	// 	}
	// 	setIsLoading(true);

	// 	axios
	// 		.post('/api/reservations', {
	// 			totalPrice,
	// 			startDate: dateRange.startDate,
	// 			endDate: dateRange.endDate,
	// 			listingId: listing?.id,
	// 		})
	// 		.then(() => {
	// 			toast.success('Listing reserved!');
	// 			setDateRange(initialDateRange);
	// 			router.push('/trips');
	// 		})
	// 		.catch(() => {
	// 			toast.error('Something went wrong.');
	// 		})
	// 		.finally(() => {
	// 			setIsLoading(false);
	// 		});
	// }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

	const onCheckout = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		setIsLoading(true);

		const guestCount = listing.guestCount;
		const title = listing.title;
		const type = listing.description;
		const pricePerNight = listing.price;
		const imageUrl = encodeURIComponent(listing.imageSrc);

		const url = `/checkout?checkin=${dateRange.startDate}&checkout=${dateRange.endDate}&guestCurrency=USD&numberOfGuests=${guestCount}&propertyId=${listing.id}&propertyName=${title}&propertyType=${type}&imageUrl=${imageUrl}&pricePerNight=${pricePerNight}&rating=4.5&reviewsCount=25&isSuperHost=false`;

		router.push(url);
	}, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInDays(
				dateRange.endDate,
				dateRange.startDate
			);

			if (dayCount && listing.price) {
				setTotalPrice(dayCount * listing.price);
			} else {
				setTotalPrice(listing.price);
			}
		}
	}, [dateRange, listing.price]);

	return (
		<Container>
			<div
				className='
          max-w-screen-lg 
          mx-auto
        '>
				<div className='flex flex-col gap-6'>
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
					/>
					<div
						className='
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            '>
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							guestCount={listing.guestCount}
							bathroomCount={listing.bathroomCount}
							locationValue={listing.locationValue}
						/>
						<div
							className='
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              '>
							<ListingReservation
								price={listing.price}
								totalPrice={totalPrice}
								onChangeDate={(value) => setDateRange(value)}
								dateRange={dateRange}
								// onSubmit= {onCreateReservation}
								onCheckout={onCheckout}
								disabled={isLoading}
								disabledDates={disabledDates}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
