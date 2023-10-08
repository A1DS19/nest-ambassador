declare class ProductCreateOrderDTO {
    id: number;
    quantity: number;
}
export declare class CreateOrderDTO {
    code: string;
    address: string;
    country: string;
    city: string;
    zip_code: string;
    products: ProductCreateOrderDTO[];
}
export {};
