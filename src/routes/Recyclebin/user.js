import Auth from "../../services/Auth/Auth";

export default [
    {
        path:'users',
        component:()=>import('../../views/garbage/User/index'),
        name:'users-garbage',
        beforeEnter: (to, from, next) => {
            Auth.checkCanAccessThisRoute(next, 'user.update', 'سطل آشغال کاربران')
        }
    }
]