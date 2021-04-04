let prefixZero = (num, n) => {
	return (Array(n).join('0') + num).slice(-n);
}

export {
	prefixZero
}