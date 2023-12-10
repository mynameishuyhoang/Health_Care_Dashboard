import Modal from "@mui/material/Modal";
import React from "react";
import './style.scss'

interface Props {
    children: JSX.Element,
    isOpen: boolean,
    handleClose: () => void,
    style?: React.CSSProperties
}

const CustomModal = (props: Props) => {
    const { children, handleClose = () => null, isOpen, style } = props
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            // slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <div className="modal-container" style={style}>

                {children}
            </div>
        </Modal>
    )
}

export default CustomModal