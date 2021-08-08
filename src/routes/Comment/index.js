import ArticleCommentsRoutes from "./ArticleCommentsRoutes";
import CourseCommentsRoutes from "./CourseCommentsRoutes";

export default [
    {
        path: 'comments',
        component: () => import('../../views/Comment/index'),
        children: [
            ...ArticleCommentsRoutes,
            ...CourseCommentsRoutes
        ]
    }
]