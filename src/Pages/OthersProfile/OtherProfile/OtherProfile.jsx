import { useLoaderData } from 'react-router-dom';
import OtherProf from '../OtherProf/OtherProf';
import { useEffect, useState } from 'react';
import useTitle from '../../../hooks/useTitle';

const OtherProfile = () => {
    useTitle('Recipe Provider Profile')
    const recipe = useLoaderData();
    const { recipe_provider } = recipe;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://recipe-hub-server-2nmd34o5u-tanipa1.vercel.app/users')
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    const filteredUser = users.filter((user) => recipe_provider == user.name);

    return (
        <div>
            {
                filteredUser.map(user => <OtherProf
                    key={user._id}
                    user={user}
                ></OtherProf>)
            }
        </div>
    );
};

export default OtherProfile;