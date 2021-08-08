export default [
    {
        path: 'articles',
        component: () => import('../../views/Comment/Article/index'),
        children: [
            {
                path: 'list',
                component: () => import('../../views/Comment/Article/list'),
                name: 'comment-article-list'
            }
        ]
    }
]