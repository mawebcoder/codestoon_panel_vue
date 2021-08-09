import Auth from "../../services/Auth/Auth";

export default [
    {
        path:'vip',
        component:()=>import('../../views/Factor/Vip/index'),
        children:[
            {
                path:'list',
                component:()=>import('../../views/Factor/Vip/list'),
                name:'factor-vip-list',
                beforeEnter:(to,from,next)=>{
                    Auth.checkCanAccessThisRoute(next,'factor.index','لیست فاکتور پلن ها')
                }
            }
        ]
    }
]