export default [
    {
        path: '/authentication',
        component: () => import('../../views/Auth/Authentication'),
        children: [
            {
                path: 'login',
                component: () => import('../../views/Auth/AuthenticationPage'),
                name: 'auth-login'
            },
            {
                path: 'verify',
                component: () => import('../../views/Auth/VerifyCode'),
                name: 'verify-code'
            }
        ]
    }
]