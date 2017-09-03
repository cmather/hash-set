"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const hash_set_1 = require("./hash-set");
describe('HashSet', function () {
    describe('#constructor()', function () {
        it('should construct', function () {
            new hash_set_1.HashSet();
        });
        it('should allow passing initial values', function () {
            let set = new hash_set_1.HashSet([0, 1, 2]);
            assert.deepEqual(set.values(), [0, 1, 2], 'wrong initial values');
        });
    });
    describe('#add()', function () {
        it('should add a value to the set', function () {
            let set = new hash_set_1.HashSet();
            let result = set.add(0);
            assert(result, 'result should be truthy to indicate the value was added');
            assert.equal(set.size, 1, 'set size should be 1');
        });
        it('should not an existing item to the set again', function () {
            let set = new hash_set_1.HashSet();
            set.add(0);
            let result = set.add(0);
            assert(!result, 'result should be false to indicate the value was not added');
            assert.equal(set.size, 1, 'set size should still be 1');
        });
        it('should allow adding string values', function () {
            let set = new hash_set_1.HashSet();
            set.add('0');
            let keys = set.keys();
            assert.equal(set.size, 1, 'set should be of size 1');
            assert.deepEqual(keys, [set.hashString('0')]);
        });
        it('should use toHashKey method of item if defined', function () {
            class CustomItem {
                constructor(value) {
                    this.value = value;
                }
                toHashKey() {
                    return this.value + 1;
                }
            }
            let set = new hash_set_1.HashSet();
            set.add(new CustomItem(0));
            set.add(new CustomItem(1));
            assert.deepEqual(set.keys(), [1, 2], 'wrong keys');
        });
    });
    describe('#remove()', function () {
        it('should remove an item from the set', function () {
            let set = new hash_set_1.HashSet();
            set.add(0);
            set.add(1);
            assert.equal(set.size, 2, 'set should have two items');
            let result = set.remove(0);
            assert(result, 'result should be true to indicate the item was removed');
            assert.equal(set.size, 1, 'set size should have reduced to 1');
        });
        it('should return false if item does not exist in set', function () {
            let set = new hash_set_1.HashSet();
            assert.equal(set.size, 0, 'set should have 0 items');
            let result = set.remove(0);
            assert(!result, 'result should be false to indicate the item was not in the set');
        });
    });
    describe('#has()', function () {
        it('should return true if the set has an item', function () {
            let set = new hash_set_1.HashSet();
            set.add(0);
            set.add(1);
            assert(set.has(0), 'set should have item 0');
            assert(set.has(1), 'set should have item 1');
        });
        it('should return false if the set does not have the item', function () {
            let set = new hash_set_1.HashSet();
            set.add(0);
            set.add(1);
            assert(!set.has(2), 'set should not have item 2');
        });
    });
    describe('#forEach()', function () {
        it('should iterate over the values in key sorted order', function () {
            let set = new hash_set_1.HashSet();
            set.add(0);
            set.add(1);
            set.add(2);
            let expected = [0, 1, 2];
            let actual = [];
            set.forEach(v => actual.push(v));
            assert.deepEqual(actual, expected, 'wrong forEach result');
        });
    });
    describe('#difference()', function () {
        it('should return the set difference from another set', function () {
            let a = new hash_set_1.HashSet();
            let b = new hash_set_1.HashSet();
            a.add(0);
            a.add(1);
            b.add(1);
            b.add(2);
            assert.deepEqual(a.difference(b).values(), [0], 'wrong difference');
        });
    });
    describe('#union()', function () {
        it('should return the union of two sets', function () {
            let a = new hash_set_1.HashSet();
            let b = new hash_set_1.HashSet();
            a.add(0);
            a.add(1);
            b.add(1);
            b.add(2);
            assert.deepEqual(a.union(b).values(), [0, 1, 2], 'wrong union');
        });
    });
    describe('#intersection()', function () {
        it('should return the intersection of two sets', function () {
            let a = new hash_set_1.HashSet();
            let b = new hash_set_1.HashSet();
            a.add(0);
            a.add(1);
            b.add(1);
            b.add(2);
            assert.deepEqual(a.intersection(b).values(), [1], 'wrong intersection');
        });
    });
    describe('#keys()', function () {
        it('should return the keys for the set', function () {
            let set = new hash_set_1.HashSet();
            set.add('a');
            set.add('b');
            set.add('c');
            let expected = ['a', 'b', 'c'].map(c => set.hashString(c));
            assert.deepEqual(set.keys(), expected);
        });
    });
    describe('#values()', function () {
        it('should return the values for the set', function () {
            let set = new hash_set_1.HashSet();
            set.add('a');
            set.add('b');
            set.add('c');
            let expected = ['a', 'b', 'c'];
            assert.deepEqual(set.values(), expected);
        });
    });
    describe('#toHashKey()', function () {
        it('should return a combined hash key for the set', function () {
            let set = new hash_set_1.HashSet();
            set.add(0);
            set.add(1);
            set.add(2);
            let expected = set.hashString([0, 1, 2].join(''));
            assert.equal(set.toHashKey(), expected, 'wrong combined hash key');
        });
    });
    describe('Super Sets', function () {
        it('should be able to act like a superset', function () {
            let superset = new hash_set_1.HashSet();
            let subset = new hash_set_1.HashSet([0, 1]);
            superset.add(subset);
            // note that we're creating a NEW HashSet with the same values as the previous
            // subset.
            let sameValuesSubset = new hash_set_1.HashSet([0, 1]);
            superset.has(sameValuesSubset); //=> true
        });
    });
});
