function domController(humanBoardInstance, computerBoardInstance) {
	const humanBoard = document.querySelector('#human-board');
	const computerBoard = document.querySelector('#computer-board');

	function renderBoard(boardElement, boardInstance) {
		for (let col = 0; col < 10; col++) {
			for (let row = 0; row < 10; row++) {
				const cell = document.createElement('button');

				// Show ships if human instance
				if (boardInstance === humanBoardInstance) {
                    console.log()
				}

				// Disable hit and missed squares

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
