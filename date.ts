export const formatDate = (date?: string): string => {
	if (!date) return '';
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};
	const dateParts = date.split('-');
	const formattedDate = new Date(date).toLocaleDateString(
		'en-IN',
		options
	);
	return formattedDate;
};

export const subtractDaysFromDateStr = (
	dateStr: string,
	daysToSubtract: number
): string => {
	const inputDate = new Date(dateStr); // Convert the string to a Date object
	inputDate.setDate(inputDate.getDate() - daysToSubtract);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};
	return inputDate.toLocaleDateString('en-IN', options);
};

export const getNightsCount = (startDate: string, endDate: string): number => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const timeDifference = end.getTime() - start.getTime();
	const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
	const numberOfNights = Math.floor(timeDifference / oneDayInMilliseconds);
	return numberOfNights;
};

export const formatDateToYYYYMMDD = (dateString: string): string => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};
