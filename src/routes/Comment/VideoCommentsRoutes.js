import Auth from "../../services/Auth/Auth";


export default [
	{
		path: 'videos',
		component: () => import('../../views/Comment/Video/index'),
		children: [
			{
				path: 'list',
				component: () => import('../../views/Comment/Video/List'),
				name: 'comment-video-list',
				beforeEnter: (to, from, next) =>
				{

					Auth.checkCanAccessThisRoute(next, 'comment.index', 'لیست نظرات ویدیوها')

				}
			},
			{
				path: 'edit/:id',
				component: () => import('../../views/Comment/Video/Edit'),
				name: 'comment-video-edit',
				beforeEnter: (to, from, next) =>
				{

					Auth.checkCanAccessThisRoute(next, 'comment.update', 'ویرایش نظرات ویدیو ها')

				}
			}
		]
	}
]
