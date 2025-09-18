function domController(humanBoardInstance, computerBoardInstance) {
	const humanBoard = document.querySelector('#human-board');
	const humanShips = humanBoardInstance.ships;

	const computerBoard = document.querySelector('#computer-board');
	const computerShips = computerBoardInstance.ships;
	const computerMissedSquares = computerBoardInstance.missedSquares;

    computerMissedSquares.push([0,0])
    const computerHitSquares = computerBoardInstance.hitSquares;
    computerHitSquares.push([1,5]);

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

        if(isCellMissed){
            cell.style.backgroundColor = '#3e4247'
        }
	}

    function highlightHitSquares(col,row,cell, boardInstance){
        const hitSquares = boardInstance.hitSquares;

        const isCellHit = hitSquares.some(([hitCol,hitRow]) => {
            return hitCol === col && hitRow === row;
        })

        if(isCellHit){
            cell.style.backgroundColor = '#cc2a25'
        }
    }
	function renderBoard(boardElement, boardInstance) {
        boardElement.innerHTML = ''; // clear board

		for (let col = 0; col < 10; col++) {
			for (let row = 0; row < 10; row++) {
				const cell = document.createElement('button');

				cell.dataset.col = col;
				cell.dataset.row = row;

				// Highlight human player's ships
				if (boardInstance === humanBoardInstance) {
					highlightHumanShips(col, row, cell);
				}

				// Mark hits & misses
				highlightMissedSquares(col, row, cell, boardInstance);
                highlightHitSquares(col,row,cell,boardInstance)

				boardElement.appendChild(cell);
			}
		}
	}

	function renderHumanBoard() {
		renderBoard(humanBoard, humanBoardInstance);
	}

	function renderComputerBoard() {
		renderBoard(computerBoard, computerBoardInstance);
	}

	return { renderComputerBoard, renderHumanBoard };
}

export default domController;
