import Course from "./Course";
import Article from "./Article";
import User from './user'
import Factor from './Factor'
export default [
    {
        path: 'recyclebin',
        component: () => import('../../views/garbage/index'),
        children: [
            ...Course,
            ...Article,
            ...User,
            ...Factor

        ]
    }
]