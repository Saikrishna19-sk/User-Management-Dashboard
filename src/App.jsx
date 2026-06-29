import { useState } from "react";
import useUsers from "./hooks/useUsers";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import FilterModal from "./components/FilterModal";


function App() {


  const {
    users,
    loading,
    error,
    addUser,
    editUser,
    removeUser
  } = useUsers();



  const [selectedUser, setSelectedUser] = useState(null);


  const [search, setSearch] = useState("");


  const [limit, setLimit] = useState(10);


  const [sortOrder, setSortOrder] = useState("asc");


  const [showFilter, setShowFilter] = useState(false);



  const [filters, setFilters] = useState({

    firstName: "",
    lastName: "",
    email: "",
    department: ""

  });





  const handleSave = (user) => {


    if (selectedUser) {

      editUser(selectedUser.id, user);

      setSelectedUser(null);

    }
    else {

      addUser(user);

    }

  };





  const applyFilter = (filterData) => {

    setFilters(filterData);

  };





  let filteredUsers = users.filter(user => {


    const firstName =
      user.name.split(" ")[0]
        .toLowerCase();


    const lastName =
      user.name.split(" ")[1]
        ?.toLowerCase() || "";



    return (

      firstName.includes(
        filters.firstName.toLowerCase()
      )


      &&


      lastName.includes(
        filters.lastName.toLowerCase()
      )


      &&


      user.email
        .toLowerCase()
        .includes(
          filters.email.toLowerCase()
        )


      &&


      user.company.name
        .toLowerCase()
        .includes(
          filters.department.toLowerCase()
        )


      &&


      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );


  });







  filteredUsers.sort((a, b) => {


    if (sortOrder === "asc") {

      return a.name.localeCompare(b.name);

    }

    return b.name.localeCompare(a.name);


  });






  filteredUsers = filteredUsers.slice(0, limit);






  return (

    <div>


      <h1>User Management Dashboard</h1>




      {loading && (
        <p>Loading users...</p>
      )}



      {error && (
        <p>{error}</p>
      )}






      <UserForm

        onSave={handleSave}

        selectedUser={selectedUser}

      />






      <h3>Search</h3>


      <input

        placeholder="Search by name"

        value={search}

        onChange={
          e => setSearch(e.target.value)
        }

      />





      <button

        onClick={() => setShowFilter(true)}

      >

        Filter

      </button>






      {
        showFilter && (

          <FilterModal

            onFilter={applyFilter}

            onClose={
              () => setShowFilter(false)
            }

          />

        )
      }






      <h3>Sort</h3>


      <select

        value={sortOrder}

        onChange={
          e => setSortOrder(e.target.value)
        }

      >

        <option value="asc">
          A-Z
        </option>


        <option value="desc">
          Z-A
        </option>


      </select>







      <h3>Rows</h3>


      <select

        value={limit}

        onChange={
          e => setLimit(Number(e.target.value))
        }

      >

        <option value="10">
          10
        </option>

        <option value="25">
          25
        </option>

        <option value="50">
          50
        </option>

        <option value="100">
          100
        </option>


      </select>








      <UserTable

        users={filteredUsers}

        onEdit={setSelectedUser}

        onDelete={removeUser}

      />



    </div>

  );

}


export default App;