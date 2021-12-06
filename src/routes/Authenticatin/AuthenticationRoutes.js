import Auth from "../../services/Auth/Auth";
import store from "../../store/store";

export default [
    {
        path: '/authentication',
        component: () => import('../../views/Auth/Authentication'),
        children: [
            {
                path: 'login',
                component: () => import('../../views/Auth/AuthenticationPage'),
                name: 'auth-login',
            },
            {
                path: 'verify',
                component: () => import('../../views/Auth/VerifyCode'),
                name: 'verify-code',
                beforeEnter: (to, from, next) => {

                    Auth.verifyTempPassword()
                        .then(() => {

                            Auth.getExpireCodeDate()
                                .then((res) => {

                                    localStorage.setItem('code_expire_date', res.data.data)
                                    store.state.loader = false
                                    next()
                                }).catch(() => {
                                next({name: 'auth-login'})
                            })


                        }).catch(() => {

                        next({name: 'auth-login'})

                    })
                }
            }
        ]
    }
]