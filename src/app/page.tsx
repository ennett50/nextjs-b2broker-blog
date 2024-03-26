import { fetchArticles } from '@/api/articles.api';
import { ArticlesList } from '@/components';
import { ARTICLES_LIMIT } from '@/constants';

async function ArticlesFeed(): Promise<JSX.Element> {
  const { data, meta } = await fetchArticles({
    fields: ['intro', 'title'],
    limit: ARTICLES_LIMIT,
  });

  return (
    <div className='container'>
      <ArticlesList initialArticles={data} total={meta?.pagination.total} />
    </div>
  );
}

export const revalidate = 0;

export default ArticlesFeed;
