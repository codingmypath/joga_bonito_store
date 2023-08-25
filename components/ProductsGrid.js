import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;

`;
 
export default function ProductsGrid({...newProducts}) {
    // console.log("ProductsGrid newProducts:", newProducts.newProducts.newProducts.newProducts.length)
    return (
        <StyledProductsGrid>
                {newProducts.newProducts.newProducts.newProducts?.length > 0 && newProducts.newProducts.newProducts.newProducts.map(product => (
                    <ProductBox key={product._id} {...product} />
                ))}
        </StyledProductsGrid>
    )
}