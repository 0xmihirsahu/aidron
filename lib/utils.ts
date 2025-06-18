import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BOT_EMOJIS = ['🤖', '🦾', '🧠', '🎯', '🔮'];

export const getRandomBotEmoji = () => {
  return BOT_EMOJIS[Math.floor(Math.random() * BOT_EMOJIS.length)];
};

export const isPlaceholderUrl = (url: string) => {
  if (!url) return true;
  return url.includes('your-cdn.com') || url.includes('example.com');
};
