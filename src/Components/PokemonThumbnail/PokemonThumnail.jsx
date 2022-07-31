import React, {useState} from 'react';
import styles from './PokemonThmubnail.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const lightStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const darkStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  color:'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const PokemonThumbnail = ({
  id,
  name,
  image,
  type,
  weight,
  height,
  theme,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={styles.thumbContainer}>
      <div className='number'>
        <small>{id}</small>
      </div>

      <img src={image} alt={name} />
      <div className={styles.detailWrapper}>
        <h3>{name}</h3>
        <small>Type:{type}</small>
        <Button
          variant='outlined'
          color='secondary'
          size='medium'
          onClick={handleOpen}
        >
          Show more
        </Button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={theme === 'light' ? lightStyle : darkStyle}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              <p>Weight:{weight}</p>
              <p>Height:{height}</p>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
