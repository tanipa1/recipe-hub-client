import React from 'react';
import { Link } from 'react-router-dom';

const RecipeTable = ({recipe}) => {
    const {_id, recipe_provider, recipe_photo, category, recipe_name} = recipe;
    return (
        <tbody>
            {/* row 1 */}
            <tr>
                <td>
                    <div className="flex items-center space-x-3">
                        <div className="lg:w-24 h-24 hidden lg:flex rounded-xl">
                            <img src={recipe_photo} />
                        </div>
                        <div>
                            <div className="font-bold text-xs lg:text-lg ">{recipe_name}</div>
                        </div>
                    </div>
                </td>
                <td >
                    <p className='lg:uppercase '>{category}</p>
                </td>
                <td className='hidden lg:table-cell'>
                    {recipe_provider}
                </td>
                <th>
                    <Link to={`/recipeDetails/${_id}`}><button className="btn login btn-xs">Details</button></Link>
                </th>
            </tr>
        </tbody>
    );
};

export default RecipeTable;