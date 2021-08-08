export default [
    {
        path: 'users',
        component: () => import('../../views/User/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/User/create'),
                name: 'user-create'
            },
            {
                path: 'list',
                component: () => import('../../views/User/list'),
                name: 'user-list'
            }
        ]
    }
]