// Layouts
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutLanding from '../layouts/LayoutLanding';

// Pages
import Landing from '../pages/Landing';
import Admin from '../pages/Admin';
import Users from '../pages/Users';
import Services from '../pages/Services';
import Places from '../pages/Places';
import Tips from '../pages/Tips';
import Links from '../pages/Links';
import Categories from '../pages/Categories';
import States from '../pages/States';
import SignIn from '../pages/SignIn';

// Error Page
import ErrorPage from '../pages/ErrorPage';


const routes = [
    {
        path: "/",
        component: LayoutLanding,
        exact: true,
        routes: [
            {
                path: "/",
                component: Landing,
                exact: true,
            }
        ]
    },
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: Admin,
                exact: true
            },
            {
                path: "/admin/login",
                component: SignIn,
                exact: true
            },
            {
                path: "/admin/users",
                component: Users,
                exact: true
            },
            {
                path: "/admin/services",
                component: Services,
                exact: true
            },
            {
                path: "/admin/places",
                component: Places,
                exact: true
            },
            {
                path: "/admin/tips",
                component: Tips,
                exact: true
            },
            {
                path: "/admin/links",
                component: Links,
                exact: true
            },
            {
                path: "/admin/categories",
                component: Categories,
                exact: true
            },
            {
                path: "/admin/states",
                component: States,
                exact: true
            }
        ]
    },
    {
        component: ErrorPage,
        exact: false
    },
];

export default routes;