function domController() {
	const humanBoard = document.querySelector('#human-board');
	const computerBoard = document.querySelector('#computer-board');


	function renderHumanBoard() {
		for (let col = 0; col < 10; col++) {
			for (let row = 0; row < 10; row++) {
				const cell = document.createElement('button');
                humanBoard.appendChild(cell)
			}
			// logic to disable any misses

			// logic to color any hits
		}
	}

	function renderComputerBoard() {
        	for (let col = 0; col < 10; col++) {
			for (let row = 0; row < 10; row++) {
				const cell = document.createElement('button');
                computerBoard.appendChild(cell)
			}
			// logic to disable any misses

			// logic to color any hits
		}
    }

	return { renderComputerBoard, renderHumanBoard };
}

export default domController;
