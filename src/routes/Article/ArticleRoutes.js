import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'create',
        component: () => import('../../views/Articles/Create'),
        name: 'article-create',
        beforeEnter: (to, from, next) => {

            Auth.checkCanAccessThisRoute(next,'article.store','ایجاد مقاله')

        }
    },
    {
        path: 'list',
        component: () => import('../../views/Articles/list'),
        name: 'article-list',
        beforeEnter: (to, from, next) => {

            Auth.checkCanAccessThisRoute(next,'article.index','لیست مقالات')

        }
    },
    {
        path: 'edit/:id',
        component: () => import('../../views/Articles/Edit'),
        name: 'article-edit',
        beforeEnter: (to, from, next) => {

            Auth.checkCanAccessThisRoute(next,'article.update','به روز رسانی مقاله')

        }
    }
]