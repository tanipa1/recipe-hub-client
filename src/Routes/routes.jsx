import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import LoginNew from "../Pages/Login/LoginNew";
import Register from "../Pages/Register/Register";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Profile from "../Pages/Profile/Profile";
import AllRecipe from "../Pages/AllRecipe/AllRecipe";
import Recipe_Details from "../Pages/Recipe_Details/Recipe_Details";
import OtherProfile from "../Pages/OthersProfile/OtherProfile/OtherProfile";
import Grocery from "../Pages/Grocery/Grocery";
import Homemade from "../Pages/Homemade/Homemade/Homemade";
import AddSeller from "../Pages/Homemade/AddSeller/AddSeller";
import RecipeBook from "../Pages/RecipeBook/RecipeBook";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AddRecipe from "../Pages/AddRecipe/AddRecipe";
import EditRecipe from "../Pages/EditRecipe/EditRecipe";

const router = createBrowserRouter([
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    },
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('https://recipe-hub-server-2nmd34o5u-tanipa1.vercel.app/recipes')
            },
            {
                path: '/login',
                element: <LoginNew></LoginNew>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: '/contact',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/grocery',
                element: <Grocery></Grocery>
            },
            {
                path: '/homemade',
                element: <Homemade></Homemade>,
                loader: () => fetch('https://recipe-hub-server-2nmd34o5u-tanipa1.vercel.app/sellers')
            },
            {
                path: '/addSeller',
                element: <PrivateRoute><AddSeller></AddSeller></PrivateRoute>
            },
            {
                path: '/addRecipe',
                element: <PrivateRoute><AddRecipe></AddRecipe></PrivateRoute>
            },
            {
                path: '/recipes',
                element: <AllRecipe></AllRecipe>,
                loader: () => fetch('https://recipe-hub-server-2nmd34o5u-tanipa1.vercel.app/recipes')
            },
            {
                path: '/recipeBooks',
                element: <RecipeBook></RecipeBook>
            },
            {
                path: '/recipeDetails/:id',
                element: <PrivateRoute><Recipe_Details></Recipe_Details></PrivateRoute>,
                loader: ({ params }) => fetch(`https://recipe-hub-server-2nmd34o5u-tanipa1.vercel.app/recipes/${params.id}`)
            },
            {
                path: '/editRecipe/:id',
                element: <PrivateRoute><EditRecipe></EditRecipe></PrivateRoute>,
                loader: ({ params }) => fetch(`https://recipe-hub-server-2nmd34o5u-tanipa1.vercel.app/recipes/${params.id}`)
            },
            {
                path: '/otherProfile/:id',
                element: <PrivateRoute><OtherProfile></OtherProfile></PrivateRoute>,
                loader: ({ params }) => fetch(`https://recipe-hub-server-2nmd34o5u-tanipa1.vercel.app/recipes/${params.id}`)
            },
        ]
    },
]);

export default router;