import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UserTable from "../components/UserTable";

test("displays users in table", () => {


    const users = [

        {
            id: 1,
            name: "John Smith",
            email: "john@test.com",
            company: {
                name: "IT"
            }

        }

    ];



    render(

        <UserTable

            users={users}

            onEdit={() => { }}

            onDelete={() => { }}

        />

    );



    expect(
        screen.getByText("John")
    ).toBeInTheDocument();



    expect(
        screen.getByText("john@test.com")
    ).toBeInTheDocument();


});






test("delete button calls function", () => {


    const deleteMock = jest.fn();



    const users = [

        {

            id: 1,

            name: "John Smith",

            email: "john@test.com",

            company: {
                name: "IT"
            }

        }

    ];



    render(

        <UserTable

            users={users}

            onEdit={() => { }}

            onDelete={deleteMock}

        />

    );



    fireEvent.click(

        screen.getByText("Delete")

    );



    expect(deleteMock)
        .toHaveBeenCalledWith(1);



});