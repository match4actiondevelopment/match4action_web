import Grid, { GridTypeMap } from '@mui/material/Grid';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';

const customImageStyles = (alignment: string) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: { sm: 'center', md: alignment?.toLowerCase() },
    justifyContent: { sm: 'center', md: alignment?.toLowerCase() },
  } as DefaultComponentProps<GridTypeMap<{}, 'div'>>;
};

export const ContentfulGridItem = ({ item, render, columns }: any) => {
  const isImage = item?.sys?.contentType?.sys?.id === 'Image';
  return (
    <Grid
      item
      width="100%"
      xs={12}
      md={12 / Number(columns)}
      {...(isImage ? customImageStyles(item?.fields?.alignment) : {})}
    >
      {render(item)}
    </Grid>
  );
};
