import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './navbar.scss'
import MenuIcon from '../../assets/icons/menu.png'
import ChevronLeftIcon from '../../assets/icons/left-chevron.png'
import HomeIcon from '../../assets/icons/home.png'
import ProductIcon from '../../assets/icons/food.png'
import CategoryIcon from '../../assets/icons/categories.png'
import VoucherIcon from '../../assets/icons/voucher.png'
import PaymentIcon from '../../assets/icons/pay.png'
import ShippIcon from '../../assets/icons/go-shipp.png'
import SettingIcon from '../../assets/icons/settings.png'
import LogoutIcon from '../../assets/icons/logout.png'
import AuthIcon from '../../assets/icons/auth.jpg'

const NavDashBoard = () => {

    const navigation = useNavigate()
    const [isOpenNavbar, setIsOpenNavbar] = useState(false)

    const handleLogout = () => {
        localStorage.clear()
        window.location.replace('/login')
    }

    return (
        <div className="main-container">
            <div className="nav-dash-container" style={{
                width: `${isOpenNavbar ? '90px' : '360px'}`
            }}>
                {
                    !isOpenNavbar ?
                        <div onClick={(e) => setIsOpenNavbar(true)}>
                            <img className="chevron-icon" src={ChevronLeftIcon} alt="" />
                        </div>
                        :
                        <div onClick={(e) => setIsOpenNavbar(false)}>
                            <img className="menu-icon" src={MenuIcon} alt="" />
                        </div>
                }
                <hr />
                <div className="home-container">
                    <img className="icon" src={HomeIcon} alt="" />
                    {isOpenNavbar ? null :
                        <p className="label" onClick={() => navigation('/')}>Trang chủ</p>
                    }
                </div>
                <hr />
                <div className="store-management">
                    {isOpenNavbar ? null :
                        <p style={{ fontSize: '20px', fontWeight: '600' }}>Store Managment</p>
                    }
                    <div className="item-container">
                        <img className="icon" src={ProductIcon} alt="" />
                        {isOpenNavbar ? null :
                            <p className="label" onClick={() => navigation('/product')}>Sản phẩm</p>
                        }
                    </div>
                    <div className="item-container">
                        <img className="icon" src={VoucherIcon} alt="" />
                        {isOpenNavbar ? null :
                            <p className="label" onClick={() => navigation('/voucher')}>Mã khuyến mãi</p>
                        }
                    </div>
                    <div className="item-container">
                        <img className="icon" src={PaymentIcon} alt="" />
                        {isOpenNavbar ? null :
                            <p className="label" onClick={() => navigation('/payment')}>Phương thức thanh toán</p>
                        }
                    </div>
                    <div className="item-container">
                        <img className="icon" src={ShippIcon} alt="" />
                        {isOpenNavbar ? null :
                            <p className="label" onClick={() => navigation('/shipp')}>Vận chuyển</p>
                        }
                    </div>
                </div>
                <hr />
                <div>
                    {isOpenNavbar ? null :
                        <p style={{ fontSize: '20px', fontWeight: '600' }}>Data Managment</p>
                    }
                    <div className="item-container">
                        <img className="icon" src={AuthIcon} alt="" />
                        {isOpenNavbar ? null :
                            <p className="label" onClick={() => navigation('/author')}>Khách hàng</p>
                        }
                    </div>
                    <div className="item-container">
                        <img className="icon" src={CategoryIcon} alt="" />
                        {isOpenNavbar ? null :
                            <p className="label" onClick={() => navigation('/order')}>Đặt hàng</p>
                        }
                    </div>
                    <div className="item-container">
                        <img className="icon" src={PaymentIcon} alt="" />
                        {isOpenNavbar ? null :
                            <p className="label" onClick={() => navigation('/staff')}>Nhân viên</p>
                        }
                    </div>
                </div>
                <hr />
                {isOpenNavbar ? null :
                    <p style={{ fontSize: '20px', fontWeight: '600' }}>System</p>
                }
                <div className="item-container">
                    <img className="icon" src={SettingIcon} alt="" />
                    {isOpenNavbar ? null :
                        <p className="label">Cài đặt</p>
                    }
                </div>
                <div className="item-container" onClick={handleLogout}>
                    <img className="icon" src={LogoutIcon} alt="" />
                    {isOpenNavbar ? null :
                        <p className="label">Thoát</p>
                    }
                </div>
            </div>
            <div className="data-container" style={
                isOpenNavbar ? { width: 'calc(100% - 92px)' }
                    :
                    { width: 'calc(100% - 362px)' }
            }>
                <div className="header-container">
                    <p style={{ color: 'white', margin: '10px', fontSize: '20px', fontWeight: '600' }}>DASHBOARD</p>
                    <div className="auth-container">
                        <img className="auth-icon" src={AuthIcon} alt="" />
                        <p style={{ marginRight: '20px', color: 'white' }}>{localStorage.getItem('name')}</p>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}



export default NavDashBoard