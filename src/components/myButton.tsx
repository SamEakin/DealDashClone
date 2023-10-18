import { Button } from "@mantine/core";

interface MyButtonProps {
	bidAmount: number,
	onClick: (() => any)
}

export default function MyButton({ bidAmount, onClick }: MyButtonProps) {

	return (
		<Button onClick={onClick}>
			Enter Bid: {bidAmount}
		</Button>
	);
}