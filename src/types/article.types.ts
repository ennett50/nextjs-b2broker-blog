import { ISeo, IStrapiAttributes } from './common.types';
import { IImageData } from './media.types';

export interface IArticle {
  title: string;
  intro: string;
  content: string;
  cover: {
    data: {
      attributes: IImageData;
    };
  };
  seo: ISeo;
  createdAt: string;
}

export interface IArticlesListProps {
  initialArticles: IStrapiAttributes<IArticle>[];
  total?: number;
}
