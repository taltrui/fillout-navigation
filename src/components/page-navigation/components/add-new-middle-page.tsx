import Image from "next/image";
import PlusIcon from "@/assets/plus-small.svg";

interface AddNewMiddlePageProps {
	isLast?: boolean;
	onAddPage?: () => void;
}

function AddNewMiddlePage({
	isLast = false,
	onAddPage,
}: AddNewMiddlePageProps) {
	const handleClick = () => {
		if (onAddPage) {
			onAddPage();
		}
	};

	return (
		<div
			className={`group relative flex items-center justify-center w-5 ${isLast ? "" : "hover:w-14"} transition-all duration-300 ease-in-out`}
		>
			{!isLast && (
				<button
					type="button"
					onClick={handleClick}
					className="flex items-center justify-center w-4 h-4 shadow-[var(--button-shadow)] border-[0.5px] border-button-border bg-white rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out hover:bg-gray-50"
				>
					<Image src={PlusIcon} alt="Add new page" />
				</button>
			)}
			<div className="absolute h-[1.5px] mb-[1px] w-full border-b border-background-stroke border-dashed -z-10"></div>
		</div>
	);
}

export default AddNewMiddlePage;
