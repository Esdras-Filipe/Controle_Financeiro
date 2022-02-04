import React from "react";
import Button from '@mui/material/Button';
import { Menu, IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import './Header.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    return (
        <div className="group">
            <div className="container2">
                <div className="options">
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <IconButton {...bindTrigger(popupState)}>
                                    <div className="avatar-img">
                                    </div>
                                </IconButton>
                                <Menu {...bindMenu(popupState)}>
                                    <MenuItem onClick={popupState.close}>Profile</MenuItem>
                                    <MenuItem onClick={popupState.close}>My account</MenuItem>
                                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </div>

            </div>
        </div>
    )
}