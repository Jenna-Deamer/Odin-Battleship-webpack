import domController from './domController.js';
import player from './player.js';
import ship from './ship.js';

function gameController() {
	const humanPlayer = player();
	const computerPlayer = player();
	let isGameOver = false;
	let currentTurn = humanPlayer;

	function updateBoards() {
		dom.renderHumanBoard();
		dom.renderComputerBoard();
	}

	function computerTurn() {
		console.log('Computer Turn');
		// Attack

		// update boards

		// Check sunk status

		// switch turn
	}

	function attachBoardEventListeners() {
		const cells = document.querySelectorAll('#computer-board button');
		cells.forEach((cell) => {
			cell.addEventListener('click', () => {
				if (currentTurn !== humanPlayer || isGameOver) return; // exit if its not human's turn or if game is over

				// Check clicked positions
				const row = parseInt(cell.dataset.row);
				const col = parseInt(cell.dataset.col);

				let result = computerPlayer.board.receiveAttack([col, row]);
				console.log(result);
				updateBoards();

				// check sunk status
				if (
					humanPlayer.board.checkSunkStatus() ||
					computerPlayer.board.checkSunkStatus()
				) {
					isGameOver === true;
					console.log('Game Over');
				} else {
					// Only switch turns isf Human misses
					if (result === 'Miss') {
						currentTurn = computerPlayer;
						computerTurn();
					}
				}
			});
		});
	}

	// human player ships
	const destroyer1 = ship(2);
	const submarine1 = ship(3);
	const battleship1 = ship(4);

	humanPlayer.board.placeShip([2, 2], 'horizontal', destroyer1);
	humanPlayer.board.placeShip([2, 5], 'vertical', submarine1);
	humanPlayer.board.placeShip([6, 2], 'horizontal', battleship1);

	// computer player ships
	const destroyer2 = ship(2);
	const submarine2 = ship(3);
	const battleship2 = ship(4);

	computerPlayer.board.placeShip([0, 0], 'horizontal', destroyer2);
	computerPlayer.board.placeShip([6, 0], 'vertical', submarine2);
	computerPlayer.board.placeShip([3, 6], 'vertical', battleship2);

	const dom = domController(humanPlayer.board, computerPlayer.board);
	dom.initBoard(document.querySelector('#human-board'));
	dom.initBoard(document.querySelector('#computer-board'));

	updateBoards();
	attachBoardEventListeners();
}

export default gameController;
