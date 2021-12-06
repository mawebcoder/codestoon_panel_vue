import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'courses',
        component: () => import('../../views/Comment/Course/index'),
        children: [
            {
                path: 'list',
                component: () => import('../../views/Comment/Course/list'),
                name: 'comment-course-list',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next,'comment.index','لیست نظرات دوره ها')

                }
            },
            {
                path: 'edit/:id',
                component: () => import('../../views/Comment/Course/Edit'),
                name: 'comment-course-edit',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next,'comment.update','به روز رسانی کامنت')

                }
            }
        ]
    }
]