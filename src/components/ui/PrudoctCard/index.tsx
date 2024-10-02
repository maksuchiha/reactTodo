import React, {FC} from 'react';
import {ProductDataType} from "../../../App";
import {WebpImage} from "@components/ui/WebpImage";

type ProductCardPropsType = {
    productData: ProductDataType
}

export const ProductCard:FC<ProductCardPropsType> = ({productData}) => {


    return (
        <div>
            <div>
                <WebpImage src={productData.picture} alt={productData.model}/>
            </div>
            <div>
                {productData.model}
            </div>
            <div>
                {productData.collection}
            </div>
            <div>
                {productData.price}
            </div>
        </div>
    );
};

export default ProductCard;