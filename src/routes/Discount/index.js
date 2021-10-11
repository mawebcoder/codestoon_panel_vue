import Auth from "../../services/Auth/Auth";
export default [
    {
        path:'discounts',
        component:()=>import('../../views/Discount/index'),
        children:[
            {
                path:'create',
                component:()=>import('../../views/Discount/Create'),
                name:'discount-create',
                 beforeEnter:(to,from,next)=>{
                    Auth.checkCanAccessThisRoute(next,'discount.store','ایجاد کد تخفیف')
                }
            },
            {
                path:'list',
                component:()=>import('../../views/Discount/list'),
                name:'discount-list',
                 beforeEnter:(to,from,next)=>{
                    Auth.checkCanAccessThisRoute(next,'discount.index','لیست کدهای تخفیف')
                }
            },
            {
                path:'edit/:id',
                component:()=>import('../../views/Discount/Edit'),
                name:'discount-edit',
                beforeEnter:(to,from,next)=>{
                    Auth.checkCanAccessThisRoute(next,'discount.update','ویرایش کد تخفیف')
                }
            }
        ]
    }
]