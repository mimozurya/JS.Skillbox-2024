import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./Registration.module.scss";
import styles from "./Registration.module.scss";

const Registration = () => {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        avatar: "",
        id: "",
        token: "",
    });

    const registerUserAPI = () => {
        axios
            .post("https://reqres.in/api/register", {
                email: user.email,
                password: user.password,
            })
            .then((responce) => {
                console.log(responce);
                if (responce.status === 200) {
                    setUser((prevUser) => {
                        return {
                            ...prevUser,
                            id: responce.data.id,
                            token: responce.data.token,
                        };
                    });
                    localStorage.setItem("user", JSON.stringify(user));
                }
            })
            .catch((error) => {
                alert("Ошибка при регистрации пользователя: ", error);
            });
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user.id, user.token]);

    return (
        <div className={styles["containerRegistration"]}>
            <div className={styles["formReg"]}>
                <h1>Привет</h1>
                <p>Давай создадим аккаунт</p>
                <div className={styles["inputContainer"]}>
                    <input
                        type="text"
                        placeholder="Имя"
                        value={user.firstname}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                firstname: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={styles["inputContainer"]}>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={user.lastname}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                lastname: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={styles["inputContainer"]}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                email: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={styles["inputContainer"]}>
                    <input
                        type="text"
                        placeholder="Пароль"
                        value={user.password}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                password: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={styles["inputContainer"]}>
                    <input
                        type="text"
                        placeholder="Ссылка на аватар"
                        value={user.avatar}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                avatar: e.target.value,
                            })
                        }
                    />
                </div>
                <button className={styles["btnReg"]} onClick={registerUserAPI}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
};

export default Registration;
