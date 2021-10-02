import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'roles',
        component: () => import('../../views/Role/index'),
        children: [

            {
                path: 'create',
                component: () => import('../../views/Role/create'),
                name: 'role-create',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'role.store', 'ایجاد نقش جدید')
                }
            },

            {
                path: 'list',
                component: () => import('../../views/Role/list'),
                name: 'role-list',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'role.index', 'لیست نقش ها')
                }
            },
            {
                path: 'edit/:id',
                component: () => import('../../views/Role/Edit'),
                name: 'role-edit',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'role.update', 'ویرایش نقش')
                }
            }
        ]
    }
]