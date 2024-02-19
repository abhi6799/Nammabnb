'use client';

interface MenuItemProps {
	onClick: () => void;
	label: string;
	isLabelBold?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
	onClick,
	label,
	isLabelBold = false,
}) => {
	return (
		<div
			onClick={onClick}
			className={`px-4 py-3 hover:bg-neutral-100 transition ${
				isLabelBold ? 'font-bold' : 'font-semibold'
			}`}>
			{label}
		</div>
	);
};

export default MenuItem;