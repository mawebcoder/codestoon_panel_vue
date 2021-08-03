export default {
    path:'articles',
    component:()=>import('../views/Articles/index'),
    children:[
        {
            path:'create',
            component:()=>import('../views/Articles/Create'),
            name:'create-article'
        }
    ]
}