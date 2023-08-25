'use client'
import Center from "@/components/Center";
import Header from "@/components/Header";
import  styled  from "styled-components";
import ProductBox from "./ProductBox";
import Title from "./Title";

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;


export default function AllProducts({...all}) {
    // console.log("ALL:", all.all.all)
    return (
        <Center>
            <Title>All Products</Title>
            <ProductsGrid>
                {all.all.all?.length > 0 && all.all.all.map(product => (
                    <ProductBox key={product._id} {...product} />
                ))}
            </ProductsGrid>
        </Center>
    )
}
