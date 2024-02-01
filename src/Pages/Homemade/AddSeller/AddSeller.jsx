import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const AddSeller = () => {
    const { user } = useContext(AuthContext);

    const registerSeller = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const contact = form.contact.value;
        const location = form.location.value;
        const description = form.description.value;

        const sellers = {
            seller_name: name,
            seller_email: email,
            seller_photo: photo,
            contact,
            location,
            description
        }
        fetch('https://recipe-hub-server-2nmd34o5u-tanipa1.vercel.app/sellers', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sellers)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast('Best Wishes! New Homemade Seller', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
                form.reset();
            })
    }
    return (
        <div className="hero min-h-screen bg-gradient-to-b from-[#491B15] to-white">

    <form onSubmit={registerSeller} className="bg-base-100 mx-2 lg:mx-48 shadow-2xl lg:px-24 px-10 py-12 rounded-xl">
        <h1 className="text-center text-white mb-10 font-bold text-2xl font-serif bg-gradient-to-b from-[black] to-[#C87F0D] py-5">Become a Homemade Seller</h1>

        <div className="flex flex-col mb-6">
            <label htmlFor="name" className="font-mono">Seller Name</label>
            <input className="input input-bordered" defaultValue={user?.displayName} type="text" name="name" placeholder="Seller Name" id="name" />
        </div>

        <div className="flex flex-col mb-6">
            <label htmlFor="email" className="font-mono">Email</label>
            <input className="input input-bordered" type="email" name="email" defaultValue={user?.email} placeholder="Seller Email" id="email" />
        </div>

        <div className="flex flex-col gap-3 lg:flex-row mb-6">
            <div className="flex flex-col gap-3">
                <label htmlFor="contact" className="font-mono">Contact</label>
                <input className="input input-bordered" type="text" name="contact" placeholder="Seller Contact No." id="contact" />
            </div>

            <div className="flex flex-col gap-3">
                <label htmlFor="photo" className="font-mono">Photo</label>
                <input className="input input-bordered" type="url" name="photo" defaultValue={user?.photoURL} placeholder="Seller Photo" id="photo" />
            </div>
        </div>

        <div className="flex flex-col mb-6">
            <label htmlFor="location" className="font-mono">Location</label>
            <input className="input input-bordered" type="text" name="location" placeholder="Seller Location" id="location" />
        </div>

        <div className="flex flex-col mb-6">
            <label htmlFor="description" className="font-mono">Description</label>
            <textarea className="textarea textarea-bordered h-[100px] w-full" name="description" placeholder='Type of foods you deliver' id="description" cols="10" rows="10"></textarea>
        </div>

        <div className="form-control w-full mt-6">
            <input type="submit" className="btn font-serif text-white text-lg bg-[#491B15] rounded-3xl" value="Register as Seller" />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    </form>
</div>

    );
};

export default AddSeller;