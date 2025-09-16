import gameboard from '../gameboard';
import ship from '../ship';
import { test, expect, jest } from '@jest/globals';

test('Places a ship at provided location if it is in bounds', () => {
	const shipOne = ship(3);
	const board = gameboard();
	board.placeShip([0, 0], 'horizontal', shipOne);

	expect(board.ships[0].positions).toEqual([
		[0, 0],
		[0, 1],
		[0, 2],
	]);
});

test('Ensure placement of ship is within gameboard bounds', () => {
	const board = gameboard();
	const mockShip = {
		length: 3,
		hit: jest.fn(),
	};
	const mockShipTwo = {
		length: 2,
		hit: jest.fn(),
	};
	expect(board.placeShip([0, 8], 'horizontal', mockShip)).toBe('Out of bounds');
	expect(board.placeShip([8, 0], 'vertical', mockShipTwo)).not.toBe(
		'Out of bounds'
	);
});

test('Check if hit was added to hitSquares arr', () => {
	const mockShip = {
		length: 3,
		hit: jest.fn(),
	};
	const board = gameboard();
	board.placeShip([0, 0], 'horizontal', mockShip);
	board.receiveAttack([0, 0]);

	// Attack a position that has a ship
	board.receiveAttack([0, 0]);
	expect(board.hitSquares).toContainEqual([0, 0]);
});
test('Check if ship hit count was increased after a hit', () => {
	const mockShip = {
		length: 3,
		hit: jest.fn(),
	};
	const board = gameboard();
	board.placeShip([0, 0], 'horizontal', mockShip);
	board.receiveAttack([0, 0]);

	expect(mockShip.hit).toHaveBeenCalled();
});
test('Check if miss was added to MissedSquares arr', () => {
	const mockShip = {
		length: 3,
		hit: jest.fn(),
	};
	const board = gameboard();
	board.placeShip([0, 0], 'horizontal', mockShip);
	// Attack a position with no ship
	board.receiveAttack([5, 5]);
	expect(board.missedSquares).toContainEqual([5, 5]);
});

test('Check if attack on a already hit/missed square is handled', () => {
	const board = gameboard();
    board.hitSquares.push([1, 1]);
	// Attack a position that is in hits arr
	expect(board.receiveAttack([1, 1])).toBe('Already attacked');
});

test('Check if all ships on the board have been sunk', () => {
	const board = gameboard();
	const realShip = ship(3);
	board.placeShip([0, 0], 'horizontal', realShip);

	// Attack all positions
	board.receiveAttack([0, 0]);
	board.receiveAttack([0, 1]);
	board.receiveAttack([0, 2]);

	expect(board.checkSunkStatus()).toBe('All ships are down');
});
