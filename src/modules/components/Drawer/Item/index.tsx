
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { DrawerItem } from '..';

type ItemProps = {
  data: DrawerItem
}

export const Item = ({ data }: ItemProps) => {
  return (<ListItem
    sx={{
      '&:hover': {
        background: 'rgba(98, 0, 238, 0.08)',
      },
      marginTop: '.75rem',
      cursor: "pointer"
    }}
    onClick={data.action}
  >
    {data?.icon && (
      <ListItemIcon
        sx={{
          minWidth: 'fit-content',
          marginRight: '.5rem',
        }}
      >
        {data?.icon}
      </ListItemIcon>
    )}
    <Typography
      sx={(theme) => ({
        fontWeight: 500,
        fontSize: '0.875rem !important',
        lineHeight: '1.5rem',
        letterSpacing: '0.1px',
        color: theme.palette.text.primary,
        '&:hover': {
          color: '#6200EE',
        },
      })}
    >
      {data.name}
    </Typography>
  </ListItem>)
}
