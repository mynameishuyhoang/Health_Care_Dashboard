import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/modal";
import { toastMessage } from "../../../../components/message";
import axios from "axios";
import CancelIcon from '../../../../assets/icons/cancel.png'
import { useForm, Controller } from "react-hook-form";
import { Input as AntdInput } from "antd";
import './style.scss'


interface Props {
    isOpenAdd: boolean,
    handleCloseAdd: () => void,
    handleGetProducts: () => void
}

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
    categoryId: string
}

interface IFormInput {
    name: string;
    amount: number;
    inputPrice: number;
    exportPrice: number;
    calo: number;
    protein: number;
    lipid: number;
    sugar: number;
    starch: number;
    image: string;
    description: string;
    categoryId: string;
}

const AddModal = (props: Props) => {
    const { isOpenAdd, handleCloseAdd, handleGetProducts } = props


    const handleAddProduct = async (data?: any) => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/shipp/add`,)

            console.log('add shipp data: ', data?.data);
            toastMessage('success', 'Thêm đơn vị vận chuyển thành công')
            handleCloseAdd()
            handleGetProducts()

        } catch (err) {
            console.log(err)
            toastMessage('error', 'Thêm đơn vị vận chuyển không thành công')
        }
    }

    const { control, handleSubmit } = useForm<IFormInput>();

    const onSubmit = (data: IFormInput) => {
        alert(JSON.stringify(data));
    };


    useEffect(() => {

    }, [])

    return (
        <CustomModal isOpen={isOpenAdd} handleClose={handleCloseAdd} style={{
            width: '600px', height: '630px',
            background: 'white', outline: '1px solid gray', borderRadius: '12px'
        }}>
            {/* <>
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
            </> */}
            <>
                <p style={{
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '24px',
                    color: '#EF4040'
                }}>Thêm mới sản phẩm</p>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Tên sản phẩm</label>
                    <Controller
                        render={({ field }) => <AntdInput {...field} className="input-data" />}
                        name="name"
                        control={control}
                        defaultValue=""
                    />
                    <label>Số lượng</label>
                    <Controller
                        render={({ field }) => <AntdInput {...field} className="input-data" />}
                        name="amount"
                        control={control}
                        defaultValue={0}
                    />
                    <div style={{
                        display: 'flex'
                    }}>
                        <div>
                            <label>Giá nhập</label>
                            <Controller
                                render={({ field }) => <AntdInput {...field} className="input-data" />}
                                name="inputPrice"
                                control={control}
                                defaultValue={0}
                            />
                        </div>
                        <div>
                            <label>Giá bán</label>
                            <Controller
                                render={({ field }) => <AntdInput {...field} className="input-data" />}
                                name="exportPrice"
                                control={control}
                                defaultValue={0}
                            />
                        </div>
                    </div>
                    <div style={{
                        display: 'flex'
                    }}>
                        <div>
                            <label>Calo</label>
                            <Controller
                                render={({ field }) => <AntdInput {...field} className="input-data" />}
                                name="calo"
                                control={control}
                                defaultValue={0}
                            />
                        </div>
                        <div>
                            <label>Protein</label>
                            <Controller
                                render={({ field }) => <AntdInput {...field} className="input-data" />}
                                name="protein"
                                control={control}
                                defaultValue={0}
                            />
                        </div>
                    </div>
                    <div style={{
                        display: 'flex'
                    }}>
                        <div>
                            <label>Lipid</label>
                            <Controller
                                render={({ field }) => <AntdInput {...field} className="input-data" />}
                                name="lipid"
                                control={control}
                                defaultValue={0}
                            />
                        </div>
                        <div>
                            <label>Sugar</label>
                            <Controller
                                render={({ field }) => <AntdInput {...field} className="input-data" />}
                                name="sugar"
                                control={control}
                                defaultValue={0}
                            />
                        </div>
                        <div>
                            <label>Starch</label>
                            <Controller
                                render={({ field }) => <AntdInput {...field} className="input-data" />}
                                name="starch"
                                control={control}
                                defaultValue={0}
                            />
                        </div>
                    </div>
                    <label>Mô tả</label>
                    <Controller
                        render={({ field }) => <AntdInput {...field} className="input-data" />}
                        name="description"
                        control={control}
                        defaultValue=''
                    />
                    <label>Danh mục sản phẩm</label>
                    <Controller
                        render={({ field }) => <AntdInput {...field} className="input-data" />}
                        name="categoryId"
                        control={control}
                        defaultValue=''
                    />

                    <input className="add-data-product" type="submit" value="Thêm" />
                </form>
            </>

        </CustomModal>
    )
}

export default AddModal