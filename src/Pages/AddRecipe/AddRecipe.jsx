import React, { useContext } from 'react';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddRecipe = () => {
    useTitle('Share Recipe');
    const { user } = useContext(AuthContext);

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.recipe_photo[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { recipe_name, recipe_provider, video, email, ingredients, description, category } = data;

                    const recipes = { recipe_name, recipe_provider, email, video, category, ingredients, description, recipe_photo: imgURL, user_photo: user?.photoURL }
                    console.log(recipes);

                    fetch('http://localhost:5000/recipes', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(recipes)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'success',
                                    title: 'Recipe has been shared',
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                            }
                            reset();
                        })
                }
            })
    }

    return (
        <div className='pb-12'>
            {/* banner */}
            <div className="hero p-7 lg:mb-10 mb-5" style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/cheese-fruit-meat-board-dark-background-seen-from-top-with-empty-space-text_176841-11221.jpg?w=1060)' }}>
                <div className="hero-overlay bg-[#f8cf5f] bg-opacity-40"></div>
                <div className="hero-content text-white">
                    <div className="max-w-md">
                        <h1 className=" text-center text-xl lg:text-5xl font-serif font-bold">Share Your Recipe</h1>
                    </div>
                </div>
            </div>
            {/* banner */}

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-b from-[#f8cf5f] to-white mx-2 lg:mx-48 lg:shadow-2xl lg:px-20 px-4 py-12 rounded-xl">
                <div className="lg:flex gap-3 justify-between mb-6 w-full">
                    <div className="mb-3 lg:mb-0 lg:w-1/2">
                        <p className="font-mono">Recipe </p>
                        <input className="input w-full input-bordered" type="text" {...register("recipe_name", { required: true, maxLength: 80 })} placeholder="Enter Recipe Name" id="" />
                    </div>
                    <div className="mb-3 lg:mb-0 lg:w-1/2">
                        <p className="font-mono">Video</p>
                        <input className="input w-full input-bordered" type="url" {...register("video", { required: true, maxLength: 80 })} placeholder="Recipe Video Link" id="" />
                    </div>
                </div>
                <div className="lg:flex justify-between gap-3 mb-6">
                    <div className="mb-3 lg:mb-0 lg:w-1/2">
                        <p className="font-mono">Your  Name</p>
                        <input className="input w-full input-bordered" defaultValue={user?.displayName} type="text" {...register("recipe_provider", { required: true, maxLength: 80 })} placeholder="Enter your Name" id="" />
                    </div>
                    <div className="mb-3 lg:mb-0 lg:w-1/2">
                        <p className="font-mono">Email</p>
                        <input className="input w-full input-bordered" type="email" {...register("email", { required: true, maxLength: 80 })} defaultValue={user?.email} placeholder="Enter Your Email" id="" />
                    </div>
                </div>
                <div className="lg:flex justify-between gap-3 mb-6">
                    <div className="mb-3 lg:mb-0 lg:w-1/2">
                        <p className="font-mono">Category</p>
                        <select id="countries" {...register("category", { required: true })} className="w-full text-gray-900 lg:text-sm text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose a category</option>
                            <option value="breakfast-delights">Breakfast Delights</option>
                            <option value="comfort-food-classics">Comfort Food Classics</option>
                            <option value="healthy-eats">Healthy Eats</option>
                            <option value="quick_and_easy-meals">Quick & Easy Meals</option>
                            <option value="vegetarian-creations">Vegetarian Creations</option>
                            <option value="non-veg_and_meat-delights">Non-veg & Meat Delights</option>
                            <option value="sweet-treats_and_desserts">Sweet Treats & Desserts</option>
                            <option value="appetizers_and_snacks">Appetizers & Snacks</option>
                            <option value="grilling_and_bbq-specialties">Grilling & BBQ Specialties</option>
                            <option value="pasta_and_noodle-galore">Pasta & Noodle Galore</option>
                            <option value="soups_and_stews">Soups & Stews</option>
                            <option value="seafood-specialties">Seafood Specialties</option>
                            <option value="kid-friendly_fare">Kid-Friendly Fare</option>
                            <option value="fresh_and_flavorful-salads">Fresh & Flavorful Salads</option>
                            <option value="drinks_and_beverages">Drinks & Beverages</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="mb-3 lg:mb-0 lg:w-1/2">
                        <p className="font-mono">Photo</p>
                        <input type="file" {...register("recipe_photo", { required: true })} className="file-input file-input-bordered w-full " />
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <p className="font-mono">Ingredients</p>
                    <textarea className="textarea textarea-bordered h-[100px]  w-full" {...register("ingredients", { required: true })} placeholder='Recipe Ingredients Here...' id="" cols="10" rows="10"></textarea>
                </div>
                <div className="flex items-center gap-3">
                    <p className="font-mono">Description</p>
                    <textarea className="textarea textarea-bordered h-[100px]  w-full" {...register("description", { required: true })} placeholder='Share full process of the recipe...' id="" cols="10" rows="10"></textarea>
                </div>
                <div className="form-control w-1/2 mt-6 mx-auto">
                    <input type="submit" className="btn font-serif text-lg login rounded-3xl" value="Add Recipe" />
                </div>
            </form>
        </div>
    );
};

export default AddRecipe;