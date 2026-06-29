import { useState } from "react";


function FilterModal({ onFilter, onClose }) {


    const [filters, setFilters] = useState({

        firstName: "",
        lastName: "",
        email: "",
        department: ""

    });



    const handleChange = (e) => {

        setFilters({

            ...filters,

            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = (e) => {

        e.preventDefault();

        onFilter(filters);

        onClose();

    };



    return (

        <div>


            <h2>
                Filter Users
            </h2>


            <form onSubmit={handleSubmit}>


                <input

                    name="firstName"

                    placeholder="First Name"

                    onChange={handleChange}

                />


                <input

                    name="lastName"

                    placeholder="Last Name"

                    onChange={handleChange}

                />



                <input

                    name="email"

                    placeholder="Email"

                    onChange={handleChange}

                />



                <input

                    name="department"

                    placeholder="Department"

                    onChange={handleChange}

                />



                <button type="submit">

                    Apply

                </button>



                <button

                    type="button"

                    onClick={onClose}

                >

                    Close

                </button>


            </form>


        </div>

    );

}


export default FilterModal;