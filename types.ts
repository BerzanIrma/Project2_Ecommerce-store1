export interface Category {
  id: string;
  name: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  isFeatured: boolean;
  category: Category;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}
