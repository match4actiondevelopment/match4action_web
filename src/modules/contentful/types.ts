export type ContentfulClientOptions = {
  space: string;
  environment: string;
  resolveLinks: boolean;
  accessToken: string;
  host?: string;
  headers?: string;
};

export type ContentfulQuery = {
  content_type?: string;
  locale?: string;
  include?: number;
  'field.slug'?: string;
  select?: string;
  limit?: number;
  skip?: number;
  order?: string;
  query?: string;
  [key: string]: any;
};

export type GetPageParams = {
  pageContentType: string;
  slug?: string;
  locale?: any;
  preview?: boolean;
  limit?: number;
};
