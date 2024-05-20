import React from "react";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useLocalStorage } from "../../hook/useLocalStorage";

import CardElement from "../../Card/CardElement";
import Paginator from "../../Paginator/Paginator";

const PAGE_SIZE = 3;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState({
        searching: "",
        page: 1,
        sorting: "",
    });
    const [siteUser, setSiteUser] = useLocalStorage("user", []);

    function updateFilter(name, value) {
        setFilter({ ...filter, [name]: value });
    }

    useEffect(() => {
        async function fetchData() {
            axios
                .get("https://reqres.in/api/users")
                .then((res) => res.data)
                .then((data) => {
                    const usersData = data.data;
                    const modifiedUsers = usersData.map((userData) => ({
                        id: userData.id,
                        name: userData.first_name + " " + userData.last_name,
                        email: userData.email,
                        avatar: userData.avatar,
                    }));
                    setUsers(modifiedUsers);
                })
                .catch((err) => setUsers([]));
        }
        fetchData();

        if (siteUser.length === 0) {
            window.location.href = "/registration";
        }
    }, []);

    const filteredSortedUsers = useMemo(() => {
        if (!users.length) return [];

        const { searching, sorting } = filter;

        const result = users.filter((user) =>
            user.name.toLowerCase().includes(searching.toLowerCase())
        );
        if (sorting) {
            result.sort((user1, user2) => user1[sorting].localeCompare(user2[sorting]));
        }

        return result;
    }, [users, filter]);

    const pagesCount = Math.ceil(filteredSortedUsers.length / PAGE_SIZE);
    const pageIndex = PAGE_SIZE * (filter.page - 1);

    return (
        <div className="container">
            <div className="siteUser">
                <p>
                    Вы вошли как: {siteUser.firstname} {siteUser.lastname}
                </p>
            </div>
            <input
                className="user-input"
                value={filter.searching}
                onChange={(e) =>
                    setFilter({
                        searching: e.target.value,
                        page: 1,
                    })
                }
                placeholder="Поиск..."
            />

            {users.length && (
                <div className="c-container">
                    {filteredSortedUsers.slice(pageIndex, 3 + pageIndex).map((user) => (
                        <CardElement key={user.id} data={user} />
                    ))}
                </div>
            )}

            {pagesCount > 1 && (
                <Paginator
                    activePage={filter.page}
                    updatePage={(button) => updateFilter("page", button)}
                    pagesCount={Math.ceil(users.length / PAGE_SIZE)}
                ></Paginator>
            )}
        </div>
    );
};

export default UserList;
