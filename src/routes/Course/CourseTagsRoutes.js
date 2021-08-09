import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'tags',
        component: () => import('../../views/Course/Tag/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/Course/Tag/create'),
                name: 'course-tag-create',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next, 'course.tag.store', 'ایجاد تگ دوره')

                }
            },
            {
                path: 'list',
                component: () => import('../../views/Course/Tag/list'),
                name: 'course-tag-list',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next, 'course.tag.index', 'لیست تگ دوره ها')

                }
            }
        ]
    }
]