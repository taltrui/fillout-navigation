"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageNavigation from "@/components/page-navigation";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import type { Page } from "@/types/page";

function HomeContent() {
	const selectedPage = useSearchParams().get("selected-page");
	const [pages] = useLocalStorage<Page[]>("navigation-pages", []);

	const page = pages.find((p) => p.id === selectedPage) || {
		id: "",
		name: "There are no pages, please add one",
	};

	return (
		<div className="flex flex-col min-h-screen p-4 pb-0 font-[family-name:var(--font-inter)] w-screen">
			<div className="flex-1 bg-blue-950 rounded-lg p-10 flex-col flex">
				<span className="text-white text-5xl">Page</span>
				<span className="text-white text-2xl mt-4">{page.name}</span>
			</div>
			<PageNavigation />
		</div>
	);
}

export default function Home() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<HomeContent />
		</Suspense>
	);
}
