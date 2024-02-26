import { useContext, useEffect, useState } from "react"
import "../../styles/FlashSale.css"
import ClockSale from "../app/ClockSale"
import Item from "../item/Item"
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { AppContext } from "../../context/AppProvider";
import instance from "../../api/api";

const FlashSale = () => {
    const [btnActive, setBtnActive] = useState('mobilephone');
    const [dataFlashSale, setDataFlashSale] = useState([])
    useEffect(() => {
        instance.get(`/products?category=${btnActive}`)
            .then(res => {
                setDataFlashSale(res.data.content);
            }).catch(err => {
                console.log(err);
            })
    }, [btnActive])
    console.log(dataFlashSale);
    const filteredProducts = dataFlashSale.map(product => {
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
                productInfo.priceSale = product.productOptions[0].price; // Lỗi ở đây
            }
        }
        return productInfo;
    });
    const { settings } = useContext(AppContext)
    const hanleButtonClick = (index) => {
        setBtnActive(index)
    }
    return <>
        <div className="FlashSale_container">
            <div className="header_FlashSale">
                <h3>FLASH SALE ONLINE</h3>
                <ul className="flashSale_nav">
                    <li className="flashSale_nav_item"><button className={`btn-flashSale ${btnActive === 'mobilephone' ? 'active' : ''}`} onClick={() => { hanleButtonClick('mobilephone') }}>Điện thoại/Tablet</button></li>
                    <li className="flashSale_nav_item"><button className={`btn-flashSale ${btnActive === 'laptop' ? 'active' : ''}`} onClick={() => { hanleButtonClick('laptop') }}>Laptop/Màn hình/Tivi</button></li>
                    <li className="flashSale_nav_item"><button className={`btn-flashSale ${btnActive === 'screen' ? 'active' : ''}`} onClick={() => { hanleButtonClick('screen') }}>Đồng hồ/Phụ kiện/khác</button></li>
                </ul>
                <div className="Clock_Sale"><ClockSale /></div>
            </div>
            <div className="content_FlashSale">
                <Slider {...settings}>
                    {filteredProducts && filteredProducts.map((item, index) => (
                        item.priceSale > 0 && (
                            <div className="slider-item" key={index}>
                                <Item
                                    id = {item.productId}
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
    </>
}

export default FlashSale