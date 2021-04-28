let prefixZero = (num, n) => {
	return (Array(n).join('0') + num).slice(-n);
}
let createRandomNumber = (min: number, max: number): number => {
	let differ: number = max - min;
	return Math.round(min + differ * Math.random());
}

export {
	prefixZero,
	createRandomNumber
}