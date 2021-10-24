import CourseTagsRoutes from "./CourseTagsRoutes";
import CourseCategoryRoutes from "./CourseCategoryRoutes";
import CourseSectionsRoutes from "./CourseSectionsRoutes";
import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'courses',
        component: () => import('../../views/Course/index'),
        children: [

            {
                path: 'create',
                component: () => import('../../views/Course/create'),
                beforeEnter: (to, from, next) => {

                    Auth.checkCanAccessThisRoute(next,'course.store','ایجاد دوره')

                },
                name: 'course-create'
            },
            {
                path: 'list',
                component: () => import('../../views/Course/list'),
                name: 'course-list'
            },
            {
                path: 'edit/:id',
                component: () => import('../../views/Course/Edit'),
                name: 'course-edit'
            },
            ...CourseTagsRoutes,
            ...CourseCategoryRoutes,
            ...CourseSectionsRoutes
        ]
    }
]