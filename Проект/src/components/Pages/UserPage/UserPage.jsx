import React from "react";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import "./UserPage.scss";

import Modal from "./Modal/Modal";

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const { id } = useParams();

    const changeOldUser = useCallback((user) => {
        const changeUser = {
            ...user,
        };

        setUser(changeUser);
        changeUserAPI(user);
    });

    const changeUserAPI = () => {
        axios.patch(`https://reqres.in/api/users/${id}`, user);
    };

    useEffect(() => {
        axios
            .get(`https://reqres.in/api/users/${id}`)
            .then((res) => res.data)
            .then((data) => setUser(data.data))
            .catch((err) => console.log(err));
    }, [id]);

    console.log(user);
    const close = useCallback(() => setOpen(false), []);

    if (!user) return <h3>Загрузка...</h3>;

    return (
        <>
            <div className="userPageContainer">
                <div className="leftSide">
                    <img src={user.avatar} alt="avatar" />
                </div>
                <div className="rightSide">
                    <p>ID пользователя: {user.id}</p>
                    <p>Имя: {user.first_name}</p>
                    <p>Фамилия: {user.last_name}</p>
                    <p>Эл. почта: {user.email}</p>
                    <div className="buttons">
                        <Link to={"*"}>
                            <button>Назад</button>
                        </Link>
                        <button onClick={() => setOpen(true)}>Редактировать</button>
                    </div>
                </div>
            </div>
            <Modal open={open} close={close} user={user} changeOldUser={changeOldUser} />
        </>
    );
};

export default UserPage;
