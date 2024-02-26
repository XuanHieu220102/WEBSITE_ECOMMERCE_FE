import React, { useContext, useEffect, useState } from 'react'
import Slider from 'react-slick';
import Item from '../item/Item';
import { AppContext } from '../../context/AppProvider';
import instance from '../../api/api';

export const Tablet = () => {
    const [dataTabletProduct, setDataTabletProduct] = useState([])
    useEffect(() => {
        instance.get("/products?category=tablet")
            .then(res => {
                setDataTabletProduct(res.data.content);
            }).catch(err => {
                console.log(err);
            })
    }, [])
    const filteredProducts = dataTabletProduct.map(product => {
        const productInfo = {
            productId: product.id,
            productName: product.productName,
            price: 0,
            priceSale: 0,
            image: product.productOptions.image,
        };
        if (product.productOptions.length > 0) {
            const firstOption = product.productOptions[0];
            productInfo.price = firstOption.price;
            productInfo.image = firstOption.image;
            if (firstOption.priceSale > 0) {
                productInfo.priceSale = firstOption.priceSale;
            }
        }
        return productInfo;
    });
    console.log(filteredProducts);
    const { settings } = useContext(AppContext)
    return (
        <div>
            <div className='ads'>
                <img className='ads-img' src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/10/31/web-htc-wildfire-e3-lite-03.jpg" alt="" />
            </div>
            <div className="box-product-header">
                <p>TABLET</p>
            </div>
            <div className='ins-content'>
                <Slider {...settings}>
                    {filteredProducts.map((item, index) => (
                        item.priceSale > 0 && (
                            <div className="slider-item" key={index}>
                                <Item
                                    id={item.productId}
                                    img={item.image}  // Chỉnh sửa thành item.image nếu trường img không tồn tại trong dữ liệu
                                    name={item.productName}
                                    priceSale={item.priceSale}
                                    price={item.price}
                                />
                            </div>
                        )
                    ))}
                </Slider>
            </div>
        </div>
    )
}    