export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  icon: string;
  pdfUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}
