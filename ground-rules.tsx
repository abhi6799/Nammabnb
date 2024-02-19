import { ConfirmationPageBox } from '@/app/components/checkout/confirmation-page-box/confirmation-page-box';

interface GroundRulesProps {}

export const GroundRules = ({ ...props }: GroundRulesProps) => {
	return (
		<ConfirmationPageBox title='Ground rules'>
			<div>
				<span className='text-base'>
					We ask every guest to remember a few simple things about
					what makes a great guest.
				</span>
				<ul>
					<li className='list-item list-disc ml-5'>
						Follow the house rules
					</li>
					<li className='list-item list-disc ml-5'>
						Treat your Host’s home like your own
					</li>
				</ul>
			</div>
		</ConfirmationPageBox>
	);
};
