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

// Utility function to convert byte array to hex string
export const formatAptosAddress = (address: string | Record<string, number> | unknown): string => {
  if (typeof address === 'string') {
    // If it's already a string, return as is
    return address;
  }
  
  if (address && typeof address === 'object' && !Array.isArray(address)) {
    const addressObj = address as Record<string, unknown>;
    
    // Check if the address is nested under 'data' property
    let bytesObj: Record<string, number>;
    if (addressObj.data && typeof addressObj.data === 'object' && addressObj.data !== null) {
      bytesObj = addressObj.data as Record<string, number>;
    } else {
      bytesObj = addressObj as Record<string, number>;
    }
    
    const bytes: number[] = [];
    
    // Extract numeric values from the object
    for (let i = 0; i < 32; i++) {
      const byteValue = bytesObj[i];
      if (byteValue !== undefined && typeof byteValue === 'number') {
        bytes.push(byteValue);
      }
    }
    
    // If we found bytes, convert to hex
    if (bytes.length > 0) {
      return '0x' + bytes.map((byte: number) => byte.toString(16).padStart(2, '0')).join('');
    }
  }
  
  return String(address);
};
