import React, { useState } from "react";
import classNames from "classnames";

import styles from "./Modal.module.scss";

const Modal = React.memo((props) => {
    const { open, close, user, changeOldUser } = props;

    function updateUser(name, value) {
        setChangeUser({ ...changeUser, [name]: value });
    }

    function setUser() {
        if (changeUser.first_name && changeUser.last_name && changeUser.email) {
            changeOldUser(changeUser);
            close();
            setChangeUser({ id: "", first_name: "", last_name: "", email: "", avatar: "" });
        }
    }

    const { id, first_name, last_name, email, avatar } = user;
    const [changeUser, setChangeUser] = useState({
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        avatar: avatar,
    });

    return (
        <div
            onClick={close}
            className={classNames(styles["modal-container"], { [styles.open]: open })}
        >
            <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
                <h6 className={styles["modal__title"]}>Изменить данные пользователя:</h6>
                <input
                    className={styles["modal__input"]}
                    placeholder={user.first_name}
                    value={changeUser.first_name}
                    onChange={(e) => updateUser("first_name", e.target.value)}
                />
                <input
                    className={styles["modal__input"]}
                    placeholder={user.last_name}
                    value={changeUser.last_name}
                    onChange={(e) => updateUser("last_name", e.target.value)}
                />
                <input
                    className={styles["modal__input"]}
                    placeholder={user.email}
                    value={changeUser.email}
                    onChange={(e) => updateUser("email", e.target.value)}
                />
                <button className={styles["modal__add"]} onClick={setUser}>
                    Подтвердить изменения
                </button>
            </div>
        </div>
    );
});

export default Modal;
