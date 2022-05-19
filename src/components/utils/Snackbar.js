import React,{useState} from 'react'

function Snackbar({message , key}) {
    const [open, setOpen] = useState(true);

    // const handleClick = (message) => {
    //     setState({ open: true, message: message });
    // };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                message={message}
                key={key}
            />
        </>
    )
}

export default Snackbar
