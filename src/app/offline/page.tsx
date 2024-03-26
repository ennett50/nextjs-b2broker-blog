import Markdown from 'react-markdown';

import { fetchArticles } from '@/api/articles.api';

export default async function ArticlesFeedOffline(): Promise<JSX.Element> {
  const { data } = await fetchArticles({
    fields: ['content', 'title'],
    limit: 1,
  });

  const {
    attributes: { title, content },
  } = data[0];

  return (
    <div className='container prose prose-slate'>
      <h1>К сожалению, вы offline</h1>
      <p>Но вы можете прочитать последнюю добавленую статью</p>

      <h2>{title}</h2>
      <Markdown>{content}</Markdown>
    </div>
  );
}
