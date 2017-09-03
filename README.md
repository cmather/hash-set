HashSet
===============================================================================
A hash based set implementation. A HashSet allows adding any type as a value.
The key benefit over using the standard Set class is that values are hashed by
value instead of by reference. This allows two sets constructed at different
times to be compared by their values. We can also add a set as a member of a
superset and test whether the set is a member of the superset.

The hash key for a particular value is calculated as follows:

1. `toHashKey()`: If the value has a toHashKey method defined then this method
   is called to get the key.

2. `number`: If the value is a number then the value is used directly as the
   key.

3. `string`: If the value is any other type it is converted to a string and the
   numberic hash key is computed on the string using the `hashString` method of
   the HashSet.

The hash key for an entire set (a composite key) is calculated as follows:

```javascript
let compositeKey = set.hashString(set.keys().join(''));
```

## Usage

### Adding Values
```javascript
let a = new HashSet();
a.add(0); //=> true
a.add(0); //=> false
a.add(1); //=> true
a.size //=> 2
```

### Set Operations
```javascript
let a = new HashSet();
a.add(0);
a.add(1);

let b = new HashSet();
b.add(1);
b.add(2);

a.difference(b); //=> {0}

a.union(b); //=> {0, 1, 2}

a.intersection(b); //=> {1}
```

### Set Membership
```javascript
let a = new HashSet();
a.add(0);
a.add(1);

a.has(0); //=> true
a.has(5); //=> false
```

### Super Sets
```javascript
let superset = new HashSet();

let subset = new HashSet([0, 1]);
superset.add(subset);

let subsetWithSameValues = new HashSet([0, 1]);
superset.has(subsetWithSameValues); //=> true
```
