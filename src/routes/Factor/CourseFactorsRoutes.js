export default [
    {
        path:'courses',
        component:()=>import('../../views/Factor/Course/index'),
        children:[
            {
                path:'list',
                component:()=>import('../../views/Factor/Course/list'),
                name:'factor-course-list'
            }
        ]
    }
]