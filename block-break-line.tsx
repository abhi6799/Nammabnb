type BlockBreakLineProps = {
	isMarginBig?: boolean;
	isMarginSmall?: boolean;
	isMarginMedium?: boolean;
};

export const BlockBreakLine = ({
	isMarginBig = false,
	isMarginSmall = false,
	isMarginMedium = false,
}: BlockBreakLineProps) => {
	const classes = `h-[0.2px] bg-gray-300 w-full ${isMarginBig && 'my-10'} ${
		isMarginSmall && 'my-5'
	} ${isMarginMedium && 'my-7'}`;
	return <div className={classes}></div>;
};
