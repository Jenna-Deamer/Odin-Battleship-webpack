function domController(humanBoardInstance, computerBoardInstance) {
	const humanBoard = document.querySelector('#human-board');
	const humanShips = humanBoardInstance.ships;
	const computerBoard = document.querySelector('#computer-board');

	function highlightHumanShips(col, row, cell) {
		const isShipCell = humanShips.some((ship) =>
			ship.positions.some((position) => {
				const [shipCol, shipRow] = position;
				return shipCol === col && shipRow === row; // returns true is pos matches
			})
		);

		if (isShipCell) {
			cell.style.backgroundColor = '#101e47';
		}
	}

	function highlightMissedSquares(col, row, cell, boardInstance) {
		const missedSquares = boardInstance.missedSquares;

		const isCellMissed = missedSquares.some(([missedCol, missedRow]) => {
			return missedCol === col && missedRow === row;
		});

		if (isCellMissed) {
			cell.style.backgroundColor = '#3e4247';
		}
	}

	function highlightHitSquares(col, row, cell, boardInstance) {
		const hitSquares = boardInstance.hitSquares;

		const isCellHit = hitSquares.some(([hitCol, hitRow]) => {
			return hitCol === col && hitRow === row;
		});

		if (isCellHit) {
			cell.style.backgroundColor = '#cc2a25';
		}
	}
    // create buttons once
	function initBoard(boardElement, ) {
		for (let col = 0; col < 10; col++) {
			for (let row = 0; row < 10; row++) {
				const cell = document.createElement('button');

				cell.dataset.col = col;
				cell.dataset.row = row;
				boardElement.appendChild(cell);
			}
		}
	}

    // update button styles
	function renderBoard(boardElement, boardInstance) {
        const cells = boardElement.querySelectorAll('button');
        
    cells.forEach((cell) => {
        const col = parseInt(cell.dataset.col);
        const row = parseInt(cell.dataset.row);

		// Highlight human player's ships
		if (boardInstance === humanBoardInstance) {
			highlightHumanShips(col, row, cell);
		}

		// Mark hits & misses
		highlightMissedSquares(col, row, cell, boardInstance);
		highlightHitSquares(col, row, cell, boardInstance);
    });
    
	}

	function renderHumanBoard() {
		renderBoard(humanBoard, humanBoardInstance);
	}

	function renderComputerBoard() {
		renderBoard(computerBoard, computerBoardInstance);
	}

	return { renderComputerBoard, renderHumanBoard , initBoard};
}

export default domController;
