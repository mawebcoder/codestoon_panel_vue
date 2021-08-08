import ArticleTagsRoutes from "./ArticleTagsRoutes";
import ArticleCategoriesRoutes from "./ArticleCategoriesRoutes";

export default [
    {

        path: 'articles',
        component: () => import('../../views/Articles'),
        children: [
            ...ArticleTagsRoutes,
            ...ArticleCategoriesRoutes
        ]

    }
]