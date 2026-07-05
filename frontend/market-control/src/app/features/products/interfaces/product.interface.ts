export interface Product {
  productId: number;
  name: string;
  unitPrice: number;
  offerAmount: number | null;
  offerPrice: number | null;
  image: ImageBuffer;
}

interface ImageBuffer {
  type: 'Buffer';
  data: number[];
}
