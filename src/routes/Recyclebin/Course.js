export default [
    {
        path:'courses',
        component:()=>import('../../views/garbage/Course/index'),
        children:[
            {
                path:'/',
                component:()=>import('../../views/garbage/Course/Course'),
                name:'course-garbage'
            },
            {
                path:'categories',
                component:()=>import('../../views/garbage/Course/Category'),
                name:'course-category-garbage'
            },
            {
                path:'sections',
                component:()=>import('../../views/garbage/Course/Section'),
                name: 'course-section-garbage'

            },
            {
                path:'videos',
                component:()=>import('../../views/garbage/Course/Video'),
                name: 'course-videos-garbage'

            }
        ]
    }
]