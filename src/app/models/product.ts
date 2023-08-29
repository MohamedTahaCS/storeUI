export interface Product {
    id: number;
    name: string;
    description: string;
    categoryName: string;
    price: number;
    imageUri: string;
    brandName: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    productCode: string;
    rating: number;
    quantity: number;
}