export interface ProductTypes {
  id: string;
  boutiqueId: string;
  merchantId: string;
  image: string;
  brand: string;
  title: string;
  size?: [];
  slug: string;
  rating: number;
  price: string;
  label: string;
  fastDelivery: boolean;
  freeCargo: boolean;
  pageCategory: string;
}
