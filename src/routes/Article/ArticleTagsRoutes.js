import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'tags',
        component: () => import('../../views/Articles/tags'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/Articles/tags/Create'),
                name: 'create-article-tag',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next,'article.tags.store')

                }
            },
            {
                path: 'list',
                component: () => import('../../views/Articles/tags/list'),
                name: 'list-article-tag',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next,'article.tags.index')

                }
            }
        ]
    }
]