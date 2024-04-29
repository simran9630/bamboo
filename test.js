// test.js

import { expect } from 'chai';
import { add, subtract } from './calculator.js';

describe('Calculator', () => {
    describe('add', () => {
        it('should add two numbers correctly', () => {
            expect(add(1, 2)).to.equal(3);
        });

        it('should handle negative numbers', () => {
            expect(add(-1, 2)).to.equal(1);
        });
    });

    describe('subtract', () => {
        it('should subtract two numbers correctly', () => {
            expect(subtract(5, 3)).to.equal(2);
        });

        it('should handle negative results', () => {
            expect(subtract(2, 5)).to.equal(-3);
        });
    });
});
