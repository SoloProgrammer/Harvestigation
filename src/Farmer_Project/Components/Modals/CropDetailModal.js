import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function CropDetailModal({ show, handleClose, modaldetail }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 470,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    return (
        <div>
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='CropDetailModal'>
                    <div className='mb-4'>
                        <div className="brand_logo">
                            <div className="logo">
                                <img src="https://webstockreview.net/images/clover-clipart-daun-11.png" alt="logo" />
                            </div>
                        </div>
                    </div>
                    <div className='poppins borderbtm mb-3' dangerouslySetInnerHTML={{ __html: modaldetail.detail }} />
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Looking to the above soil conditions in your farm we conclude that the <span className='crop_name'>{modaldetail.crop_name}</span> is the best suited crop to grow on your land!
                    </Typography>
                    <div className='flex-end mt-3'>
                        <Button onClick={handleClose} variant="contained" size="medium">Close</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default CropDetailModal
