import Box from '@mui/material/Box';
import NextImage from 'next/image';
import {ContentfulRichText} from '../../contentful/components/ContentfulRichText';

interface CardHowItWorksInterface {
    data: any;
}

export const CardHowItWorks = ({data}: CardHowItWorksInterface) => {
    const text = data?.fields?.content;
    const width =
        data?.fields?.image?.fields?.image?.fields?.file?.details?.image?.width;
    const height =
        data?.fields?.image?.fields?.image?.fields?.file?.details?.image?.height;

    return (
        <Box
            sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                    border: '1px solid #D0DBDF',
                    height: '84px',
                    minWidth: '100%',
                    borderRadius: '4px',
                    background: '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px 13px 0px 20px',
                    borderLeft: '3px solid #7158C8',
                },
                [theme.breakpoints.up('sm')]: {
                    border: '1px solid #D0DBDF',
                    height: '282px',
                    minWidth: '100%',
                    borderRadius: '8px',
                    background: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottom: '5px solid #7158C8',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
                },
            })}
        >
            <ContentfulRichText data={text}/>
            <Box
                position="relative"
                sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                        width: width * 0.5,
                        height: height * 0.5,
                    },
                    [theme.breakpoints.up('sm')]: {
                        width,
                        height,
                        marginBottom: '1rem',
                    },
                })}
            >
                <NextImage
                    fill
                    src={`https:${data?.fields?.image?.fields?.image?.fields?.file?.url}`}
                    alt={data?.fields?.image?.fields?.image?.fields?.description}
                />
            </Box>
        </Box>
    );
};
