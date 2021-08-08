export default [
    {
        path: 'categories',
        component: () => import('../../views/Articles/category/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/Articles/category/create'),
                name: 'category-article-create'
            },
            {
                path: 'list',
                component: () => import('../../views/Articles/category/list'),
                name: 'category-article-list'
            }
        ]
    }
]