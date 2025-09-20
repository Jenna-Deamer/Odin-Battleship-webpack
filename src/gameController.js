import domController from './domController.js';
import player from './player.js';
import ship from './ship.js';

function gameController() {
	const placeShipButton = document.querySelector('#place-ships-btn');
	const humanPlayer = player();
	const computerPlayer = player();
	let isGameOver = false;
	let currentTurn = humanPlayer;

	function updateBoards() {
		dom.renderHumanBoard();
		dom.renderComputerBoard();
	}

	function computerTurn() {
		if (isGameOver) return;
		console.log('Computer Turn');

		// Attack
		let result;
		while (result !== 'Miss') {
			const row = Math.floor(Math.random() * 10);
			const col = Math.floor(Math.random() * 10);
			result = humanPlayer.board.receiveAttack([col, row]);
		}
		updateBoards();

		// check sunk status
		if (humanPlayer.board.checkSunkStatus()) {
			isGameOver = true;
			alert('Game Over ' + 'Computer Wins');
		} else if (computerPlayer.board.checkSunkStatus()) {
			isGameOver = true;
			alert('Game Over ' + 'Human Wins');
		}
		if (result === 'Miss') {
			currentTurn = humanPlayer;
		}
	}
	function randomizeShipPlacement(boardInstance) {
		const shipsToPlace = [ship(2), ship(3), ship(3), ship(4), ship(5)];

		shipsToPlace.forEach((shipObj) => {
			let placed = false;
			while (!placed) {
				const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
				const row = Math.floor(Math.random() * 10);
				const col = Math.floor(Math.random() * 10);
				const result = boardInstance.placeShip([row, col], direction, shipObj);
				if (result === 'Ship Placed') placed = true;
			}
		});
	}

	placeShipButton.addEventListener('click', () => {
		randomizeShipPlacement(humanPlayer.board);
		randomizeShipPlacement(computerPlayer.board);

		updateBoards();

		placeShipButton.style.display = 'none';
	});

	function attachBoardEventListeners() {
		const cells = document.querySelectorAll('#computer-board button');
		cells.forEach((cell) => {
			cell.addEventListener('click', () => {
				if (currentTurn !== humanPlayer || isGameOver) return; // exit if its not human's turn or if game is over

				// Store clicked pos & attack
				const row = parseInt(cell.dataset.row);
				const col = parseInt(cell.dataset.col);

				let result = computerPlayer.board.receiveAttack([col, row]);
				console.log(result);
				updateBoards();

				// check sunk status
				if (humanPlayer.board.checkSunkStatus()) {
					isGameOver = true;
					alert('Game Over ' + 'Computer Wins');
				} else if (computerPlayer.board.checkSunkStatus()) {
					isGameOver = true;
					alert('Game Over ' + 'Human Wins');
				} else {
					// Only switch turns if Human misses
					if (result === 'Miss') {
						currentTurn = computerPlayer;
						computerTurn();
					}
				}
			});
		});
	}

	// Human player ships
	// const destroyer = ship(2);
	// const submarine = ship(3);
	// const cruiser = ship(3);
	// const battleship = ship(4);
	// const carrier = ship(5);

	// humanPlayer.board.placeShip([2, 2], 'horizontal', destroyer);
	// humanPlayer.board.placeShip([2, 5], 'vertical', submarine);
	// humanPlayer.board.placeShip([6, 2], 'horizontal', battleship);
	// humanPlayer.board.placeShip([0, 0], 'vertical', cruiser);
	// humanPlayer.board.placeShip([9, 0], 'horizontal', carrier);

	// Computer player ships
	// const destroyer2 = ship(2);
	// const submarine2 = ship(3);
	// const cruiser2 = ship(3);
	// const battleship2 = ship(4);
	// const carrier2 = ship(5);

	// computerPlayer.board.placeShip([1, 1], 'horizontal', destroyer2);
	// computerPlayer.board.placeShip([3, 4], 'vertical', submarine2);
	// computerPlayer.board.placeShip([5, 5], 'horizontal', battleship2);
	// computerPlayer.board.placeShip([0, 6], 'vertical', cruiser2);
	// computerPlayer.board.placeShip([7, 2], 'horizontal', carrier2);

	const dom = domController(humanPlayer.board, computerPlayer.board);
	dom.initBoard(document.querySelector('#human-board'));
	dom.initBoard(document.querySelector('#computer-board'));

	updateBoards();
	attachBoardEventListeners();
}

export default gameController;
