import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'vip',
        component: () => import('../../views/Vip/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/Vip/create'),
                name: 'vip-create',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next, 'vip.store', 'ایجاد پلن جدید')

                }
            },
            {
                path: 'list',
                component: () => import('../../views/Vip/list'),
                name: 'vip-list'
            },
            {
                path: 'edit/:id',
                component: () => import('../../views/Vip/Edit'),
                name: 'vip-edit',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'vip.update', 'به روز رسانی اشتراک ویژه')
                }
            }
        ]
    }
]