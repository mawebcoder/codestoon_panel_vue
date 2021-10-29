import ArticleCommentsRoutes from "./ArticleCommentsRoutes";
import CourseCommentsRoutes from "./CourseCommentsRoutes";
import VideoCommentsRoutes from "./VideoCommentsRoutes";

export default [
	{
		path: 'comments',
		component: () => import('../../views/Comment/index'),
		children: [
			...ArticleCommentsRoutes,
			...CourseCommentsRoutes,
			...VideoCommentsRoutes
		]
	}
]
