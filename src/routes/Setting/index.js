export default [
    {
        path:'setting',
        component:()=>import('../../views/Setting/index'),
        children:[
            {
                path:'update',
                component:()=>import('../../views/Setting/create'),
                name:'setting'
            }
        ]
    }
]