import Auth from '../../services/Auth/Auth'
export default [
    {
        path: 'reports',
        component: () => import('../../views/Report/index'),
        children: [
            {
                path: 'charts',
                component: () => import('../../views/Report/Chart'),
                name: 'chart',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next,'dashboard.index','چارت مدیریت')

                }
            },
            {
                path: 'statistics',
                component: () => import('../../views/Report/statistic'),
                name: 'statistic',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next,'dashboard.index','آمار و اعلانات')

                }
            }
        ]
    }
]