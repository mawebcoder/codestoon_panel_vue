export default [
    {
        path: 'tags',
        component: () => import('../../views/Articles/tags'),
        children: [
            {
                path:'create',
                component:()=>import('../../views/Articles/tags/Create'),
                name:'create-article-tag'
            },
            {
                path:'list',
                component:()=>import('../../views/Articles/tags/list'),
                name:'list-article-tag'
            }
        ]
    }
]