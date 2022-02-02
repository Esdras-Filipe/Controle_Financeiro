import React from 'react'
import NumberFormat from 'react-number-format';
import TextField from '@mui/material/TextField';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            prefix="R$"
        />
    );
});

export default function MyComponent(props) {
    return (
        <TextField id="outlined-basic" variant="outlined" size="small" {...props} fullWidth
            InputProps={{
                inputComponent: NumberFormatCustom,
            }}
        />
    );
}