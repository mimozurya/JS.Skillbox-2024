import React from "react";
import axios from "axios";

import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

import "./UserPage.scss";
import Modal from "./Modal/Modal";

const changeUserAPI = (id, user) => {
    axios.patch(`https://reqres.in/api/users/${id}`, user);
};

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const { id } = useParams();

    const changeOldUser = useCallback((user) => {
        setUser(user);
        changeUserAPI(user.id, user);
    });

    useEffect(() => {
        axios
            .get(`https://reqres.in/api/users/${id}`)
            .then((res) => res.data)
            .then((data) => setUser(data.data))
            .catch((err) => console.log(err));
    }, [id]);

    const close = useCallback(() => setOpen(false), [setOpen]);

    if (!user) return <h3>Загрузка...</h3>;

    const { avatar, first_name, last_name, email } = user;

    return (
        <>
            <div className="userPageContainer">
                <div className="leftSide">
                    <img src={avatar} alt="avatar" />
                </div>
                <div className="rightSide">
                    <p>ID пользователя: {user.id}</p>
                    <p>Имя: {first_name}</p>
                    <p>Фамилия: {last_name}</p>
                    <p>Эл. почта: {email}</p>
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
