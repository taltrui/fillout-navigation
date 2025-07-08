"use client";
import Image from "next/image";
import PlusIcon from "@/assets/plus.svg";

const buttonStyles = {
	base: "group flex items-center px-2.5 py-1.5 rounded-lg transition-all duration-250 ease-in-out font-medium text-sm border-[0.5px] bg-white shadow-[var(--button-shadow)] text-text-base focus:shadow-[var(--button-shadow-focus)] border-button-border focus:border-button-border-focus focus:outline-none hover:bg-gray-50",
};

interface AddNewPageProps {
	onAddPage: () => void;
}

function AddNewPage({ onAddPage }: AddNewPageProps) {
	const handleClick = () => {
		onAddPage();
	};

	return (
		<div className="bg-white rounded-lg">
			<button onClick={handleClick} type="button" className={buttonStyles.base}>
				<Image src={PlusIcon} alt="Add new page" />
				<span className="ml-1.5">Add page</span>
			</button>
		</div>
	);
}

export default AddNewPage;
