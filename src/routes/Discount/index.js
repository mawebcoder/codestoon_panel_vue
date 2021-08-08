export default [
    {
        path:'discounts',
        component:()=>import('../../views/Discount/index'),
        children:[
            {
                path:'create',
                component:()=>import('../../views/Discount/Create'),
                name:'discount-create'
            },
            {
                path:'list',
                component:()=>import('../../views/Discount/list'),
                name:'discount-list'
            }
        ]
    }
]