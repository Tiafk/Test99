import { useState, useEffect } from "react";
import styles from "../scss/main.module.scss";
import defaultAvatar from '../img/default-avatar.png';

function User({ userInf, onSave }) {
    const [editedUser, setEditedUser] = useState({});

    // Обновляем состояние, когда меняется выбранный пользователь
    useEffect(() => {
        setEditedUser(userInf || {}); 
    }, [userInf]);

    // Изменения в поле
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //Сохранение
    const handleSave = () => {
        onSave(editedUser);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.userName}>
                    {editedUser.name || "Выберите пользователя"}
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.avatar}>
                    <img src={defaultAvatar} alt="Аватар" />
                    <span className={styles.status}></span>
                </div>
                <div className={styles.information}>
                    <div className={styles.inf}>
                        <h2 className={styles.title}>Должность</h2>
                        <input 
                            type="text" 
                            name="jobTitle" 
                            value={editedUser.jobTitle || ""} 
                            placeholder="Не указано"
                            onChange={handleChange} 
                        />
                    </div>
                    <div className={styles.inf}>
                        <h2 className={styles.title}>Отдел</h2>
                        <input 
                            type="text" 
                            name="department" 
                            value={editedUser.department || ""} 
                            placeholder="Не указано"
                            onChange={handleChange} 
                        />
                    </div>
                    <div className={styles.inf}>
                        <h2 className={styles.title}>Компания</h2>
                        <input 
                            type="text" 
                            name="company" 
                            value={editedUser.company || ""} 
                            placeholder="Не указано"
                            onChange={handleChange} 
                        />
                    </div>
                </div>
                <button className={styles.btnSave} onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
}

export default User;
