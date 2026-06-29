import { useEffect, useState } from "react";


function UserForm({ onSave, selectedUser }) {


    const [user, setUser] = useState({

        name: "",
        email: "",
        department: ""

    });


    const [error, setError] = useState("");




    useEffect(() => {

        if (selectedUser) {

            setUser({

                name: selectedUser.name || "",

                email: selectedUser.email || "",

                department: selectedUser.company?.name || ""

            });

        }

    }, [selectedUser]);







    function handleChange(e) {


        setUser({

            ...user,

            [e.target.name]: e.target.value

        });


    }






    function validate() {


        if (!user.name) {

            return "Name is required";

        }


        if (!user.email) {

            return "Email is required";

        }


        if (!user.email.includes("@")) {

            return "Enter valid email";

        }


        if (!user.department) {

            return "Department is required";

        }


        return "";

    }







    function handleSubmit(e) {


        e.preventDefault();



        const validationError = validate();



        if (validationError) {

            setError(validationError);

            return;

        }



        setError("");



        onSave(user);



        setUser({

            name: "",

            email: "",

            department: ""

        });



    }







    return (

        <form onSubmit={handleSubmit}>


            <h2>

                {selectedUser ? "Edit User" : "Add User"}

            </h2>





            {error && (

                <p>

                    {error}

                </p>

            )}







            <input

                name="name"

                placeholder="Name"

                value={user.name}

                onChange={handleChange}

            />






            <input

                name="email"

                placeholder="Email"

                value={user.email}

                onChange={handleChange}

            />






            <input

                name="department"

                placeholder="Department"

                value={user.department}

                onChange={handleChange}

            />






            <button type="submit">

                Save

            </button>





        </form>

    );

}



export default UserForm;