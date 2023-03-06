import Box from '@mui/material/Box';

export const ContentfulBackground = () => {
  return (
    <Box
      sx={(theme) => ({
        [theme.breakpoints.down('sm')]: {
          position: 'absolute',
          height: '100%',
          width: '595.49px',
          background: 'rgba(111, 87, 199, 0.15)',
          boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.15)',
          borderRadius: '0px 59px 59px 59px',
          transform: 'matrix(0.99, -0.15, 0.15, 0.99, 0, 0)',
          marginLeft: '-110px',
        },
      })}
    />
  );
};
