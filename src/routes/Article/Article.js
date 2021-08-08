import ArticleTagsRoutes from "./ArticleTagsRoutes";
import ArticleCategoriesRoutes from "./ArticleCategoriesRoutes";
import ArticleRoutes from "./ArticleRoutes";

export default [
    {

        path: 'articles',
        component: () => import('../../views/Articles'),
        children: [
            ...ArticleTagsRoutes,
            ...ArticleCategoriesRoutes,
            ...ArticleRoutes
        ]

    }
]