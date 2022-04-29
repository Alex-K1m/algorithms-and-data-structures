[![CI](https://github.com/alex-kim-dev/algorithms-and-data-structures/actions/workflows/ci.yml/badge.svg)](https://github.com/alex-kim-dev/algorithms-and-data-structures/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/alex-kim-dev/algorithms-and-data-structures/branch/main/graph/badge.svg?token=8AB442KM0N)](https://codecov.io/gh/alex-kim-dev/algorithms-and-data-structures)

# Algorithms & data structures

This repo contains implementations of algorithms and data structures written in typescript and using TDD approach for educational purposes.

## So far I've learned

### Data structures

- [x] [Linked list](/src/data-structures/linked-list/LinkedList.ts) • [test](/src/data-structures/linked-list/LinkedList.test.ts) • [cheat sheet](#linked-list)
  - [x] [Doubly Linked list](/src/data-structures/doubly-linked-list/DoublyLinkedList.ts) • [test](/src/data-structures/doubly-linked-list/DoublyLinkedList.test.ts) • [cheat sheet](#doubly-linked-list)
- [x] [Stack](/src/data-structures/stack/Stack.ts) • [test](/src/data-structures/stack/Stack.test.ts) • [cheat sheet](#stack)
- [x] [Queue](/src/data-structures/queue/Queue.ts) • [test](/src/data-structures/queue/Queue.test.ts) • [cheat sheet](#queue)
  - [x] [Priority Queue](/src/data-structures/priority-queue/PriorityQueue.ts) • [test](/src/data-structures/priority-queue/PriorityQueue.test.ts) • [cheat sheet](#priority-queue)
  - [x] [Deque](/src/data-structures/deque/Deque.ts) • [test](/src/data-structures/deque/Deque.test.ts) • [cheat sheet](#deque)
- [x] [Hash table](/src/data-structures/hash-table/HashTable.ts) • [test](/src/data-structures/hash-table/HashTable.test.ts) • [cheat sheet](#hash-table)
- [x] [Heap](/src/data-structures/heap/Heap.ts) • [test](/src/data-structures/heap/Heap.test.ts) • [cheat sheet](#heap)
- Tree
  - [x] [Binary search tree](/src/data-structures/tree/BinarySearchTree.ts) • [test](/src/data-structures/tree/BinarySearchTree.test.ts) • [cheat sheet](#binary-search-tree)

### Algorithms

- [Sorting](/src/algorithms/sorting/Sorter.ts) • [test](/src/algorithms/sorting/Sorter.test.ts) • [cheat sheet](#sorting)
  - [x] bubble
  - [x] selection
  - [x] insertion
  - [x] heap
  - [x] merge
  - [x] quick
  - [x] shell
  - [x] counting
  - [x] radix

## Resources

- [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms) - huge thanks to [@trekhleb](https://github.com/trekhleb) for making such an awesome learning resource!
- [Hexlet](https://hexlet.io/) - programming courses
- [Programiz](https://www.programiz.com/dsa)
- [The Algorithms](https://the-algorithms.com/) - open source library
- [Data structures and algorithms](https://www.youtube.com/playlist?list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8) - youtube playlist

## Cheat sheet

### Linked list

_Singly linked list_ - a data structure consisting of a collection of nodes, each holding a value and a reference to the next node, the last one of which is linked to a terminator.

- ✔️ efficient insertion or removal (during iteration) without reallocation or reorganization of the entire structure
- ❌ does not allow direct access

Common interface:

- `head` - first node
- `tail` - either everything except head, or last node
- `last` - last node
- `prepend(value)`
- `append(value)`
- `delete(value)`
- `deleteHead()` (Last, Tail)
- `find(value)`
- other methods applicable to lists

Can be used to implement ADTs: list, stack, queue, associative array

| Access | Search | Insertion | Deletion |
| :----: | :----: | :-------: | :------: |
|   n    |   n    |     1     |    1     |

[🠕 data-structures](#data-structures)

### Doubly linked list

Each node holds additional reference to the previous node (or terminator). Has the same pros/cons as linked list, but also (compared to linked list):

- ✔️ can be traversed backwards
- ✔️ no need to keep previous node while traversing

common interface: same

Can be used to implement deque

| Access | Search | Insertion | Deletion |
| :----: | :----: | :-------: | :------: |
|   n    |   n    |     1     |    1     |

[🠕 data-structures](#data-structures)

### Stack

An abstract data type that serves as a collection of elements, with two principal operations (LIFO):

- push - adds an element to the collection
- pop - removes the most recently added element that was not yet removed

Common interface:

- `top`
- `push(value)`
- `pop()`
- `peek()`

Can be implemented with array, linked list

| Access | Search | Insertion | Deletion |
| :----: | :----: | :-------: | :------: |
|   n    |   n    |     1     |    1     |

[🠕 data-structures](#data-structures)

### Queue

An abstract data type, a collection of entities that are maintained in a sequence and can be modified by the addition of entities at one end of the sequence and the removal of entities from the other end of the sequence (FIFO).

Common interface:

- `front`
- `rear`
- `enqueue(value)`
- `dequeue()`
- `peek()`

Can be implemented with linked list

| Access | Search | Insertion | Deletion |
| :----: | :----: | :-------: | :------: |
|   n    |   n    |     1     |    1     |

[🠕 data-structures](#data-structures)

### Priority queue

Additionally each element has a "priority" associated with it. An element with high priority is served before an element with low priority. If two elements have the same priority, they are served according to their order in the queue.

Common interface: same with additional priority parameter for some methods, could be `insert`/`pull` instead of enqueue/dequeue.

Can be implemented with heap

[🠕 data-structures](#data-structures)

### Deque

_Double ended queue_ is an abstract data type that generalizes a queue, for which elements can be added to or removed from either the front or rear (back). Thus, it does not follow FIFO rule. Could be:

- input restricted - input is restricted at a single end but allows deletion at both the ends
- output restricted - output is restricted at a single end but allows insertion at both the ends

Common interface:

- `addFront(value)`
- `addBack(value)`
- `removeFront()`
- `removeBack()`
- `peekFront()`
- `peekBack()`

Can be implemented with doubly linked list

[🠕 data-structures](#data-structures)

### Hash table

_Hash table/map_ is a data structure that can map keys to values. Uses a _hash function_ to compute an index into an array of buckets or slots, from which the desired value can be found. Most hash table designs employ an imperfect hash function, which might cause hash collisions. Such collisions must be accommodated in some way.

Common interface:

- `set(key, value)`
- `get(key)`
- `delete(key)`
- `has(key)`

Can be used to implement ADTs: associative array

| Access | Search | Insertion | Deletion |
| :----: | :----: | :-------: | :------: |
|  n/a   |  1, n  |   1, n    |   1, n   |

[🠕 data-structures](#data-structures)

### Heap

A specialized tree-based data structure that satisfies the heap property, where any given node is:

- _min heap_ - always smaller than the child node/s and the key of the root node is the smallest among all other nodes (min heap property)
- _max heap_ - always greater than its child node/s and the key of the root node is the largest among all other nodes (max heap property)

The node at the "top" of the heap with no parents is called the root node. A common implementation of a heap is the binary heap, in which the tree is a binary tree.

Common interface:

- `heapify()` (up, down)
- `add(value)`
- `poll()`
- `peek()`
- `delete(value)`

Can be implemented with array

| Find Min/Max | Search | Insertion | Deletion |
| :----------: | :----: | :-------: | :------: |
|      1       | log n  |   log n   |  log n   |

[🠕 data-structures](#data-structures)

### Binary search tree

_Tree_ is an abstract data type — or data structure implementing this ADT — that simulates a hierarchical tree structure, with a root value and subtrees of children with a parent node, represented as a set of linked nodes.

In a _binary tree_ each node has no more than 2 children (left & right).

A _binary search tree_ follows a specific ordering property - on any subtree the left nodes are less than the root node, which is less than all the right nodes.
Could be balanced - has roughly the same number of nodes on the both sides of a subtree - and unbalanced (sequence). Can be traversed in 3 ways (for a<-b->c):

- inorder `abc` - typical case, allows traversing in order from min to max
- preorder `bac`
- postorder `acb`

Common interface:

- `left`
- `right`
- `parent`
- `insert(value)`
- `find(value)` or min/max
- `contains(value)`
- `remove(value)`

Can be used to implement ADTs: tree

|  Access  |  Search  | Insertion | Deletion |
| :------: | :------: | :-------: | :------: |
| log n, n | log n, n | log n, n  | log n, n |

[🠕 data-structures](#data-structures)

### Sorting

- **Bubble**: compares adjacent elements and swaps them if they are in the wrong order, repeated until there're no pairs to swap
- **Selection**: finds a minimum in the 2nd part of the array, puts it at the end of the 1st part, shifting the boundary between the parts
- **Insertion**: "bubbles" one element at a time by decrementing the index
- **Heap**: uses a [heap](#heap) data structure to keep unsorted elements, polling the min from the top iteratively to form a sorted list
- **Merge**: divides the unsorted list into n sublists, each containing one element (considered sorted), then repeatedly merges sublists
- **Quick**: selects a "pivot" element and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. Sorts the sub-arrays recursively. _This can be done in-place, requiring small additional amounts of memory O(log(n))_
- **Shell**: starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared. It can move some out-of-place elements into position faster than a simple nearest neighbor exchange.
- **Counting**: a non-comparative integer sorting algorithm; calculates frequencies and then uses arithmetic to determine the positions of each value in the output sequence. Works best when the range of numbers (r) for each sequence element is very small. Often used as a subroutine in radix sort.
- **Radix**: a non-comparative sorting algorithm that sorts integers by grouping them by the individual digits which share the same significant position and value. Because integers can represent strings of characters and specially formatted floating point numbers, radix sort is not limited to integers. The efficiency depends on the length of longest key (k).

| Name      |     Best      |         Average         |            Worst            | Memory | Stable |
| --------- | :-----------: | :---------------------: | :-------------------------: | :----: | :----: |
| Bubble    |       n       |      n<sup>2</sup>      |        n<sup>2</sup>        |   1    |   +    |
| Selection | n<sup>2</sup> |      n<sup>2</sup>      |        n<sup>2</sup>        |   1    |   +    |
| Insertion |       n       |      n<sup>2</sup>      |        n<sup>2</sup>        |   1    |   +    |
| Heap      | n&nbsp;log(n) |      n&nbsp;log(n)      |        n&nbsp;log(n)        |   1    |   -    |
| Merge     | n&nbsp;log(n) |      n&nbsp;log(n)      |        n&nbsp;log(n)        |   n    |   +    |
| Quick     | n&nbsp;log(n) |      n&nbsp;log(n)      |        n<sup>2</sup>        | log(n) |   +    |
| Shell     | n&nbsp;log(n) | depends on gap sequence | n&nbsp;(log(n))<sup>2</sup> |   1    |   -    |
| Counting  |     n + r     |          n + r          |            n + r            | n + r  |   +    |
| Radix     |      nk       |           nk            |             nk              | n + k  |   +    |

[🠕 algorithms](#algorithms)
