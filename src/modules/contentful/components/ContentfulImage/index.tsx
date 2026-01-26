import Box from '@mui/material/Box';
import NextImage from 'next/image';

interface ContentfulImageInterface {
  data: any;
}

export const ContentfulImage = ({ data }: ContentfulImageInterface) => {
  const width = data?.fields?.image?.fields?.file?.details?.image?.width || 800;
  const height = data?.fields?.image?.fields?.file?.details?.image?.height || 600;

  const imageUrl = data?.fields?.image?.fields?.file?.url;

  if (!imageUrl) return null;

  return (
    <Box
      position="relative"
      sx={(theme) => ({
        [theme.breakpoints.down('sm')]: {
          width: width * 0.5,
          height: height * 0.5,
          margin: '0 auto',
        },
        [theme.breakpoints.up('sm')]: {
          width,
          height,
        },
      })}
    >
      <NextImage
        fill
        priority={data?.fields?.priority ?? false}
        src={`https:${imageUrl}`}
        alt={data?.fields?.image?.fields?.description || ''}
      />
    </Box>
  );
};
