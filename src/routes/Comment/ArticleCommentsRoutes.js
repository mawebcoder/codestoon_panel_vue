import Auth from "../../services/Auth/Auth";

export default [
	{
		path: 'articles',
		component: () => import('../../views/Comment/Article/index'),
		children: [
			{
				path: 'list',
				component: () => import('../../views/Comment/Article/list'),
				name: 'comment-article-list',
				beforeEnter: (to, from, next) =>
				{

					Auth.checkCanAccessThisRoute(next, 'comment.index', 'لیست نظرات مقالات')

				}
			},
			{
				path: 'edit/:id',
				component: () => import('../../views/Comment/Article/Edit'),
				name: 'comment-articles-edit',
				beforeEnter:(to,from,next)=>{

					Auth.checkCanAccessThisRoute(next, 'comment.update', 'لیست ویرایش نظر مقاله')

				}
			}
		]
	}
]
