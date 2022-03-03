export interface Node {
  title: string;
  image: string;
}

export interface Edge {
  node: Node;
}

export interface Products {
  edges: Edge[];
}

export interface Category {
  name: string;
  products: Products;
}
