export default [
    {
        path: 'reports',
        component: () => import('../../views/Report/index'),
        children: [
            {
                path: 'charts',
                component: () => import('../../views/Report/Chart'),
                name: 'chart'
            },
            {
                path: 'statistics',
                component: () => import('../../views/Report/statistic'),
                name: 'statistic'
            }
        ]
    }
]