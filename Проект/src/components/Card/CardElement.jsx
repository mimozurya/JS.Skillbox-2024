import React from "react";
import { Link } from "react-router-dom";

const CardElement = (props) => {
    const { id, email, name, avatar } = props.data;

    return (
        <div className="card-container">
            <div className="card">
                <div className="card-img">
                    {/* <img src="/src/assets/img/avatar.png" alt="avatar" /> */}
                    <img src={avatar} alt="avatar" />
                </div>
                <div className="card-text">
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
                <Link to={`/user/${id}`}>
                    <button className="btn-go">Перейти на профиль</button>
                </Link>
            </div>
        </div>
    );
};

export default CardElement;
