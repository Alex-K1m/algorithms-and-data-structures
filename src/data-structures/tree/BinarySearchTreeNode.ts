export class BinarySearchTreeNode<T> {
  #value: T;

  private _parent: BinarySearchTreeNode<T> | null = null;

  private _left: BinarySearchTreeNode<T> | null = null;

  private _right: BinarySearchTreeNode<T> | null = null;

  constructor(value: T) {
    this.#value = value;
  }

  get value(): T {
    return this.#value;
  }

  get parent(): BinarySearchTreeNode<T> | undefined {
    return this._parent ?? undefined;
  }

  get left(): BinarySearchTreeNode<T> | undefined {
    return this._left ?? undefined;
  }

  get right(): BinarySearchTreeNode<T> | undefined {
    return this._right ?? undefined;
  }

  setValue(value: T): this {
    this.#value = value;
    return this;
  }

  setLink(
    link: 'parent' | 'left' | 'right',
    node: BinarySearchTreeNode<T> | null,
  ): this;
  setLink(
    replace: BinarySearchTreeNode<T>,
    node: BinarySearchTreeNode<T> | null,
  ): this;
  setLink(
    ref: 'parent' | 'left' | 'right' | BinarySearchTreeNode<T>,
    node: BinarySearchTreeNode<T> | null,
  ): this {
    const link =
      typeof ref === 'string'
        ? ref
        : (['parent', 'left', 'right'] as const).find(
            (prop) => this[prop] === ref,
          );

    if (link) this[`_${link}`] = node;

    return this;
  }

  setParent(node: BinarySearchTreeNode<T> | null): this {
    this._parent = node;
    return this;
  }

  setLeft(node: BinarySearchTreeNode<T> | null): this {
    this._left = node;
    return this;
  }

  setRight(node: BinarySearchTreeNode<T> | null): this {
    this._right = node;
    return this;
  }

  getChildrenNumber(): number {
    return Number(!!this.left) + Number(!!this.right);
  }
}
