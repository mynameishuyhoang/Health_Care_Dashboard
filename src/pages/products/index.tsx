import React, { useState } from "react";
import './styles.scss'
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import Stack from "@mui/material/Stack";
import { Box, Pagination, TextField } from "@mui/material";
import CancelIcon from '../../assets/icons/cancel.png'
import CustomModal from "../../components/modal";
import { useForm } from "react-hook-form";
import AddModal from "./components/add-product";


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
    exportPrice: number;
    amount: number;
    description: string;
}

const Product = () => {

    const [listIdSelected, setListIdSelected] = useState<string[]>([])
    const [products, setProducts] = useState<Products[]>([]);
    const [totalPage, setTotalPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [open, setOpen] = React.useState(false);


    const handleClose = () => setOpen(false);
    const handleAddProduct = () => setOpen(true)


    const handleGetProducts = async (pageSize?: number, pageNumber?: number) => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/product/get`, null, {
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber
                }
            })
            console.log('data: ', data);
            setProducts(data?.data || [])
            setTotalPage(data?.totalPage)

        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
        handleGetProducts(6, value)
    };

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
        handleGetProducts(6, 1)
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
                <Button className="btn" onClick={handleAddProduct}>Thêm</Button>
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
            <Stack spacing={2} style={{ marginBottom: '20px' }}>
                <Pagination className="pagination-container" color="primary" count={totalPage} page={pageNumber} onChange={handleChange} />
            </Stack>
            <AddModal isOpenAdd={open} handleCloseAdd={handleClose} handleGetProducts={handleGetProducts} />
            {/* <CustomModal isOpen={open} handleClose={handleClose} style={{
                width: '600px', height: '300px',
                background: 'white', outline: '1px solid gray', borderRadius: '12px'
            }}>
                <>
                    <p style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', color: '#FF8F8F' }}>Thêm đơn vị vận chuyển</p>
                    <img className="icon-cancel" onClick={handleClose} src={CancelIcon} alt="" />
                    <hr />
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                            display: 'grid',
                            margin: '10px 20%'
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Tên đơn vị vận chuyển" variant="outlined" required />
                        <TextField id="outlined-basic" label="Giá vận chuyển" variant="outlined" type="number" required />
                    </Box>
                    <Button style={{
                        display: 'flex',
                        outline: '1px solid, gray',
                        padding: '8px',
                        background: 'red',
                        color: 'white',
                        width: '80px',
                        margin: 'auto'
                    }}


                    >Thêm</Button>
                </>

            </CustomModal>
            <CustomModal isOpen={open} handleClose={handleClose} style={{
                width: '600px', height: '300px',
                background: 'white', outline: '1px solid gray', borderRadius: '12px'
            }}>
                <>
                    <p style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', color: '#FF8F8F' }}>Cập nhật đơn vị vận chuyển</p>
                    <img className="icon-cancel" onClick={handleClose} src={CancelIcon} alt="" />
                    <hr />
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                            display: 'grid',
                            margin: '10px 20%'
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Tên đơn vị vận chuyển" variant="outlined" required />
                        <TextField id="outlined-basic" label="Giá vận chuyển" variant="outlined" type="number" required />
                    </Box>
                    <Button style={{
                        display: 'flex',
                        outline: '1px solid, gray',
                        padding: '8px',
                        background: 'red',
                        color: 'white',
                        width: '80px',
                        margin: 'auto'
                    }}


                    >Thêm</Button>
                </>

            </CustomModal> */}
        </div>
    )
}


export default Product
