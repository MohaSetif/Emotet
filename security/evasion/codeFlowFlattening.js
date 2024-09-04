// ! make it simple god dammit
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function simple(x) {
	if (x > 0) {
		return x + 1;
	} else if (x < 0) {
		return x - 1;
	} else {
		return 0;
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hard(x) {
	var y = x > 0;
	var z = x < 0;
	return y ? x + 1 : z ? x - 1 : 0;
}
