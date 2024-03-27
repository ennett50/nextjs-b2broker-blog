# Blog on Next.js and Strapi

This project is a blog built using Next.js version 14 and the headless CMS Strapi as the backend.

## Host on Netlify

You can preview the application by visiting [https://b2blog-nextjs.netlify.app/](https://b2blog-nextjs.netlify.app/)

## Strapi as Backend

- Strapi repository: [strapi-cloud-b2bbroker-blog](https://github.com/ennett50/strapi-cloud-b2bbroker-blog)
- Cloud Strapi (14-day trial) available at: [Strapi Cloud](https://pretty-renewal-04587256ac.strapiapp.com)

## Technology Stack

- Node.js version 20
- React version 18
- Next.js version 14
- Redux Toolkit for state management
- Axios for HTTP requests
- RTK Query for integrating requests with Redux

#### Access

Use the provided credentials to add and edit blog articles. All APIs are public and accessible for requests through the specified address.

### Frontend Launch

1. Create a `.env` file and specify the Strapi API domain `https://pretty-renewal-04587256ac.strapiapp.com`:

```
  NEXT_PUBLIC_STRAPI_API_URL=<домен Strapi для API>
```

2. Install dependencies and start app%

```
  yarn install
  yarn build
  yarn start
```

## Main Architectural Decisions

### Main Page

- SSR is used for quick delivery of the latest added articles.
- Loading additional articles is implemented through client-side rendering.
- Server responses are optimized by fetching only the necessary fields.

### Detailed Article Page

- Article pages are pre-generated using SSG.
- SSR is used for new articles, which are then cached for static display.
- Comments are loaded through CSR using Redux for caching and optimistic UI updates, improving responsiveness and state management.

In summary, ISR is used to update article pages so that new content is available without a full site rebuild.

### SEO and Accessibility

- Applying PWA for static caching and improved accessibility to increase conversions in search results.
- Adaptive design for mobile devices.
- High scores in Lighthouse.
- `next-image` for automatic image optimization: lazy loading, compression, and adaptation for screens.
- Metadata: Dynamic addition of SEO metadata through the Strapi admin panel.

### Style Guide and Code Base

- All code is typed.
- The project and code structure follows best practices.
- Code documentation with JSDoc.
- Modular tests with Jest and Testing Library.

## Optimization and Future Improvements

- Using streaming and additional PWA caching for improved loading.
- Integrating mock data for development with [mswjs](https://mswjs.io/).
- Refactoring and developing a UI library in accordance with designer requirements.
- Improving form handling.
- As the code grows, consider revising the project architecture to reduce cyclic dependencies, using [FSD](https://feature-sliced.design/), [husky](https://typicode.github.io/husky/) and others packages and practices.
- Improving the typing of Strapi models.
- Tune up Strapi for better interaction.
- Anndddd check [deploying](https://nextjs.org/docs/app/building-your-application/deploying)

**Overall, I just couldn't stop in time because it can always be made even better!!!**

**Looking forward to feedback on my test task. Thank you!**
