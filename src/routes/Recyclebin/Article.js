export default [
    {
        path: 'articles',
        component: () => import('../../views/garbage/Article/index'),
        children: [
            {
                path: '/',
                component: () => import('../../views/garbage/Article/Article'),
                name: 'article-garbage'
            },
            {
                path:'categories',
                component:()=>import('../../views/garbage/Article/ArticleCategory'),
                name:'article-category-garbage'
            }
        ]
    }
]