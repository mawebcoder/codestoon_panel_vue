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

                    Auth.checkCanAccessThisRoute(next,'article.tags.store','ایجاد تگ مقاله')

                }
            },
            {
                path: 'list',
                component: () => import('../../views/Articles/tags/list'),
                name: 'list-article-tag',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next,'article.tags.index','لیست تگ مقالات')

                }
            },
            {
                path: 'edit/:id',
                component: () => import('../../views/Articles/tags/Edit'),
                name: 'edit-article-tag',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next,'article.tags.update','به روز رسانی تگ مقاله')

                }
            }
        ]
    }
]