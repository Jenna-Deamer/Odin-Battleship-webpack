import ship from '../ship';
import { test, expect } from '@jest/globals';

const shipOne = ship(3);
shipOne.hit()
shipOne.hit()
shipOne.hit()

test('Check number of hits the ship has and marks it as sunk if it === the length', () => {
	expect(shipOne.isSunk()).toBeTruthy();
});
