export default [
    {
        path: 'create',
        component: () => import('../../views/Articles/Create'),
        name: 'article-create'
    },
    {
        path: 'list',
        component: () => import('../../views/Articles/list'),
        name: 'article-list'
    }
]