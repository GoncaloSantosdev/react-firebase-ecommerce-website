import React from 'react';
// MUI
import { Box, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      marginTop: '3rem'
    }}
  >
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
        <Box textAlign='center' display='flex' justifyContent='center' alignItems='center'>
          <Box margin={1}>
            <Link href='https://github.com/GoncaloSantosdev/react-ecommerce-website' target='_blank'>Github</Link>        
          </Box>
          <Box margin={1}>
            <Link href='https://www.linkedin.com/in/gon%C3%A7alo-santos-b45a8020a/' target='_blank'>Linkedin</Link>
          </Box>
          <Box margin={1}>
            <Link href='mailto: goncalosantosprofissional@gmail.com'>Email</Link>  
          </Box>
        </Box>
    </Box>
  </Box>
  )
}

export default Footer