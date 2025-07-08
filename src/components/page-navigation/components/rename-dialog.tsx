import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface RenameDialogProps {
	open: boolean;
	onRename: (newName: string) => void;
	onClose: () => void;
}

export function RenameDialog({ open, onRename, onClose }: RenameDialogProps) {
	const [pageName, setPageName] = useState("");

	const handleRename = () => {
		if (pageName.trim() === "") {
			return;
		}
		onRename(pageName);
		setPageName("");
		onClose();
	};

	return (
		<AlertDialog open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Change page name</AlertDialogTitle>
					<AlertDialogDescription>
						<Input
							placeholder="New name"
							value={pageName}
							onChange={(e) => setPageName(e.target.value.trim())}
						/>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleRename}
						disabled={pageName.trim() === ""}
						className="bg-selected-icon hover:bg-selected-icon/80 text-white"
					>
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
