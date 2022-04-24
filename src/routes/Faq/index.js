import Auth from "../../services/Auth/Auth";
export default [
    {
        path:'faq',
        component:()=>import('../../views/Faq/index'),
        children:[
            {
                path:'create',
                component:()=>import('../../views/Faq/create'),
                name:'faq-create',
                  beforeEnter:(to,from,next)=>{
                    Auth.checkCanAccessThisRoute(next,'faq.store','ایجاد سوال متداول')
                }
            },
            {
                path:'list',
                component:()=>import('../../views/Faq/list'),
                name:'faq-list',
                  beforeEnter:(to,from,next)=>{
                    Auth.checkCanAccessThisRoute(next,'faq.index','لیست سوالات متداول')
                }
            },
            {
                path:'edit/:id',
                component:()=>import('../../views/Faq/Edit'),
                name:'faq-edit',
                  beforeEnter:(to,from,next)=>{
                    Auth.checkCanAccessThisRoute(next,'faq.update','ویرایش سوال متداول')
                }
            }

        ]
    }
]