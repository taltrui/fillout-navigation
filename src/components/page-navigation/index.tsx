"use client";
import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { Fragment, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import AddNewMiddlePage from "./components/add-new-middle-page";
import AddNewPage from "./components/add-new-page";
import NavigationButton from "./components/navigation-button";
import { useLocalStorage } from "../../lib/hooks/useLocalStorage";
import InfoIcon from "../ui/icons/info-icon";
import CheckCircleIcon from "../ui/icons/check-circle-icon";
import FileIcon from "../ui/icons/file-icon";
import type { Page } from "@/types/page";

const getIconByPosition = (index: number, length: number) => {
	if (index === 0) return InfoIcon;
	if (index === length - 1) return CheckCircleIcon;
	return FileIcon;
};

function PageNavigation() {
	const router = useRouter();
	const [pages, setPages] = useLocalStorage<Page[]>("navigation-pages", []);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (active.id !== over?.id) {
			setPages((items) => {
				const oldIndex = items.findIndex((item: Page) => item.id === active.id);
				const newIndex = items.findIndex((item: Page) => item.id === over?.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}

	function handleAddPage() {
		const newPage = {
			id: uuidv4(),
			name: "New page",
		};
		router.push(`?selected-page=${newPage.id}`);
		setPages((prevPages) => [...prevPages, newPage]);
	}

	function handleAddMiddlePage(index: number) {
		const newPage = {
			id: uuidv4(),
			name: "New page",
		};
		router.push(`?selected-page=${newPage.id}`);
		setPages((prevPages) => {
			const newPages = [...prevPages];
			newPages.splice(index + 1, 0, newPage);
			return newPages;
		});
	}

	function handleRename(id: string, newName: string) {
		setPages((prevPages) =>
			prevPages.map((page) =>
				page.id === id ? { ...page, name: newName } : page,
			),
		);
	}

	function handleDuplicate(id: string) {
		const pageToClone = pages.find((page) => page.id === id);
		if (pageToClone) {
			const newPage = {
				id: uuidv4(),
				name: `${pageToClone.name} (copy)`,
			};
			const pageIndex = pages.findIndex((page) => page.id === id);
			setPages((prevPages) => {
				const newPages = [...prevPages];
				newPages.splice(pageIndex + 1, 0, newPage);
				return newPages;
			});
		}
	}

	function handleDelete(id: string) {
		setPages((prevPages) => prevPages.filter((page) => page.id !== id));
	}

	function handleSetAsFirstPage(id: string) {
		const pageToSetFirst = pages.find((page) => page.id === id);
		if (pageToSetFirst) {
			setPages((prevPages) => [
				pageToSetFirst,
				...prevPages.filter((page) => page.id !== id),
			]);
		}
	}

	if (!isMounted) {
		// Prevent rendering until the component is mounted to avoid hydration issues
		return null;
	}

	return (
		<div className="relative w-full overflow-x-auto py-4">
			<div className="relative z-10 flex items-center min-w-max">
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
					modifiers={[restrictToHorizontalAxis]}
				>
					<SortableContext
						items={pages}
						strategy={horizontalListSortingStrategy}
					>
						{pages.map((page: Page, index) => (
							<Fragment key={page.id}>
								<NavigationButton
									key={page.id}
									page={page}
									Icon={getIconByPosition(index, pages.length)}
									onRename={handleRename}
									onDuplicate={handleDuplicate}
									onDelete={handleDelete}
									onSetAsFirstPage={handleSetAsFirstPage}
								/>
								<AddNewMiddlePage
									key={`add-${page.id}`}
									isLast={index === pages.length - 1}
									onAddPage={() => handleAddMiddlePage(index)}
								/>
							</Fragment>
						))}
					</SortableContext>
				</DndContext>
				<AddNewPage onAddPage={handleAddPage} />
			</div>
		</div>
	);
}

export default PageNavigation;
