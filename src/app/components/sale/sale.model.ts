import { Product } from '../product/product.model';


export interface Sale{
    amountProducts: number ,
	productos : Product[],
	statusTable: boolean, 
	price: number,
	numberTable: number
}