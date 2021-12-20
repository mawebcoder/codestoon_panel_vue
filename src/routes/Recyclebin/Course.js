import Auth from "../../services/Auth/Auth";

export default [
    {
        path:'courses',
        component:()=>import('../../views/garbage/Course/index'),
        children:[
            {
                path:'/',
                component:()=>import('../../views/garbage/Course/Course'),
                name:'course-garbage',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'user.update', 'سطل آشغال دوره ها')
                }
            },
            {
                path:'categories',
                component:()=>import('../../views/garbage/Course/Category'),
                name:'course-category-garbage',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'user.update', 'سطل آشغال دسته بندی دوره ها')
                }
            },

            {
                path:'sections',
                component:()=>import('../../views/garbage/Course/Section'),
                name: 'course-section-garbage',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'user.update', 'سطل آشغال فصل های دوره ها')
                }

            },
            {
                path:'videos',
                component:()=>import('../../views/garbage/Course/Video'),
                name: 'course-videos-garbage',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'user.update', 'سطل آشغال ویدیوها')
                }

            }
        ]
    }
]