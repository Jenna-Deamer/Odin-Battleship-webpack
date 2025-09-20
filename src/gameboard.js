function gameboard() {
	let ships = [];
	let hitSquares = [];
	let missedSquares = [];

	function placeShip(startPos, direction, ship) {
		if (
			startPos[0] < 0 ||
			startPos[0] > 9 ||
			startPos[1] < 0 ||
			startPos[1] > 9
		) {
			console.warn('Start position is out of bounds');
			return 'Out of bounds';
		}

		let positions = [];

		if (direction === 'horizontal') {
			for (let i = 0; i < ship.length; i++) {
				let row = startPos[0];
				let col = startPos[1] + i;

				if (col < 0 || col >= 10) {
					return 'Out of bounds';
				}

				positions.push([row, col]);
			}
		} else if (direction === 'vertical') {
			for (let i = 0; i < ship.length; i++) {
				let row = startPos[0] + i;
				let col = startPos[1];

				if (row < 0 || row >= 10) {
					return 'Out of bounds';
				}

				positions.push([row, col]);
			}
		}


		// push ship with occupied tiles
		ships.push({ ship, positions });
		return 'Ship Placed';
	}

	function receiveAttack(attackPos) {
		const alreadyAttacked =
			hitSquares.some(
				(pos) => pos[0] === attackPos[0] && pos[1] === attackPos[1]
			) ||
			missedSquares.some(
				(pos) => pos[0] === attackPos[0] && pos[1] === attackPos[1]
			);

		if (alreadyAttacked) {
			return 'Already attacked';
		}

		// for each ship loop through pos arr & check for attackPos
		for (let i = 0; i < ships.length; i++) {
			const shipObj = ships[i];
			for (let j = 0; j < shipObj.positions.length; j++) {
				const currentPos = shipObj.positions[j];

				if (currentPos[0] === attackPos[0] && currentPos[1] === attackPos[1]) {
					hitSquares.push(currentPos);
					shipObj.ship.hit();
					return 'Hit';
				}
			}
		}

		missedSquares.push(attackPos);
		return 'Miss';
	}

	function checkSunkStatus() {
		const allShipsAreSunk = ships.every((shipObj) => shipObj.ship.isSunk());
		if (allShipsAreSunk) {
			return true;
		} else {
			return false;
		}
	}

	return {
		placeShip,
		receiveAttack,
		checkSunkStatus,
		ships,
		hitSquares,
		missedSquares,
	};
}

export default gameboard;
