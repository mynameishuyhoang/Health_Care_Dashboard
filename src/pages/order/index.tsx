import React, { useState } from "react";
import './styles.scss'
import Button from "@mui/material/Button";
import axios from "axios";
import moment from "moment";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomModal from "../../components/modal";
import CancelIcon from '../../assets/icons/cancel.png'


interface DataOrder {
    customerId: string,
    status: number,
    products: OrderProduct[]
}

interface OrderProduct {
    productId: string,
    image: string,
    productName: string,
    quantity: number,
    exportPrice: number,
}

const Order = () => {

    const [dataOrder, setDataOrder] = useState<DataOrder[]>([]);
    const [open, setOpen] = React.useState(false);
    const [orderSelected, setOrderSelected] = React.useState<any>();


    const handleOpen = (listOrder?: any) => {
        setOrderSelected(listOrder)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const handleGetOrder = async () => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/order`)
            console.log('dataOrder get all: ', data?.data);
            setDataOrder(data?.data || [])

        } catch (err) {
            console.log(err)
        }
    }

    // [1,2,3,4]

    const handleConvertTimeStamp = (timeStamp: string) => {

        const timeFormatted = moment(timeStamp).format('DD/MM/YYYY')

        return timeFormatted;
    }

    const handleCalculateTotalPrice = (listProducts?: any) => {
        let summary = 0;

        listProducts.forEach((item: any) => {
            const { quantity, exportPrice } = item;
            const productSummary = quantity * exportPrice;
            summary += productSummary;
        });

        return summary;
    }

    const handleUpdateStatusOrder = async (id?: string, status?: number) => {
        try {
            const data = await axios.put(`https://healthcare-bkmr.onrender.com/api/order/update/${id}`, {
                status: status
            })
            console.log('Data-after-update-status: ', data?.data);
            // toastMessage('success', 'Huỷ đặt hàng thành công')
            handleGetOrder()
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        handleGetOrder()
    }, [])

    return (
        <div className="order-container">
            <p style={{
                fontSize: '20px',
                fontWeight: '600',
                margin: '15.5px 0'
            }}>Quản lý đặt hàng</p>
            <hr />
            <div className="data-order-container">
                <div className="data-label">
                    <p style={{ width: '5%' }}></p>
                    <p style={{ width: '15%', fontWeight: '600' }}>Mã đơn hàng</p>
                    <p style={{ width: '15%', textAlign: 'left', fontWeight: '600' }}>Ngày mua</p>
                    <p style={{ width: '15%', textAlign: 'left', fontWeight: '600' }}>Tổng thanh toán</p>
                    <p style={{ width: '15%', textAlign: 'left', fontWeight: '600' }}>Mã khách hàng</p>
                    <p style={{ width: '15%', textAlign: 'center', fontWeight: '600' }}>Chi tiết đơn hàng</p>
                    <p style={{ width: '15%', textAlign: 'left', fontWeight: '600' }}>Trạng thái</p>
                </div>
                <hr />
                {dataOrder?.map((item: any, idx: number) => (
                    <div key={idx} className="data-order">
                        <p className="select-data"></p>
                        {/* <Checkbox {...label} className="select-data" value={item._id}
                            onChange={() => {
                                // setListIdSelected(item._id)
                                handleSelectOrder(item?._id)
                                console.log('id: ', item._id);

                            }} /> */}
                        <p style={{ width: '15%', textAlign: 'left', fontWeight: '600' }}>{item?._id.substring(item?._id.length - 8, item?._id.length)}</p>
                        <p style={{ width: '15%', textAlign: 'left', fontWeight: '600' }}>{handleConvertTimeStamp(item?.updateAt)}</p>
                        <p style={{ width: '15%', textAlign: 'left', fontWeight: '600' }}>{handleCalculateTotalPrice(item?.products)}</p>
                        <p style={{ width: '15%', textAlign: 'left', fontWeight: '600' }}>{item?.customerId.substring(item?.customerId.length - 8, item?.customerId.length)}</p>
                        <Button style={{ width: '15%', marginBottom: '8px' }} onClick={() => handleOpen(item?.products)}>Click</Button>
                        <Box sx={{ minWidth: 120, marginBottom: '8px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label={
                                        item?.status === 1 ? "Xác nhận đơn hàng"
                                            : item?.status === 2 ? "Đang giao hàng"
                                                : item?.status === 3 ? "Đã giao hàng" : "Đơn hàng bị huỷ"
                                    }
                                    value={item?.status}
                                    onChange={(e) => handleUpdateStatusOrder(item?._id, e.target.value)}
                                >
                                    <MenuItem value={1}>Xác nhận đơn hàng</MenuItem>
                                    <MenuItem value={2}>Đang giao hàng</MenuItem>
                                    <MenuItem value={3}>Đã giao hàng</MenuItem>
                                    <MenuItem value={4}>Đơn hàng bị huỷ</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                ))}
            </div>
            <CustomModal isOpen={open} handleClose={handleClose} style={{
                width: '900px', height: '600px',
                background: 'white', outline: '1px solid gray', borderRadius: '12px'
            }}>
                <>
                    <p style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', color: '#FF8F8F' }}>Chi tiết đơn hàng</p>
                    <img className="icon-cancel" onClick={handleClose} src={CancelIcon} alt="" />
                    <hr />
                    <div style={{ display: 'flex', margin: '10px 10px' }}>
                        <p style={{ width: '20%', fontWeight: '600', fontSize: '18px' }}>Hình ảnh</p>
                        <p style={{ width: '20%', fontWeight: '600', fontSize: '18px' }}>Tên sản phẩm</p>
                        <p style={{ width: '20%', fontWeight: '600', fontSize: '18px' }}>Số lượng</p>
                        <p style={{ width: '20%', fontWeight: '600', fontSize: '18px' }}>Đơn giá</p>
                        <p style={{ width: '20%', fontWeight: '600', fontSize: '18px' }}>Thành tiền</p>
                    </div>
                    <hr />
                    {orderSelected?.map((item: any, idx: number) => (
                        <div className="sub-data-order">
                            <div style={{ width: '20%' }}>
                                <img className="product-img" src={item?.image} alt="" />
                            </div>
                            <p>{item?.productName}</p>
                            <p>{item?.quantity}</p>
                            <p>{item?.exportPrice}</p>
                            <p>{parseInt(item?.quantity) * parseInt(item?.exportPrice)}</p>
                        </div>
                    ))}
                </>
            </CustomModal>
        </div>
    )
}


export default Order
