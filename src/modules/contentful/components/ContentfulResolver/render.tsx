import { CardHowItWorks } from '@/modules/components/CardHowItWorks';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ContentfulBackground } from '../ContentfulBackground';
import { ContentfulGridItem } from '../ContentfulGridItem';
import { ContentfulImage } from '../ContentfulImage';
import { ContentfulRichText } from '../ContentfulRichText';

export const render = (data: any) => {
  switch (data?.sys?.contentType?.sys?.id.toLowerCase()) {
    case 'row':
      return (
        <Grid
          width="100%"
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 2, md: 4 }}
          sx={(theme) => ({
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column-reverse',
            },
            [theme.breakpoints.up('sm')]: {
              flexDirection: data?.fields?.direction,
            },
          })}
        >
          {data?.fields?.items?.map((item: any) => {
            return (
              <ContentfulGridItem key={item?.sys?.id} render={render} item={item} columns={data?.fields?.columns} />
            );
          })}
        </Grid>
      );
    case 'card':
      const variant = data.fields.variant;
      return <>{variant === 'default' && <CardHowItWorks data={data} />}</>;
    case 'container':
      return (
        <Box
          maxWidth="1440px"
          position="relative"
          padding={data?.fields?.fullWidth === 'true' ? '0' : '0px 1rem'}
          marginBottom={data?.fields?.marginBottom}
          width="100%"
        >
          {data?.fields?.background === 'true' && <ContentfulBackground />}
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            rowSpacing={{ xs: 2, md: 8 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={{ sm: 'column', md: 'row-reverse' }}
          >
            {data?.fields?.items?.map((item: any) => {
              return (
                <ContentfulGridItem key={item?.sys?.id} render={render} item={item} columns={data?.fields?.columns} />
              );
            })}
          </Grid>
        </Box>
      );
    case 'text':
      return <ContentfulRichText data={data?.fields?.text} textAlignment={data?.fields?.textAlignment} />;
    case 'link':
      return <div>Link</div>;
    case 'image':
      return <ContentfulImage data={data} />;
    default:
      return null;
  }
};
