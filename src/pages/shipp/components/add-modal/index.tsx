import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toastMessage } from "../../../../components/message";
import axios from "axios";
import CancelIcon from '../../../../assets/icons/cancel.png'

interface Props {
    isOpenAdd: boolean,
    handleCloseAdd: () => void,
    handleGetShipp: () => void
}

const AddModal = (props: Props) => {
    const { isOpenAdd, handleCloseAdd, handleGetShipp } = props

    const [addName, setAddName] = useState<string>()
    const [addPrice, setAddPrice] = useState<number>()

    const handleAddShipp = async (shippName?: string, shippPrice?: number) => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/shipp/add`, {
                shippName: shippName,
                shippPrice: shippPrice
            })
            console.log('add shipp data: ', data?.data);
            toastMessage('success', 'Thêm đơn vị vận chuyển thành công')
            handleCloseAdd()
            handleGetShipp()

        } catch (err) {
            console.log(err)
            toastMessage('error', 'Thêm đơn vị vận chuyển không thành công')
        }
    }

    useEffect(() => {
        setAddName('')
        setAddPrice(0)
    }, [isOpenAdd])

    return (
        <CustomModal isOpen={isOpenAdd} handleClose={handleCloseAdd} style={{
            width: '600px', height: '300px',
            background: 'white', outline: '1px solid gray', borderRadius: '12px'
        }}>
            <>
                <p style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', color: '#FF8F8F' }}>Thêm đơn vị vận chuyển</p>
                <img className="icon-cancel" onClick={handleCloseAdd} src={CancelIcon} alt="" />
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
                    <TextField id="outlined-basic" label="Tên đơn vị vận chuyển" variant="outlined" required value={addName} onChange={(e) => { setAddName(e.target.value) }} />
                    <TextField id="outlined-basic" label="Giá vận chuyển" variant="outlined" type="number" required value={addPrice} onChange={(e) => { setAddPrice(parseInt(e.target.value)) }} />
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

                    onClick={() => handleAddShipp(addName, addPrice)}
                >Thêm</Button>
            </>

        </CustomModal>
    )
}

export default AddModal