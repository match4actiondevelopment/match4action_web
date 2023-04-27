import Box from '@mui/material/Box';

export const FooterBackground = () => {

  return (
    <>
      <Box
        position="absolute"
        sx={{
          clipPath: 'polygon(0 83%, 100% 25%, 100% 100%, 0% 100%)',
          background: 'linear-gradient(136.74deg, rgba(170, 114, 221, 0.6) 6.64%, rgba(113, 88, 200, 0.6) 60%)',
          bottom: 0,
          width: '1635.16px;',
          height: '640px',
          left: '-5%'
        }} />
      <Box
        position="absolute"
        sx={{
          clipPath: 'polygon(0 75%, 100% 38%, 100% 100%, 0% 100%)',
          background: 'rgba(158, 147, 195, 0.6)',
          bottom: 0,
          width: '1635.16px;',
          height: '640px',
          left: '-5%',
          zIndex: -1
        }} />
    </>
  );
};
