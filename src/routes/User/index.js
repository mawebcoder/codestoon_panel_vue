import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'users',
        component: () => import('../../views/User/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/User/create'),
                name: 'user-create',
                beforeEnter:(to,from,next)=>{
                    Auth.checkCanAccessThisRoute(next,'user.store','ایجاد کاربر جدید')
                }
            },
            {
                path: 'list',
                component: () => import('../../views/User/list'),
                name: 'user-list',
                beforeEnter:(to,from,next)=>{
                    Auth.checkCanAccessThisRoute(next,'user.index','لیست کاربران')
                }
            }
        ]
    }
]