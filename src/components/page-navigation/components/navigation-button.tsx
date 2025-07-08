"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter, useSearchParams } from "next/navigation";
import DropdownMenu from "./settings-menu";
import { DeleteDialog } from "./delete-dialog";
import { useState } from "react";
import { RenameDialog } from "./rename-dialog";
import MoreVertical from "@/assets/more-vertical.svg";
import Image from "next/image";
import type { Page } from "@/types/page";

const buttonStyles = {
	base: "group flex items-center px-2.5 py-1 rounded-lg transition-all duration-250 ease-in-out font-medium text-sm border-[0.5px] overflow-hidden active:scale-105",
	default:
		"bg-button-base/15 hover:bg-button-base/35 text-text-secondary border-transparent",
	selected:
		"bg-white shadow-[var(--button-shadow)] text-text-base focus:shadow-[var(--button-shadow-focus)] border-button-border focus:border-button-border-focus focus:outline-none",
	dragging: "opacity-50 shadow-lg z-50",
	menuIcon: "text-text-secondary transition-all duration-250 ease-in-out",
};
interface NavigationButtonProps {
	page: Page;
	Icon: React.ElementType;
	onRename?: (id: string, newName: string) => void;
	onDuplicate?: (id: string) => void;
	onDelete?: (id: string) => void;
	onSetAsFirstPage?: (id: string) => void;
}

function NavigationButton({
	page,
	Icon,
	onRename,
	onDuplicate,
	onDelete,
	onSetAsFirstPage,
}: NavigationButtonProps) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [renameDialogOpen, setRenameDialogOpen] = useState(false);
	const router = useRouter();
	const selectedPage = useSearchParams().get("selected-page");
	const selected = selectedPage === page.id;

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: page.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const handleClick = () => {
		router.push(`?selected-page=${page.id}`);
	};

	const handleRename = (newName: string) => {
		if (onRename) onRename(page.id, newName);
	};

	const handleDuplicate = () => {
		if (onDuplicate) onDuplicate(page.id);
	};

	const handleDelete = () => {
		if (onDelete) onDelete(page.id);
	};

	const openDeleteDialog = () => {
		setDeleteDialogOpen(true);
	};

	const closeDeleteDialog = () => {
		setDeleteDialogOpen(false);
	};

	const openRenameDialog = () => {
		setRenameDialogOpen(true);
	};

	const closeRenameDialog = () => {
		setRenameDialogOpen(false);
	};

	const handleSetAsFirstPage = () => {
		if (onSetAsFirstPage) onSetAsFirstPage(page.id);
	};

	return (
		<div className="relative">
			<div
				ref={setNodeRef}
				style={style}
				className="bg-white rounded-lg"
				{...attributes}
				{...listeners}
			>
				<button
					onClick={handleClick}
					type="button"
					className={`${buttonStyles.base} ${
						selected ? buttonStyles.selected : buttonStyles.default
					} ${isDragging ? buttonStyles.dragging : ""} cursor-grab active:cursor-grabbing`}
				>
					<Icon
						className={`h-5 w-5 ${selected ? "text-selected-icon" : "text-text-secondary"}`}
					/>
					<span className="ml-1.5">{page.name}</span>
					{!isDragging && (
						<DropdownMenu
							onRename={openRenameDialog}
							onDuplicate={handleDuplicate}
							onDelete={openDeleteDialog}
							onSetAsFirstPage={handleSetAsFirstPage}
						>
							<div
								className={`${buttonStyles.menuIcon} ${selected ? "opacity-100 w-4 ml-2" : "opacity-0 w-0"} cursor-pointer`}
							>
								<Image src={MoreVertical} alt="More options" />
							</div>
						</DropdownMenu>
					)}
				</button>
			</div>
			<DeleteDialog
				open={deleteDialogOpen}
				onDelete={handleDelete}
				onClose={closeDeleteDialog}
			/>
			<RenameDialog
				open={renameDialogOpen}
				onRename={handleRename}
				onClose={closeRenameDialog}
			/>
		</div>
	);
}

export default NavigationButton;
