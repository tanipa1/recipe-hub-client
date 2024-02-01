import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Providers/AuthProvider';

const UploadedRecipe = ({ recipe }) => {
    const { _id, recipe_photo, category, recipe_name, email } = recipe;
    const { user } = useContext(AuthContext);

    const handleDelete = recipe => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://recipe-hub-server-2nmd34o5u-tanipa1.vercel.app/recipes/${recipe._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            window.location.reload();
                            Swal.fire(
                                'Deleted!',
                                `${recipe.recipe_name} has been deleted.`,
                                'success'
                            )
                        }
                    })
            }
        })
    }


    return (
        <div className='flex  mb-8 items-center gap-3 bg-gray-200 pr-8 lg:px-0 lg:pr-5'>
            <img className='lg:w-36 lg:h-36 w-24' src={recipe_photo} alt="" />
            <div className='flex justify-between gap-16 lg:gap-0 items-center lg:grid'>
                <div>
                    <h1 className='lg:font-bold font-serif lg:text-2xl text-lg'>{recipe_name}</h1>
                    <p className='uppercase hidden lg:flex'><span className='font-bold'>Category: </span>{category}</p>
                </div>
                <Link className='lg:ml-0 flex' to={`/recipeDetails/${_id}`}>
                    <button className='btn lg:btn-sm btn-xs  login mt-2'>
                        <span className='hidden lg:flex'>Details</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" /></svg>
                    </button>
                </Link>
            </div>
            <div className='flex-none grid gap-4'>
                {user.email == email ?
                    <button onClick={() => handleDelete(recipe)} className='btn btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="maroon" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z" /></svg>Delete</button> : <></>
                }

                {user.email == email ?
                    <Link className='btn btn-sm' to={`/editRecipe/${_id}`}>
                        <button className='btn btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="green" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3" /></g></svg>Edit</button>
                    </Link> : <></>
                }
            </div>
        </div>
    );
};

export default UploadedRecipe;