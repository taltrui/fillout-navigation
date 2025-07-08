import {
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenu as DropdownMenuPrimitive,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import Flag from "@/assets/flag.svg";
import Pencil from "@/assets/pencil.svg";
import Copy from "@/assets/copy.svg";
import Trash from "@/assets/trash.svg";
import Duplicate from "@/assets/duplicate.svg";

interface SettingsMenuProps {
	children: React.ReactNode;
	onRename: () => void;
	onDuplicate: () => void;
	onDelete: () => void;
	onSetAsFirstPage: () => void;
}

function SettingsMenu({
	children,
	onRename,
	onDuplicate,
	onDelete,
	onSetAsFirstPage,
}: SettingsMenuProps) {
	return (
		<DropdownMenuPrimitive>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="start">
				<DropdownMenuLabel className="font-medium text-md text-text-base">
					Settings
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="font-medium text-text-base"
						onClick={onSetAsFirstPage}
					>
						<Image src={Flag} alt="Set as first page" width={16} height={16} />
						Set as first page
					</DropdownMenuItem>
					<DropdownMenuItem
						className="font-medium text-text-base"
						onClick={onRename}
					>
						<Image src={Pencil} alt="Rename" width={16} height={16} />
						Rename
					</DropdownMenuItem>
					<DropdownMenuItem className="font-medium text-text-base">
						<Image src={Copy} alt="Copy" width={16} height={16} />
						Copy
					</DropdownMenuItem>
					<DropdownMenuItem
						className="font-medium text-text-base"
						onClick={onDuplicate}
					>
						<Image src={Duplicate} alt="Duplicate" width={16} height={16} />
						Duplicate
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="mx-2" />
				<DropdownMenuItem
					className="font-medium text-danger-text"
					onClick={onDelete}
				>
					<Image src={Trash} alt="Delete" width={16} height={16} />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenuPrimitive>
	);
}

export default SettingsMenu;
