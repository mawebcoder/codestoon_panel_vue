import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'categories',
        component: () => import('../../views/Articles/category/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/Articles/category/create'),
                name: 'category-article-create',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next,'article.category.store','ایجاد دسته بندی مقالات')

                }
            },
            {
                path: 'list',
                component: () => import('../../views/Articles/category/list'),
                name: 'category-article-list',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next,'article.category.index','لیست دسته بندی مقالات')

                }
            }
        ]
    }
]