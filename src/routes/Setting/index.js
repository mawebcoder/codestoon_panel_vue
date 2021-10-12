import Auth from "../../services/Auth/Auth";

export default [
    {
        path:'setting',
        component:()=>import('../../views/Setting/index'),
        children:[
            {
                path:'update',
                component:()=>import('../../views/Setting/create'),
                name:'setting',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'setting.index', 'تنطیمات')
                }
            }
        ]
    }
]