import { writable, readable } from 'svelte/store';

export const theme = writable('light');

const padDay = (day) => {
	if (day < 10) {
    return `0${day}`;
  } else {
    return `${day}`;
  }
}

const julianDay = (t) => {
	let Y = t.getFullYear();
	let M = t.getMonth() + 1;
	let D = t.getDate();

	let jd = (1461 * (Y + 4800 + (M - 14)/12))/4 +(367 * (M - 2 - 12 * ((M - 14)/12)))/12 - (3 * ((Y + 4900 + (M - 14)/12)/100))/4 + D - 32075;

	return jd; 
}

const moonCycle = (jd) => {
	const newMoon = 2458784.65139;
	const days = jd - newMoon;
	const cycles = days/29.53;
	const fraction = (cycles >= 1) ? cycles - Math.floor(cycles) : cycles;
	const dayOfCycle = fraction * 29.53;
	return dayOfCycle.toFixed(0);
}

let lunarMonth = []
for (let i = 0; i<30; i++) {
	let ts = new Date(Date.now() + (i * 86400000));
	let jd = julianDay(ts);
	let phase = moonCycle(jd);

	let y = ts.getFullYear();
	let m = ts.getMonth() + 1;
	let d = ts.getDate();

	lunarMonth.push({ 
		date: `${y}-${padDay(m)}-${padDay(d)}`, 
		phase: phase
	});
}

let timestamp = new Date(Date.now());
let todayJulian = moonCycle(julianDay(timestamp));
let lastTimestamp = new Date(Date.now() + 2505600000);
let sevenTimestamp = new Date(Date.now() + 604800000);
let todayString = `${timestamp.getFullYear()}${timestamp.getMonth() + 1}${padDay(timestamp.getDate())}`;
let lastString = `${lastTimestamp.getFullYear()}${lastTimestamp.getMonth() + 1}${padDay(lastTimestamp.getDate())}`;
let sevenString = `${sevenTimestamp.getFullYear()}${sevenTimestamp.getMonth() + 1}${padDay(sevenTimestamp.getDate())}`;

export const today = readable(todayString);
export const lastDay = readable(lastString);
export const sevenDay = readable(sevenString);
export const lunar = readable(lunarMonth);