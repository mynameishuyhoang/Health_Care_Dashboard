import React, { useState } from "react";
import './styles.scss'
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Products {
    _id: string;
    image: string;
    name: string;
    calo: number;
    protein: number;
    lipid: number;
    sugar: number;
    starch: number;
    inputPrice: number;
    outputPrice: number;
    amount: number;
    description: string;
}

const Voucher = () => {

    const [listIdSelected, setListIdSelected] = useState<string[]>([])
    const [products, setProducts] = useState<Products[]>([]);

    const handleGetProducts = async () => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/product`)
            console.log('data: ', data);
            setProducts(data?.data || [])

        } catch (err) {
            console.log(err)
        }
    }

    // [1,2,3,4]
    const handleSelectProducts = (id?: string) => {
        if (listIdSelected?.includes(id as string)) {
            setListIdSelected(listIdSelected.filter((x) => x !== id))
        } else {
            setListIdSelected(listIdSelected.concat(id as string))
        }
    }

    console.log('listIdSelected: ', listIdSelected);


    React.useEffect(() => {
        handleGetProducts()
    }, [])

    return (
        <div className="product-container">
            <p style={{
                fontSize: '20px',
                fontWeight: '600',
                margin: '15.5px 0'
            }}>Quản lý sản phẩm</p>
            <hr />
            <div className="data-action">
                <Button className="btn">Thêm</Button>
                <Button className="btn">Xoá</Button>
                <Button className="btn">Cập nhật</Button>
            </div>
            <hr />
            <div className="data-product-container">
                <div className="data-label">
                    <p style={{ width: '5%' }}></p>
                    <p style={{ width: '10%' }}>Hình ảnh</p>
                    <p style={{ width: '14%', textAlign: 'left' }}>Tên sản phẩm</p>
                    <p style={{ width: '5%', textAlign: 'left' }}>Calo</p>
                    <p style={{ width: '5%', textAlign: 'left' }}>Protein</p>
                    <p style={{ width: '5%', textAlign: 'left' }}>Lipid</p>
                    <p style={{ width: '5%', textAlign: 'left' }}>Sugar</p>
                    <p style={{ width: '5%', textAlign: 'left' }}>Starch</p>
                    <p style={{ width: '8%', textAlign: 'left' }}>Giá nhập</p>
                    <p style={{ width: '8%', textAlign: 'left' }}>Giá bán</p>
                    <p style={{ width: '5%', textAlign: 'left' }}>Số lượng</p>
                    <p style={{ width: '25%', textAlign: 'left' }}>Mô tả</p>
                </div>
                <hr />
                {products?.map((item: any, idx: number) => (
                    <div key={idx} className="data-product">
                        <Checkbox {...label} className="select-data" value={item._id}
                            onChange={() => {
                                // setListIdSelected(item._id)
                                handleSelectProducts(item?._id)
                                console.log('id: ', item._id);

                            }} />
                        <div style={{ width: '10%' }}>
                            <img src={item.image} alt="" style={{
                                width: '80px',
                                height: '80px'
                            }} />
                        </div>
                        <p style={{ width: '14%', textAlign: 'left' }}>{item.name}</p>
                        <p style={{ width: '5%', textAlign: 'left' }}>{item.calo}</p>
                        <p style={{ width: '5%', textAlign: 'left' }}>{item.protein}</p>
                        <p style={{ width: '5%', textAlign: 'left' }}>{item.lipid}</p>
                        <p style={{ width: '5%', textAlign: 'left' }}>{item.sugar}</p>
                        <p style={{ width: '5%', textAlign: 'left' }}>{item.starch}</p>
                        <p style={{ width: '8%', textAlign: 'left' }}>{item.inputPrice}</p>
                        <p style={{ width: '8%', textAlign: 'left' }}>{item.exportPrice}</p>
                        <p style={{ width: '5%', textAlign: 'left' }}>{item.amount}</p>
                        <p style={{ width: '25%', textAlign: 'left', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Voucher
