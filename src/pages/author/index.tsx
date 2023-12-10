import React, { useState } from "react";
import './styles.scss'
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Author {
    username: string
    password: string
    name: string
    adult: number
    child: number
    phone: string
    email: string
    address: string
}

const Author = () => {

    const [listIdSelected, setListIdSelected] = useState<string[]>([])
    const [customer, setCustomer] = useState<Author[]>([]);

    const handleGetAuthor = async () => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/customer`)
            console.log('data: ', data);
            setCustomer(data?.data || [])

        } catch (err) {
            console.log(err)
        }
    }

    // [1,2,3,4]
    const handleSelectAuthor = (id?: string) => {
        if (listIdSelected?.includes(id as string)) {
            setListIdSelected(listIdSelected.filter((x) => x !== id))
        } else {
            setListIdSelected(listIdSelected.concat(id as string))
        }
    }

    console.log('listIdSelected: ', listIdSelected);


    React.useEffect(() => {
        handleGetAuthor()
    }, [])

    return (
        <div className="author-container">
            <p style={{
                fontSize: '20px',
                fontWeight: '600',
                margin: '15.5px 0'
            }}>Quản lý khách hàng</p>
            <hr />
            <div className="data-action">
                <Button className="btn">Thêm</Button>
                <Button className="btn">Xoá</Button>
                {/* <Button className="btn">Cập nhật</Button> */}
            </div>
            <hr />
            <div className="data-author-container">
                <div className="data-label">
                    <p style={{ width: '5%' }}></p>
                    <p style={{ width: '10%' }}>Tên đăng nhập</p>
                    <p style={{ width: '10%', textAlign: 'left' }}>Họ tên</p>
                    <p style={{ width: '10%', textAlign: 'left' }}>Người lớn</p>
                    <p style={{ width: '10%', textAlign: 'left' }}>Trẻ em</p>
                    <p style={{ width: '16%', textAlign: 'left' }}>Địa chỉ</p>
                    <p style={{ width: '10%', textAlign: 'left' }}>Số điện thoại</p>
                    <p style={{ width: '15%', textAlign: 'left' }}>Email</p>
                </div>
                <hr />
                {customer?.map((item: any, idx: number) => (
                    <div key={idx} className="data-author">
                        <Checkbox {...label} className="select-data" value={item._id}
                            onChange={() => {
                                // setListIdSelected(item._id)
                                handleSelectAuthor(item?._id)
                                console.log('id: ', item._id);

                            }} />
                        <p style={{ width: '10%', textAlign: 'left' }}>{item.username}</p>
                        <p style={{ width: '10%', textAlign: 'left' }}>{item.name}</p>
                        <p style={{ width: '10%', textAlign: 'left' }}>{item.adult}</p>
                        <p style={{ width: '10%', textAlign: 'left' }}>{item.child}</p>
                        <p style={{ width: '16%', textAlign: 'left' }}>{item.address}</p>
                        <p style={{ width: '10%', textAlign: 'left' }}>{item.phone}</p>
                        <p style={{ width: '15%', textAlign: 'left' }}>{item.email}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Author
