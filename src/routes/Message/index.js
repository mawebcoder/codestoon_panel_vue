import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'messages',
        component: () => import('../../views/Message/index'),
        children: [
            {
                path: 'sms',
                component: () => import('../../views/Message/sms/index'),
                name: 'sms',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'message.index', 'پیامک ها')
                }
            },
            {
                path: 'email',
                component: () => import('../../views/Message/Email/index'),
                name: 'email',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'message.index', 'ایمیل ها')
                }
            }
        ]
    }
]