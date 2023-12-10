import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toastMessage } from "../../../../components/message";
import axios from "axios";
import CancelIcon from '../../../../assets/icons/cancel.png'

interface Props {
    isOpenUpdate: boolean,
    handleCloseUpdate: () => void,
    info?: any
    handleGetShipp: () => void
}

const UpdateShipModal = (props: Props) => {
    const { isOpenUpdate, handleCloseUpdate, info, handleGetShipp } = props

    const [updateName, setUpdateName] = useState<string>()
    const [updatePrice, setUpdatePrice] = useState<number>()

    const handleUpdateShipp = async (id?: string, shippName?: string, shippPrice?: number) => {
        try {
            const { data } = await axios.patch(`https://healthcare-bkmr.onrender.com/api/shipp/update/${id}`, {
                shippName: shippName,
                shippPrice: shippPrice
            })
            toastMessage('success', 'Cập nhật đơn vị vận chuyển thành công')
            handleCloseUpdate()
            handleGetShipp()
            console.log(data);

        } catch (err) {
            console.log(err)
            toastMessage('error', 'Cập nhật đơn vị vận chuyển không thành công')
        }
    }

    useEffect(() => {
        setUpdateName(info?.shippName)
        setUpdatePrice(info?.shippPrice)
    }, [isOpenUpdate])

    return (
        <CustomModal isOpen={isOpenUpdate} handleClose={handleCloseUpdate} style={{
            width: '600px', height: '300px',
            background: 'white', outline: '1px solid gray', borderRadius: '12px'
        }}>
            <>
                <p style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', color: '#FF8F8F' }}>Cập nhật đơn vị vận chuyển</p>
                <img className="icon-cancel" onClick={() => {
                    handleCloseUpdate()
                }} src={CancelIcon} alt="" />
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
                    <TextField defaultValue={info?.shippName} id="outlined-basic" label="Tên đơn vị vận chuyển" variant="outlined" required value={updateName} onChange={(e) => { setUpdateName(e.target.value) }} />
                    <TextField defaultValue={info?.shippPrice} id="outlined-basic" label="Giá vận chuyển" variant="outlined" type="number" required value={updatePrice} onChange={(e) => { setUpdatePrice(parseInt(e.target.value)) }} />
                </Box>
                <Button style={{
                    display: 'flex',
                    outline: '1px solid, gray',
                    padding: '8px',
                    background: 'red',
                    color: 'white',
                    width: '100px',
                    margin: 'auto'
                }}

                    onClick={() => handleUpdateShipp(info?._id, updateName, updatePrice)}
                >Cập nhật</Button>
            </>

        </CustomModal>
    )
}

export default UpdateShipModal