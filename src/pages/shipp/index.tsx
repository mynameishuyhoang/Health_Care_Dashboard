import React, { useState } from "react";
import './styles.scss'
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import Button from "@mui/material/Button";
import { toastMessage } from "../../components/message";
import UpdateShipModal from "./components/update-modal";
import AddModal from "./components/add-modal";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface DataShipp {
    shippName: string,
    shippPrice: number
}

const Order = () => {

    const [listIdSelected, setListIdSelected] = useState<string[]>([])
    const [dataShipp, setDataShipp] = useState<DataShipp[]>([]);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [infoDetail, setInfoDetail] = useState<any>()

    const handleCloseAdd = () => {
        setOpenAdd(false);
    }

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    }

    const handleAddNewShipp = () => {
        setOpenAdd(true)
    }

    const handleSelectShipUpdate = (data?: any) => {
        setOpenUpdate(true)
        setInfoDetail(data)
    };


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

    const handleDeleteShipp = async (id?: string) => {
        try {
            const { data } = await axios.delete(`https://healthcare-bkmr.onrender.com/api/shipp/delete/${id}`)
            toastMessage('success', 'Xoá đơn vị vận chuyển thành công')
            handleGetShipp()
            setListIdSelected([])
            console.log(data);


        } catch (err) {
            console.log(err)
            toastMessage('error', 'Xoá đơn vị vận chuyển không thành công')
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
                <Button className="btn" onClick={handleAddNewShipp}>Thêm</Button>
                <Button className="btn" onClick={(e) => handleDeleteShipp(listIdSelected[0])}>Xoá</Button>
            </div>
            <hr />
            <div className="data-shipp-container">
                <div className="data-label">
                    <p style={{ width: '5%' }}></p>
                    <p style={{ width: '23%', fontWeight: '600' }}>Mã đơn vị vận chuyển</p>
                    <p style={{ width: '23%', textAlign: 'left', fontWeight: '600' }}>Tên đơn vị vận chuyển</p>
                    <p style={{ width: '23%', textAlign: 'left', fontWeight: '600' }}>Giá vận chuyển</p>
                    <p style={{ width: '23%', textAlign: 'center', fontWeight: '600' }}>Thao tác</p>
                </div>
                <hr />
                {dataShipp?.map((item: any, idx: number) => (
                    <div key={idx} className="data-shipp">
                        <Checkbox {...label} className="select-data" value={item._id}
                            onChange={() => {
                                // setListIdSelected(item._id)
                                handleSelectShipp(item?._id)
                                console.log('id: ', item._id);
                                setInfoDetail(item)
                            }} />
                        <p style={{ width: '23%', textAlign: 'left', fontWeight: '600' }}>{item?._id.substring(item?._id.length - 8, item?._id.length)}</p>
                        <p style={{ width: '23%', textAlign: 'left', fontWeight: '600' }}>{item?.shippName}</p>
                        <p style={{ width: '23%', textAlign: 'left', fontWeight: '600' }}>{item?.shippPrice} (vnđ)</p>
                        <Button style={{
                            width: '23%'
                        }} onClick={() =>
                            handleSelectShipUpdate(item)
                        }>Cập nhật</Button>
                    </div>
                ))}
            </div>
            <AddModal isOpenAdd={openAdd} handleCloseAdd={handleCloseAdd} handleGetShipp={handleGetShipp} />
            <UpdateShipModal isOpenUpdate={openUpdate} handleCloseUpdate={handleCloseUpdate} info={infoDetail} handleGetShipp={handleGetShipp} />
        </div>
    )
}


export default Order
