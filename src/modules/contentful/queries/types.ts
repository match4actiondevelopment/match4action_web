export interface Page {
  metadata: Metadata;
  sys: ImageSys;
  fields: PageFields;
}

export interface PageFields {
  slug: string;
  pageTitle: string;
  items: PurpleItem[];
}

export interface PurpleItem {
  metadata: Metadata;
  sys: ImageSys;
  fields: PurpleFields;
}

export interface PurpleFields {
  name: string;
  fullWidth: string;
  variant: string;
  columns: string;
  background: string;
  marginBottom: string;
  reorderItems?: boolean;
  items: FluffyItem[];
}

export interface FluffyItem {
  metadata: Metadata;
  sys: ImageSys;
  fields: FluffyFields;
}

export interface FluffyFields {
  name: string;
  alignment?: string;
  image?: PurpleImage;
  textAlignment?: string;
  text?: Text;
  variant?: string;
  content?: FieldsContent;
  columns?: string;
  direction?: string;
  items?: TentacledItem[];
}

export interface FieldsContent {
  nodeType: string;
  data: TextData;
  content: PurpleContent[];
}

export interface PurpleContent {
  nodeType: FluffyNodeType;
  data: TextData;
  content: FluffyContent[];
}

export interface FluffyContent {
  nodeType: PurpleNodeType;
  value: string;
  marks: any[];
  data: TextData;
}

export interface TextData {}

export enum PurpleNodeType {
  Text = 'text',
}

export enum FluffyNodeType {
  EmbeddedEntryBlock = 'embedded-entry-block',
  Heading1 = 'heading-1',
  Heading2 = 'heading-2',
  Heading3 = 'heading-3',
  Paragraph = 'paragraph',
}

export interface PurpleImage {
  metadata: Metadata;
  sys: ImageSys;
  fields: TentacledFields;
}

export interface TentacledFields {
  title?: string;
  description?: string;
  file?: File;
  name?: string;
  image?: FluffyImage;
}

export interface File {
  url: string;
  details: Details;
  fileName: string;
  contentType: string;
}

export interface Details {
  size: number;
  image: DetailsImage;
}

export interface DetailsImage {
  width: number;
  height: number;
}

export interface FluffyImage {
  metadata: Metadata;
  sys: ImageSys;
  fields: StickyFields;
}

export interface StickyFields {
  title: string;
  description: string;
  file: File;
}

export interface Metadata {
  tags: any[];
}

export interface ImageSys {
  space: ContentType;
  id: string;
  type: Type;
  createdAt: Date;
  updatedAt: Date;
  environment: ContentType;
  revision: number;
  locale: Locale;
  contentType?: ContentType;
}

export interface ContentType {
  sys: ContentTypeSys;
}

export interface ContentTypeSys {
  id: ID;
  type: ID;
  linkType: LinkType;
}

export enum ID {
  Card = 'card',
  Container = 'container',
  Dev = 'dev',
  Image = 'Image',
  Link = 'Link',
  Page = 'Page',
  Row = 'row',
  Text = 'Text',
  Zpqcdf62Yp9Z = 'zpqcdf62yp9z',
}

export enum LinkType {
  ContentType = 'ContentType',
  Environment = 'Environment',
  Space = 'Space',
}

export enum Locale {
  EnUS = 'en-US',
}

export enum Type {
  Asset = 'Asset',
  Entry = 'Entry',
}

export interface TentacledItem {
  metadata: Metadata;
  sys: ImageSys;
  fields: IndigoFields;
}

export interface IndigoFields {
  name: string;
  text?: Text;
  textAlignment?: string;
  alignment?: string;
  image?: FluffyImage;
}

export interface Text {
  data: TextData;
  content: TextContent[];
  nodeType: string;
}

export interface TextContent {
  data: PurpleData;
  content: FluffyContent[];
  nodeType: FluffyNodeType;
}

export interface PurpleData {
  target?: Target;
}

export interface Target {
  metadata: Metadata;
  sys: ImageSys;
  fields: TargetFields;
}

export interface TargetFields {
  name: string;
  label: string;
  variant: string;
  url?: string;
  linkToEntry?: LinkToEntry;
}

export interface LinkToEntry {
  metadata: Metadata;
  sys: ImageSys;
  fields: LinkToEntryFields;
}

export interface LinkToEntryFields {
  slug: string;
  pageTitle: string;
}
