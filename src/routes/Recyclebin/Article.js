import Auth from "../../services/Auth/Auth";


export default [
    {
        path: 'articles',
        component: () => import('../../views/garbage/Article/index'),
        children: [
            {
                path: '/',
                component: () => import('../../views/garbage/Article/Article'),
                name: 'article-garbage',
                  beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'user.update', 'سطل آشغال مقالات')
                }
            },
            {
                path:'categories',
                component:()=>import('../../views/garbage/Article/ArticleCategory'),
                name:'article-category-garbage',
                  beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'user.update', 'سطل آشغال دسته بندی مقالات')
                }
            }
        ]
    }
]