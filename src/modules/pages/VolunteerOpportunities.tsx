'use client';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SortIcon from '@mui/icons-material/Sort';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { useState } from 'react';
import { lato } from '../styles/fonts';

export default function VolunteerOpportunities() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Box
      component="main"
      marginTop="1.5rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="0 1rem"
      height="100%"
    >
      <Box width="100%" display="flex" flexDirection="column" gap={2}>
        <TextField fullWidth label="Jobs titles, companies, keywords" variant="outlined" size="small" />
        <TextField fullWidth label="Location" variant="outlined" size="small" />

        <Box>
          <Switch inputProps={{ 'aria-label': 'Remote Work' }} defaultChecked />
          <Typography
            className={lato.className}
            component="span"
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                fontSize: '1rem',
                lineHeight: '1.25rem',
                color: theme.palette.text.primary,
              },
            })}
          >
            Remote Work
          </Typography>
        </Box>
      </Box>
      <Typography
        className={lato.className}
        width="100%"
        sx={(theme) => ({
          [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
            lineHeight: '1.25rem',
            color: theme.palette.text.primary,
          },
        })}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus vel scelerisque integer nunc in elit pretium.
      </Typography>
      <Divider
        sx={{
          width: '100%',
          border: '1px solid #D4D4D480',
          margin: '1rem 0 0.5rem',
        }}
      />
      <Box width="100%">
        <IconButton>
          <SortIcon />
          <Typography
            className={lato.className}
            component="span"
            fontWeight={500}
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                fontSize: '0.75rem',
                lineHeight: '1.25rem',
                color: theme.palette.text.primary,
                marginLeft: '5px',
              },
            })}
          >
            Most Recent
          </Typography>
        </IconButton>
      </Box>
      <Divider
        sx={{
          width: '100%',
          border: '1px solid #D4D4D480',
          margin: '0.5rem 0 1rem',
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '4px',
              display: 'flex',
              position: 'relative',
              padding: '1rem 0.5rem',
              background: '#fff',
            }}
          >
            <Box height={61} width={61} sx={{ background: '#EAEAEA', marginRight: '0.75rem' }}></Box>
            <Box>
              <Typography
                className={lato.className}
                fontWeight={400}
                sx={(theme) => ({
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '0.8rem',
                    lineHeight: '1rem',
                    color: theme.palette.text.primary,
                    marginBottom: '2px',
                  },
                })}
              >
                CrowdDoing
              </Typography>
              <Typography
                className={lato.className}
                fontWeight={700}
                sx={(theme) => ({
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '1rem',
                    lineHeight: '1.25rem',
                    color: theme.palette.text.primary,
                    marginBottom: '2px',
                  },
                })}
              >
                Project Manager
              </Typography>
              <Typography
                className={lato.className}
                fontWeight={300}
                sx={(theme) => ({
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '0.75rem',
                    lineHeight: '0.875rem',
                    color: theme.palette.text.primary,
                  },
                })}
              >
                New York, US
              </Typography>
            </Box>
            <NextLink
              href="/opportunities/1"
              style={{
                textDecoration: 'none',
                position: 'absolute',
                bottom: 0,
                right: 0,
                margin: '1rem 0.5rem',
              }}
            >
              <Button
                sx={(theme) => ({
                  background: '#FFD15C',
                  color: theme.palette.text.primary,
                  fontWeight: 400,
                  fontSize: '0.75rem',
                  ':focus': {
                    background: '#FFD15C',
                  },
                  ':active': {
                    background: '#FFD15C',
                  },
                  textTransform: 'capitalize',
                  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                })}
              >
                Apply
              </Button>
            </NextLink>
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{
                background: 'transparent',
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              {isFavorite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            </IconButton>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
