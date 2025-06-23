// Email regex pattern
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password must be at least 8 characters, include uppercase, lowercase, and a number
export const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Username must be alphanumeric and 3+ characters
export const usernamePattern = /^[a-zA-Z0-9_]{3,}$/;
