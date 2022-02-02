import React from 'react';
import { Modal, Box, Button } from '@mui/material/';
import * as IoIcons from 'react-icons/io';
import './modal.css';

function ModalStyled(props) {
    return (
        <>
            <Modal
                open={props.abrir}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <Button onClick={props.onClose} className=''>
                        Fechar
                        <IoIcons.IoIosExit size={60} />
                    </Button>
                    <div key={0}>
                        {props.children}
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default ModalStyled;
