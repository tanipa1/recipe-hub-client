import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const EditRecipe = () => {
    useTitle('Update Recipe');
    const { user } = useContext(AuthContext);

    const recipe = useLoaderData();
    const { _id, recipe_name, } = recipe;

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

                    const { recipe_name, video, ingredients, description, category } = data;

                    const updatedRecipes = { recipe_name, video, category, ingredients, description, recipe_photo: imgURL }

                    fetch(`http://localhost:5000/recipes/${_id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updatedRecipes)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'success',
                                    title: 'Recipe has been Updated',
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                                reset();
                            }
                        })
                }
            })
    }

    return (
        <div className='pb-12'>
            {/* banner */}
            <div className="hero p-7 mb-20" style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/cheese-fruit-meat-board-dark-background-seen-from-top-with-empty-space-text_176841-11221.jpg?w=1060)' }}>
                <div className="hero-overlay ring-blue-500 bg-opacity-40"></div>
                <div className="hero-content text-white">
                    <div className="max-w-md">
                        <h1 className=" text-center text-5xl font-serif font-bold">Update {recipe_name}</h1>
                    </div>
                </div>
            </div>
            {/* banner */}

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-b bg-[#89CFF0] to-white mx-2 lg:mx-48 shadow-2xl lg:px-20 py-12 rounded-xl ">
                <div className="lg:flex justify-between gap-12 mb-6 w-full">
                    <div className="flex items-center gap-14">
                        <p className="font-mono">Recipe </p>
                        <input className="input input-bordered" type="text" {...register("recipe_name", { required: true, maxLength: 80 })} defaultValue={recipe_name} placeholder="Enter Recipe Name" id="" />
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="font-mono">Video</p>
                        <input className="input input-bordered" type="url" {...register("video", { required: true, maxLength: 80 })} placeholder="Recipe Video Link" id="" />
                    </div>
                </div>
                <div className="lg:flex justify-between gap-12 mb-6">
                    <div className="flex items-center gap-7">
                        <p className="font-mono">Your  Name</p>
                        <input className="input input-bordered" defaultValue={user?.displayName} type="text" {...register("recipe_provider", { required: true, maxLength: 80 })} placeholder="Enter your Name" id="" />
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="font-mono">Email</p>
                        <input className="input input-bordered" type="email" {...register("email", { required: true, maxLength: 80 })} defaultValue={user?.email} placeholder="Enter Your Email" id="" />
                    </div>
                </div>
                <div className="lg:flex justify-between gap-14 mb-6">
                    <div className="flex items-center gap-10">
                        <p className="font-mono">Category</p>
                        <select id="countries" {...register("category", { required: true })} className=" text-gray-900 text-sm rounded-md w-52 focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                    <div className="flex items-center gap-3">
                        <p className="font-mono">Photo</p>
                        <input type="file" {...register("recipe_photo", { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
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
                    <input type="submit" className="btn font-serif text-lg bg-black text-white rounded-3xl" value="Update Recipe" />
                </div>
            </form>
        </div>
    );
};

export default EditRecipe;