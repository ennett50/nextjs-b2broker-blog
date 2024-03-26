import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IComment } from '@/types/comment.types';
import { IStrapiResponse } from '@/types/common.types';

const COMMENT_API = 'api/comments';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  }),
  endpoints: builder => ({
    fetchComments: builder.query<
      IStrapiResponse<IComment>,
      { articleId: string }
    >({
      query: ({ articleId }) =>
        `${COMMENT_API}?sort=createdAt:desc&filters[article][id][$eq]=${articleId}`,
    }),
    addComment: builder.mutation({
      query: newComment => ({
        url: COMMENT_API,
        method: 'POST',
        body: { data: newComment },
      }),
    }),
  }),
});

export const { useFetchCommentsQuery, useAddCommentMutation } = commentsApi;
