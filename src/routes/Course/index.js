import CourseTagsRoutes from "./CourseTagsRoutes";
import CourseCategoryRoutes from "./CourseCategoryRoutes";
import CourseSectionsRoutes from "./CourseSectionsRoutes";

export default [
    {
        path: 'courses',
        component: () => import('../../views/Course/index'),
        children: [

            {
                path: 'create',
                component: () => import('../../views/Course/create'),
                name: 'course-create'
            },
            {
                path: 'list',
                component: () => import('../../views/Course/list'),
                name: 'course-list'
            },
            ...CourseTagsRoutes,
            ...CourseCategoryRoutes,
            ...CourseSectionsRoutes
        ]
    }
]