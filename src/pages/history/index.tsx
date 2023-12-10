import React from "react";
import './styles.scss'
import Button from "@mui/material/Button"; import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'image',
        headerName: 'Hình ảnh',
        width: 150,
        editable: true,
    },
    {
        field: 'name',
        headerName: 'Tên sản phẩm',
        width: 400,
        editable: true,
    },
    {
        field: 'inputPrice',
        headerName: 'Giá nhập',
        type: 'number',
        width: 200,
        editable: true,
    },
    {
        field: 'exportPrice',
        headerName: 'Giá bán',
        type: 'number',
        sortable: false,
        width: 200,
    },
    {
        field: 'description',
        headerName: 'Mô tả',
        sortable: false,
        width: 200,
    },
];

const rows = [
    { id: 1, image: 'Snow', name: 'Jon', inputPrice: 35, exportPrice: 40, description: 'abc' },
    { id: 2, image: 'Snow', name: 'Jon', inputPrice: 35, exportPrice: 40, description: 'abc' },
    { id: 3, image: 'Snow', name: 'Jon', inputPrice: 35, exportPrice: 40, description: 'abc' },
    { id: 4, image: 'Snow', name: 'Jon', inputPrice: 35, exportPrice: 40, description: 'abc' },
    { id: 5, image: 'Snow', name: 'Jon', inputPrice: 35, exportPrice: 40, description: 'abc' },
    { id: 6, image: 'Snow', name: 'Jon', inputPrice: 35, exportPrice: 40, description: 'abc' },
    { id: 7, image: 'Snow', name: 'Jon', inputPrice: 35, exportPrice: 40, description: 'abc' },
    { id: 8, image: 'Snow', name: 'Jon', inputPrice: 35, exportPrice: 40, description: 'abc' },
    { id: 9, image: 'Snow', name: 'Jon', inputPrice: 35, exportPrice: 40, description: 'abc' },
];

const History = () => {
    return (
        <div className="product-container">
            <p>Quản lý sản phẩm</p>
            <hr />
            <div className="fun-container">
                <Button className="btn">
                    Thêm
                </Button>
                <Button className="btn">
                    Xoá
                </Button>
                <Button className="btn">
                    Cập nhật
                </Button>
            </div>
            <hr />
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    )
}


export default History