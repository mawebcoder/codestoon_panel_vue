export default [
    {
        path: 'messages',
        component: () => import('../../views/Message/index'),
        children: [
            {
                path: 'sms',
                component: () => import('../../views/Message/sms/index'),
                name: 'sms'
            },
            {
                path: 'email',
                component: () => import('../../views/Message/Email/index'),
                name: 'email'
            }
        ]
    }
]