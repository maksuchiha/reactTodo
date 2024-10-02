import {FC} from "react";
import {Navigate, useParams} from "react-router-dom";
import {Paths} from "../paths";
import {ProductDataType} from "../App";
import {ProductCard} from "../components/ui";

type ProductPagePropsType = {
    productId: string
    products: ProductDataType[]
}

export const ProductPage:FC<ProductPagePropsType> = ({productId, products}) => {
    const addressId = useParams()
    const getProduct = products.find(item => item.id === addressId[productId])

    return (
        <div>
            {getProduct ? <ProductCard productData={getProduct}/> : <Navigate to={Paths.ERROR404}/>}
        </div>
    );
};