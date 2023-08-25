'use client'
import styled  from "styled-components"
import Center from "./Center"
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcons";
import { useContext } from "react";
import { CartContext } from "./CartContext";


const Bg = styled.div`
    background-color: #fff;
    color: #000;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 1.5rem;
    @media screen and (min-width: 768px) {
        font-size: 3rem; 
    }
`;

const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    img{
        max-width: 100%;
        max-height: 200px;
        display: block;
        margin: 0 auto;
    }
    div:nth-child(1) {
        order: 2;
    }
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.1fr 0.9fr;
        div:nth-child(1) {
            order: 0;
        }
        img{
            max-width: 100%;
        }
    }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
`;

export default function Featured({...userProduct}) {
    // const [myProduct, setMyProduct] = useState("");

    // useEffect(() => {
    //     fetchProduct();
    // }, [])

    // async function fetchProduct() {
    //     const productData =  products();
    //     const product = await productData
    //     console.log(product)
    //     setMyProduct(product)
    // }

    // console.log(products.props.product.title)

    console.log("FEATURED:", userProduct)
    console.log("FEATURED2:", userProduct.featuredProduct.featuredProduct.title)


    const {addProduct} = useContext(CartContext);
    function addFeaturedToCart() {
        addProduct(userProduct.featuredProduct.featuredProduct._id)
    }

    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                    <div>
                    <Title>{userProduct.featuredProduct.featuredProduct.title}</Title>
                    <Desc>{userProduct.featuredProduct.featuredProduct.description}
                    </Desc>
                    <ButtonsWrapper>
                        <ButtonLink href={'/product/'+userProduct.featuredProduct.featuredProduct._id} outline={1} black>Read more</ButtonLink>
                        <Button white={1} onClick={addFeaturedToCart}>
                            <CartIcon />
                            Add to cart
                        </Button>
                    </ButtonsWrapper>
                    </div>
                    </Column>
                    <Column>
                        <img src={userProduct.featuredProduct.featuredProduct.images[0]} alt="" />
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>    
    )
}