// не используется
export const getFromStorage = (key: string): string | null => localStorage.getItem(key)
export const setForStorage = <T>(key: string, value: T | any): void => localStorage.setItem(key, String(value))