import player from '../player';
import { test, expect } from '@jest/globals';


test('Create a human player with a gameboard', () => {
	const p = player('human');
	expect(p.board).toBeDefined();
});
