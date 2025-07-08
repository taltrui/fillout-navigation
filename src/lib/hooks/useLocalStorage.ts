"use client";
import { useEffect, useState } from "react";

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
	const [storedValue, setStoredValue] = useState<T>(initialValue);

	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				const item = window.localStorage.getItem(key);
				if (item) {
					setStoredValue(JSON.parse(item));
				}
			} catch (error) {
				console.warn(`Error reading localStorage key "${key}":`, error);
			}
		}
	}, [key]);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === key && e.newValue !== null) {
				try {
					setStoredValue(JSON.parse(e.newValue));
				} catch (error) {
					console.warn(`Error parsing localStorage value for key "${key}":`, error);
				}
			}
		};

		window.addEventListener("storage", handleStorageChange);

		const handleCustomStorageChange = (e: CustomEvent) => {
			if (e.detail.key === key) {
				setStoredValue(e.detail.value);
			}
		};

		window.addEventListener("localStorage-change", handleCustomStorageChange as EventListener);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			window.removeEventListener("localStorage-change", handleCustomStorageChange as EventListener);
		};
	}, [key]);

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
				// Dispatch custom event to notify other components in same tab
				window.dispatchEvent(
					new CustomEvent("localStorage-change", {
						detail: { key, value: valueToStore },
					})
				);
			}
		} catch (error) {
			console.warn(`Error setting localStorage key "${key}":`, error);
		}
	};

	return [storedValue, setValue];
}
