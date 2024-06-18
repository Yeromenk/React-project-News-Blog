import './Styles/LoginStyle.css'

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import ArticlePage from './Pages/ArticlePage'
import AboutUs from './Pages/AboutUs'
import { Navigation } from './Pages/UIComponents'
import Write from './Pages/Write'
import ArticleView from './Pages/ArticleView'
import ErrorPage from './Pages/ErrorPage'
import { fetchPosts, fetchPost } from './loaders'

const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

const Layout = () => {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,

        children: [
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: 'about',
                element: <AboutUs />,
            },
            {
                path: '/',
                loader: fetchPosts,
                element: <ArticlePage />,
            },
            {
                path: '/write',
                element: <Write />,
            },
            {
                path: '/write/:id',
                loader: ({ params }) => {
                    return fetchPost(params.id)
                },
                element: <Write />,
            },
            {
                path: '/article/:id',
                loader: ({ params }) => {
                    return fetchPost(params.id)
                },
                element: <ArticleView />,
            },
        ],
    },
])

export default App
