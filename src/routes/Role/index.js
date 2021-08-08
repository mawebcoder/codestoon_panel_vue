export default [
    {
        path: 'roles',
        component: () => import('../../views/Role/index'),
        children: [

            {
                path: 'create',
                component: () => import('../../views/Role/create'),
                name: 'role-create'
            },

            {
                path: 'list',
                component: () => import('../../views/Role/list'),
                name: 'role-list'
            }
        ]
    }
]