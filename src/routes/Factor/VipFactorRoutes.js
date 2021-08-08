export default [
    {
        path:'vip',
        component:()=>import('../../views/Factor/Vip/index'),
        children:[
            {
                path:'list',
                component:()=>import('../../views/Factor/Vip/list'),
                name:'factor-vip-list'
            }
        ]
    }
]