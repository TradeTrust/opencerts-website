export enum NewsTag {
  ARTICLE = "Article",
  NEWSLETTER = "Newsletter",
  PARTNER_NEWS = "Partner News",
  PRESS_RELEASE = "Press Release",
  SPEECH = "Speech",
}

export type NewsType =
  | NewsTag.ARTICLE
  | NewsTag.NEWSLETTER
  | NewsTag.PARTNER_NEWS
  | NewsTag.PRESS_RELEASE
  | NewsTag.SPEECH;

export type NewsItem = {
  slug: string;
  type: NewsType;
  attributes: {
    title: string;
    date: string;
    thumbnail?: string;
    link?: string;
    file?: string;
  };
  body: string;
};
