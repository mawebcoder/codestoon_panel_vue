export default [
    {
        path:'vip',
        component:()=>import('../../views/Vip/index'),
        children:[
            {
                path:'create',
                component:()=>import('../../views/Vip/create'),
                name:'vip-create'
            },
            {
                path:'list',
                component:()=>import('../../views/Vip/list'),
                name:'vip-list'
            }
        ]
    }
]