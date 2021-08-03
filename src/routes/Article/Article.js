import ArticleTagsRoutes from "./ArticleTagsRoutes";

export default [
    {

        path: 'articles',
        component: () => import('../../views/Articles'),
        children: [
            ...ArticleTagsRoutes
        ]

    }
]