import Auth from "../../services/Auth/Auth";
export default [
    {
        path: 'sections',
        component: () => import('../../views/Course/Section/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/Course/Section/create'),
                name: 'course-section-create',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next, 'course.section.store', 'ایجاد فصل جدید')

                }
            },
            {
                path: 'list',
                component: () => import('../../views/Course/Section/list'),
                name: 'course-section-list',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next, 'course.section.index', 'لیست فصل ها')

                }
            },
            {
                path: 'edit/:id',
                component: () => import('../../views/Course/Section/Edit'),
                name: 'course-section-edit',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next, 'course.section.update', 'به روزرسانی فصل')

                }
            }
        ]
    }
]