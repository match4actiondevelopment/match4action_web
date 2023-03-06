import { getContentfulData } from '@/modules/contentful/queries/getContentfulPageData';

import { GenericPageInterface } from '@/modules/types/types';
import { notFound } from 'next/navigation';
import HomePage from '../modules/pages/HomePage';

export default async function GenericPage({ params }: GenericPageInterface) {
  const data = await getContentfulData(params?.slug);

  if (!data) {
    notFound();
  }

  return <HomePage data={data} />;
}
