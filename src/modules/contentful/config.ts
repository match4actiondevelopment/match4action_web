import { ContentfulClientApi, createClient, EntryCollection } from 'contentful';
import {
  ContentfulClientOptions,
  ContentfulQuery,
  GetPageParams,
} from './types';

const DEFAULT_LANGUAGE = 'en-US';

export default class ContentfulHandler {
  client: ContentfulClientApi;
  language: string;

  constructor(isPreview = false) {
    const isPreviewMode =
      isPreview || process.env.CONTENTFUL_PREVIEW_MODE === 'true';

    const clientOptions: ContentfulClientOptions = {
      space: process.env.CONTENTFUL_SPACE_ID || '',
      environment: process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
      resolveLinks: false,
      host: process.env.CONTENTFUL_HOST ?? '',
      accessToken: isPreviewMode
        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || ''
        : process.env.CONTENTFUL_PUBLIC_ACCESS_TOKEN || '',
    };

    if (isPreviewMode) {
      clientOptions.host = 'preview.contentful.com';
    }

    this.client = createClient(clientOptions);
    this.language = process.env.LANGUAGE || DEFAULT_LANGUAGE;
  }

  async getPage(params: GetPageParams): Promise<EntryCollection<any>> {
    const query: { [key: string]: any } = {
      limit: params?.limit || 1,
      include: 10,
      locale: params?.locale || process.env.LANGUAGE,
      content_type: params?.pageContentType,
      'fields.site': process.env.NEXT_PUBLIC_SITE_IDENTIFIER,
    };

    if (params?.slug) {
      query['fields.slug'] = params?.slug;
    }

    return await this.client.getEntries(query);
  }

  async getEntries(
    contentType: string,
    field: any = {},
    levels = 10,
  ): Promise<EntryCollection<any>> {
    const query: ContentfulQuery = {
      content_type: contentType,
      locale: this.language,
    };

    if (Object.keys(field || {})?.length) {
      query[`fields.${field?.name}[in]`] = field?.value;
    }

    if (levels) {
      query.include = levels;
    }
    return this.client.getEntries(query);
  }
}
