import React, { useState } from "react";
import './styles.scss'
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import Button from "@mui/material/Button";
import CustomModal from "../../components/modal";
import CancelIcon from '../../assets/icons/cancel.png'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { toastMessage } from "../../components/message";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface DataShipp {
    shippName: string,
    shippPrice: number
}

const Order = () => {

    const [listIdSelected, setListIdSelected] = useState<string[]>([])
    const [dataShipp, setDataShipp] = useState<DataShipp[]>([]);
    const [open, setOpen] = React.useState(false);
    const [shippName, setShippName] = useState<string>()
    const [shippPrice, setShippPrice] = useState<number>()
    const [shippNameUpdate, setShippNameUpdate] = useState<string>()
    const [shippPriceUpdate, setShippPriceUpdate] = useState<number>()



    const handleOpenAdd = () => {
        setOpen(true)
    };
    const handleOpenUpdate = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const handleSetShippName = (shippName?: string) => {
        setShippName(shippName)
    }

    const handleSetShippPrice = (shippPrice?: number) => {
        setShippPrice(shippPrice)
    }


    const handleGetShipp = async () => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/shipp`)
            console.log('data Shipp get all: ', data?.data);
            setDataShipp(data?.data)

        } catch (err) {
            console.log(err)
        }
    }

    // [1,2,3,4]
    const handleSelectShipp = (id?: string) => {
        if (listIdSelected?.includes(id as string)) {
            setListIdSelected(listIdSelected.filter((x) => x !== id))
        } else {
            setListIdSelected(listIdSelected.concat(id as string))
        }
    }

    console.log('listIdSelected: ', listIdSelected);

    const handleAddShipp = async (shippName?: string, shippPrice?: number) => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/shipp/add`, {
                shippName: shippName,
                shippPrice: shippPrice
            })
            console.log('add shipp data: ', data?.data);
            toastMessage('success', 'Thêm đơn vị vận chuyển thành công')
            handleClose()
            handleGetShipp()
            setShippName('')
            setShippPrice(0)

        } catch (err) {
            console.log(err)
            toastMessage('error', 'Thêm đơn vị vận chuyển không thành công')
        }
    }

    const handleDeleteShipp = async (id?: string) => {
        try {
            const { data } = await axios.delete(`https://healthcare-bkmr.onrender.com/api/shipp/delete/${id}`)
            toastMessage('success', 'Xoá đơn vị vận chuyển thành công')
            handleGetShipp()
            setListIdSelected([])

        } catch (err) {
            console.log(err)
            toastMessage('error', 'Xoá đơn vị vận chuyển không thành công')
        }
    }

    const handleUpdateShipp = async (id?: string, shippName?: string, shippPrice?: number) => {
        try {
            const { data } = await axios.patch(`https://healthcare-bkmr.onrender.com/api/shipp/update/${id}`)
            toastMessage('success', 'Cập nhật đơn vị vận chuyển thành công')
            handleClose()
            handleGetShipp()
            setListIdSelected([])


        } catch (err) {
            console.log(err)
            toastMessage('error', 'Cập nhật đơn vị vận chuyển không thành công')
        }
    }

    React.useEffect(() => {
        handleGetShipp()
    }, [])

    return (
        <div className="shipp-container">
            <p style={{
                fontSize: '20px',
                fontWeight: '600',
                margin: '15.5px 0'
            }}>Quản lý đơn vị vận chuyển</p>
            <hr />
            <div className="data-action">
                <Button className="btn" onClick={handleOpenAdd}>Thêm</Button>
                <Button className="btn" onClick={(e) => handleDeleteShipp(listIdSelected[0])}>Xoá</Button>
                <Button className="btn" onClick={
                    handleOpenUpdate
                }>Cập nhật</Button>
            </div>
            <hr />
            <div className="data-shipp-container">
                <div className="data-label">
                    <p style={{ width: '5%' }}></p>
                    <p style={{ width: '31%', fontWeight: '600' }}>Mã đơn vị vận chuyển</p>
                    <p style={{ width: '31%', textAlign: 'left', fontWeight: '600' }}>Tên đơn vị vận chuyển</p>
                    <p style={{ width: '31%', textAlign: 'left', fontWeight: '600' }}>Giá vận chuyển</p>
                </div>
                <hr />
                {dataShipp?.map((item: any, idx: number) => (
                    <div key={idx} className="data-shipp">
                        <Checkbox {...label} className="select-data" value={item._id}
                            onChange={() => {
                                // setListIdSelected(item._id)
                                handleSelectShipp(item?._id)
                                console.log('id: ', item._id);
                                setShippNameUpdate(item?.shippName)
                                setShippPriceUpdate(item?.shippPrice)
                            }} />
                        <p style={{ width: '31%', textAlign: 'left', fontWeight: '600' }}>{item?._id.substring(item?._id.length - 8, item?._id.length)}</p>
                        <p style={{ width: '31%', textAlign: 'left', fontWeight: '600' }}>{item?.shippName}</p>
                        <p style={{ width: '31%', textAlign: 'left', fontWeight: '600' }}>{item?.shippPrice} (vnđ)</p>
                    </div>
                ))}
            </div>
            <CustomModal isOpen={open} handleClose={handleClose} style={{
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
                        <TextField id="outlined-basic" label="Tên đơn vị vận chuyển" variant="outlined" required value={shippName} onChange={(e) => { handleSetShippName(e.target.value) }} />
                        <TextField id="outlined-basic" label="Giá vận chuyển" variant="outlined" type="number" required value={shippPrice} onChange={(e) => { handleSetShippPrice(parseInt(e.target.value)) }} />
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

                        onClick={() => handleAddShipp(shippName, shippPrice)}
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
                        <TextField defaultValue={shippNameUpdate} id="outlined-basic" label="Tên đơn vị vận chuyển" variant="outlined" required value={shippNameUpdate} onChange={(e) => { handleSetShippName(e.target.value) }} />
                        <TextField defaultValue={shippPriceUpdate} id="outlined-basic" label="Giá vận chuyển" variant="outlined" type="number" required value={shippPriceUpdate} onChange={(e) => { handleSetShippPrice(parseInt(e.target.value)) }} />
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

                        onClick={() => handleUpdateShipp(listIdSelected[0], shippNameUpdate, shippPriceUpdate)}
                    >Thêm</Button>
                </>

            </CustomModal>
        </div>
    )
}


export default Order
