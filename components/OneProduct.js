'use client'
import Center from "@/components/Center";
import  styled  from "styled-components";
import Title from "./Title";
import { useParams } from "next/navigation";
import ProductImages from "./ProductImages";
import Button from "./Button";
import CartIcon from "./icons/CartIcons";
import { useContext } from "react";
import { CartContext } from "./CartContext";

// const ProductsGrid = styled.div`
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr 1fr;
//     gap: 20px;

// `;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen adn (min-width: 768px) {
        grid-template-columns: 0.8fr 1.2fr;
    }
    gap: 40px;
    margin: 40px 0;
`;

// const ColWrapper = styled.div`
//     display: grid;
//     grid-template-columns: 0.8fr 1.2fr;
// `;

// const WhiteBox = styled.div`
//     background-color: #fff;
//     border-radius: 10px;
//     padding: 30px;
//     gap: 40px;
//     margin-top: 40px;
// `;

const WhiteBox = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const PriceRow = styled.div`
    display: flex;
    gap: 20px; 
    align-items: center;
`;

const Price = styled.span`
    font-size: 1.2rem;
`;

// const BigImage = styled.img`
//         max-width: 100 %;
// `;


export default function OneProduct({...product}) {
    const {addProduct} = useContext(CartContext);
    // console.log("Product:", product.products.product)
    const { id } = useParams()

    // console.log("ID:", id)
    const item = product.products.product.find(item => item._id === id)
    // console.log(item);

    return (
        <>
        <Center>
            <ColumnsWrapper>
                <WhiteBox>
                    <ProductImages images={item.images} />
                </WhiteBox>
                <div>
                    <Title>{item.title}</Title>
                    <p>{item.description}</p>
                    <PriceRow>
                        <div><Price>${item.price}</Price> </div>
                        <div><Button primary onClick={() => addProduct(item._id)}><CartIcon /> Add to cart</Button></div>
                    </PriceRow>
                    
                </div>
            </ColumnsWrapper>
        </Center>
        </>
    )
}
