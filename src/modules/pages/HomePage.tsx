'use client';

import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { ContentfulResolver } from '../contentful/components/ContentfulResolver';
import { PurpleItem } from '../contentful/queries/types';
import { UserContext } from '../context/user-context';
import { useFetchProfile } from '../hooks/useGetProfile';

interface HomePageInterface {
  data: PurpleItem;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ImageBackground = dynamic(
  () => import('../components/ImageBackground').then((doc) => doc.ImageBackground),
  {
    ssr: false,
  }
);

export default function HomePage({ data }: HomePageInterface) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useContext(UserContext) ?? {};

  const access_token = searchParams.get('access_token');
  const refresh_token = searchParams.get('refresh_token');
  const user_id = searchParams.get('user_id');

  useEffect(() => {
    if (access_token && refresh_token && user_id) {
      localStorage.setItem('match4action@tokens', JSON.stringify({ access_token, refresh_token }));
    }
  }, [access_token, refresh_token, router, searchParams, user_id]);

  const { data: user } = useFetchProfile(user_id);

  useEffect(() => {
    if (user && user?._id) {
      setUser && setUser(user);
      router.push('/');
    }
  }, [user, setUser, router]);

  return (
    <>
      <ImageBackground />
      <Box
        component="main"
        marginTop="2.75rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {data?.fields?.items?.map((item: any) => {
          return <ContentfulResolver key={item?.sys?.id} data={item} />;
        })}
      </Box>
    </>
  );
}
