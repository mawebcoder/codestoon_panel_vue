import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'categories',
        component: () => import('../../views/Course/Category/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/Course/Category/create'),
                name: 'course-category-create',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next, 'course.category.store', 'ایجاد دسته بندی دوره')

                }
            },
            {
                path: 'list',
                component: () => import('../../views/Course/Category/list'),
                name: 'course-category-list',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next, 'course.category.index', 'لیست دسته بندی دوره ها')

                }
            },
            {
                path: 'edit/:id',
                component: () => import('../../views/Course/Category/Edit'),
                name: 'course-category-edit',
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next, 'course.category.index', 'لیست دسته بندی دوره ها')

                }
            }
        ]
    }
]