'use client'
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.2fr .7fr;
    }
    gap: 40px;
    margin-top: 40px;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 75px;
    height: 100px;
    padding: 2px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 60px;
        max-height: 60px;
    }
    @media screen and (min-width: 768px) {
        padding: 10px;
        width: 100px;
        height: 100px;
        img{
            
            max-width: 80px;
            max-height: 80px;
        }
    }
`;

const QuantityLabel = styled.span`
    padding: 0 15px;
    display: block;
    @media screen and (min-width: 768px) {
        display: inline-block;
        padding: 0 10px;
    }
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;


export default function CartPage() {
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [goToCheckout, setGoToCheckout] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        // if (cartProducts.length > 0) {
        //     axios.post('/api/cart', {ids:cartProducts})
        //     .then(response => {
        //         setProducts(response.data)
        //     })
        // }

        if (cartProducts.length > 0) { 
            // Send the data to the server in JSON format.
            const JSONdata = JSON.stringify({ids:cartProducts})
        
            // API endpoint where we send form data.
            const endpoint = '/api/cart'
            // Form the request for sending data to the server.
            const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
            }
            // Send the form data to our forms API on Vercel and get a response.
            fetch(endpoint, options)
            .then((response) => response.json())
            .then((data) => {
                console.log("DATA:", data)
                setProducts(data);
            })
        } else {
            setProducts([]);
        }


    }, [cartProducts])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true)
            clearCart();
        }

    }, [])

    function moreOfThisProduct(id) {
        addProduct(id);
    }

    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total = total + price;
    }

    async function goToPayment() {

        // Get data from the form.
        // const data = {name, 
        //     parentCategory, 
        //     properties:properties.map(p=> ({name:p.name,values:p.values.split(',')}))
        // };

        const data = {
            name, email, address, city, zipCode, country, cartProducts,
        };
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)
        console.log("JSONdata", JSONdata)
        // API endpoint where we send form data.
        const endpoint = '/api/checkout'
    
        // Form the request for sending data to the server.
        const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
            'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
        }
        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)
        const result = await response.json();
        console.log("POST Result:", result);
        // setGoToCheckout(true);
        if (result.url) {
            window.location = result.url;
        }
    }
    

    // if (goToCheckout) {
    //     router.push('/checkout')
    // }
    if (isSuccess) {
        return (
            <>
                <Header />
                <Center />
                <ColumnsWrapper>
                <Box>
                    <h1>Thank you for shopping with us!</h1>
                    <p>We will email you when your order has been processed.</p>
                </Box>
                </ColumnsWrapper> 
            </>
        )
    }

    return (
        <>
            <Header />
            <Center>
            <ColumnsWrapper>
                <Box>
                    <h2>Cart</h2>
                    {!cartProducts?.length && (
                        <div>Your cart is empty</div>
                    )}
                    {products?.length > 0 && (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <ProductInfoCell>
                                        <ProductImageBox>
                                            <img src={product.images[0]} alt="" />
                                        </ProductImageBox>
                                        {product.title}
                                    </ProductInfoCell>
                                    <td>
                                    <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                        <QuantityLabel>
                                            {cartProducts.filter(id => id === product._id).length}
                                        </QuantityLabel>
                                        <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                    </td>
                                    <td>
                                        ${cartProducts.filter(id => id === product._id).length * product.price}
                                    </td>
                                </tr>
                                ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>${total}</td>
                            </tr>
                            </tbody>
                        </Table>
                    )}
                </Box>
                {!!cartProducts?.length && (
                    <Box>
                    <h2>Order Information</h2>

                    <Input type="text" value={name} name={name} onChange={ev => setName(ev.target.value)} placeholder="Name" />
                    <Input type="text" value={email} name={email} onChange={ev => setEmail(ev.target.value)} placeholder="Email" />
                    <Input type="text" value ={address} name={address} onChange={ev => setAddress(ev.target.value)} placeholder="Street Address" />
                    <CityHolder>
                        <Input type="text" value={city} name={city} onChange={ev => setCity(ev.target.value)} placeholder="City" />
                        <Input type="text" value={zipCode} name={zipCode} onChange={ev => setZipCode(ev.target.value)} placeholder="Zip Code" />
                    </CityHolder>
                    <Input type="text" value={country} name={country} onChange={ev => setCountry(ev.target.value)} placeholder="Country" />

                    <Button black block onClick={goToPayment}>Continue to Payment</Button>
                    
                </Box>
                )}
            </ColumnsWrapper>
            </Center>
        </>
    )
}