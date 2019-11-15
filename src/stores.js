import { writable, readable } from 'svelte/store';

export const theme = writable('light');

const padDay = (day) => {
	if (day < 10) {
    return `0${day}`;
  } else {
    return `${day}`;
  }
}

let timestamp = new Date(Date.now());
let lastTimestamp = new Date(Date.now() + 2505600000);
let sevenTimestamp = new Date(Date.now() + 604800000);
let todayString = `${timestamp.getFullYear()}${timestamp.getMonth() + 1}${padDay(timestamp.getDate())}`;
let lastString = `${lastTimestamp.getFullYear()}${lastTimestamp.getMonth() + 1}${padDay(lastTimestamp.getDate())}`;
let sevenString = `${sevenTimestamp.getFullYear()}${sevenTimestamp.getMonth() + 1}${padDay(sevenTimestamp.getDate())}`;

export const today = readable(todayString);
export const lastDay = readable(lastString);
export const sevenDay = readable(sevenString);