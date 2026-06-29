import { useEffect, useState } from "react";

import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../api/userApi";


function useUsers() {


    const [users, setUsers] = useState([]);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);



    const fetchUsers = async () => {

        try {

            setLoading(true);

            const response = await getUsers();

            setUsers(response.data);

        }
        catch (error) {

            setError("Failed to fetch users");

        }
        finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        fetchUsers();

    }, []);




    // Add User
    const addUser = async (user) => {

        try {

            const response = await createUser(user);


            setUsers(prev => [

                ...prev,

                response.data

            ]);

        }
        catch (error) {

            setError("Unable to add user");

        }

    };





    // Edit User
    const editUser = async (id, user) => {

        try {

            const response = await updateUser(id, user);


            setUsers(prev =>

                prev.map(item =>

                    item.id === id

                        ? response.data

                        : item

                )

            );


        }
        catch (error) {

            setError("Unable to update user");

        }

    };






    // Delete User
    const removeUser = async (id) => {

        try {

            await deleteUser(id);


            setUsers(prev =>

                prev.filter(user => user.id !== id)

            );


        }
        catch (error) {

            setError("Unable to delete user");

        }

    };





    return {

        users,

        error,

        loading,

        addUser,

        editUser,

        removeUser

    };


}


export default useUsers;