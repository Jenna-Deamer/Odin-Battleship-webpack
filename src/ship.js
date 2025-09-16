function ship(length) {
	if (length <= 0) {
		console.warn('Error - ship length must be positive');
	}

	let hits = 0;

	function hit() {
		hits++;
	}

	function isSunk() {
		if (length === hits) {
			return true;
		} else {
			return false;
		}
	}

	return { length, isSunk, hit };
}

module.exports = ship;
