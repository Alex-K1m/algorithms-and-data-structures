import Comparator from '../../utils/Comparator';
import Heap from './Heap';

export default class MinHeap<T = number> extends Heap<T> {
  constructor(protected compare = new Comparator<T>().reverse()) {
    super();
  }
}
