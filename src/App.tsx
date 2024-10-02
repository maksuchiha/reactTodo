import {Navigate, Route, Routes} from "react-router-dom";
import {Header} from "@components/layouts/Header";
import {Footer} from "@components/layouts/Footer";
import {HomePage} from "@pages/HomePage";
import {Paths} from "./paths";
import {Doing} from "@pages/Doing";
import {Error404} from "@pages/Error404";
import {ProductPage} from "@pages/ProductPage";
import {v1} from "uuid";
import phone from "./assets/images/phone.png"


export type ProductDataType = {
    id: string
    model: string;
    collection: string;
    price: string;
    picture: string;
}

export const adidasArr: ProductDataType[] = [
    {
        id: v1(),
        model: 'ADIDAS ADIFOM TRXN',
        collection: 'new collection1',
        price: '100200$',
        picture: phone,

    },
    {
        id: v1(),
        model: 'ADIDAS ADIFOM SUPER',
        collection: 'new collection22',
        price: '200300$',
        picture: phone
    },
    {
        id: v1(),
        model: 'ADIDAS SUPER SUPERSKI',
        collection: 'new collection333',
        price: '300400$',
        picture: phone
    }
]
export const pumaArr: ProductDataType[] = [
    {
        id: v1(),
        model: '321 ADIFOM TRXN',
        collection: 'new collection1',
        price: '1000$',
        picture: phone,

    },
    {
        id: v1(),
        model: '321 ADIFOM SUPER',
        collection: 'new 444',
        price: '200$',
        picture: phone
    },
    {
        id: v1(),
        model: '123 SUPER SUPERSKI',
        collection: 'new 444',
        price: '30$',
        picture: phone
    }
]

export const App = () => {

    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <Routes>
                        <Route path={'/'} element={<HomePage/>}/>
                        <Route path={Paths.DOING} element={<Doing path={Paths.DOING} products={adidasArr}/>}/>
                        <Route path={Paths.OFFERS} element={<Doing path={Paths.OFFERS} products={pumaArr}/>}/>
                        <Route path={Paths.PRODUCT_PAGE} element={<ProductPage products={adidasArr} productId={'productId'}/>}/>
                        <Route path={Paths.OFFERS_PAGE} element={<ProductPage products={pumaArr} productId={'productId'}/>}/>
                        <Route path={Paths.ERROR404} element={<Error404/>}/>
                        <Route path={'/*'} element={<Navigate to={Paths.ERROR404}/>}/>
                    </Routes>
                </div>
            </main>
            <Footer/>
        </>
    )
}