import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Registration.module.scss";
import { CONFIG } from "../../../shared/regConfig";

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

    // const navigate = useNavigate();

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
                    window.location.href = "/";
                    // navigate("/"); не скидывает id и token в localstorage
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

                {CONFIG.map((item) => (
                    <div key={item.field} className={styles["inputContainer"]}>
                        <input
                            type="text"
                            placeholder={item.placeholder}
                            value={user[item.field]}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    [item.field]: e.target.value,
                                })
                            }
                        />
                    </div>
                ))}

                <button className={styles["btnReg"]} onClick={registerUserAPI}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
};

export default Registration;
