import Auth from "../../services/Auth/Auth";

export default [
    {
        path:'courses',
        component:()=>import('../../views/Factor/Course/index'),
        children:[
            {
                path:'list',
                component:()=>import('../../views/Factor/Course/list'),
                name:'factor-course-list',
                beforeEnter:(to,from,next)=>{
                    Auth.checkCanAccessThisRoute(next,'factor.index','لیست فاکتور دوره ها')
                }
            }
        ]
    }
]