import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../services';
import { UserI } from '../types/types';

export const useFetchProfile = (id?: string | null) => {
  const { data, isFetched, isLoading } = useQuery<string | UserI, unknown, UserI>(
    ['profile', id],
    () => fetchProfile(id),
    {
      enabled: !!id,
    }
  );

  return { data, isFetched, isLoading };
};
