import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';

import { fetchArticle, fetchArticles } from '@/api/articles.api';
import { AdaptiveImage, CommentForm, CommentsList } from '@/components';
import { BLOG_NAME } from '@/constants';

type ArticleDetailProps = {
  params: { id: string };
};

async function ArticleDetail({
  params,
}: ArticleDetailProps): Promise<JSX.Element> {
  const data = await fetchArticle(params.id);

  if (!data || !data.attributes) {
    return notFound();
  }

  const {
    attributes: { title, content, cover },
  } = data;

  return (
    <article className='prose prose-slate container'>
      <h1>{title}</h1>
      <AdaptiveImage imageData={cover.data.attributes} />
      <Markdown>{content}</Markdown>
      <CommentsList articleId={data.id} />
      <CommentForm articleId={data.id} />
    </article>
  );
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const { data } = await fetchArticles();

  return data.map(article => ({
    id: article.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ArticleDetailProps): Promise<Metadata> {
  const data = await fetchArticle(params.id);

  if (!data || !data.attributes) {
    return notFound();
  }

  const {
    attributes: {
      seo: { metaTitle, metaDescription },
    },
  } = data;

  const title = `${metaTitle} | ${BLOG_NAME}`;

  return {
    title,
    description: metaDescription,
  };
}

// TODO need more information about how often need to update the article page
// depends on views and updating article in the cms
export const revalidate = 3600; // 1 hour

export default ArticleDetail;
