export default [
    {
        path:'videos',
        component:()=>import('../../views/Video/index'),
        children:[
            {
                path:'create',
                component:()=>import('../../views/Video/create'),
                name:'video-create'
            },
            {
                path:'list',
                component:()=>import('../../views/Video/list'),
                name:'video-list'
            }
        ]
    }
]