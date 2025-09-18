import ContentfulHandler from '../config';
import { resolveLinks } from '../utils';
import { PurpleItem } from './types';

export const getContentfulData = async (slug: string) => {
  const client = await getContentfulPageData(slug);
  return client;
};

export const getContentfulPageData = async (slug: string) => {
  const client = new ContentfulHandler();

  let page = {} as any;

  const res = await client.getPage({
    pageContentType: 'Page',
    slug,
  });

  if (res.total === 0) {
    return false;
  }

  if (Object.keys(res?.items)) {
    page = res.items[0];

    resolveLinks(page?.fields, res?.includes, 1);
  }

  return page as PurpleItem;
};
