import { useState, useEffect, useCallback } from "react";
import User from "./components/user";
import UserList from './components/userList';

import './scss/_global.scss';

function App() {
  const [users, setUsers] = useState([]); // Состояние для списка пользователей
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [page, setPage] = useState(1); // Текущая страница для пагинации
  const usersPerPage = 50; //кол-во пользователей при загрузке

  const loadUsers = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/users.json"); // Загружаем файл JSON
      const data = await response.json();
      
      // Разбиваем данные на страницы и добавляем только текущую страницу в состояние
      const startIndex = (page - 1) * usersPerPage;
      const endIndex = startIndex + usersPerPage;
      const usersPage = data.users.slice(startIndex, endIndex);
      
      setUsers((prevUsers) => [...prevUsers, ...usersPage]); // Добавляем новых пользователей в список
      setLoading(false);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadUsers(); // Загружаем пользователей при изменении страницы
  }, [loadUsers]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); // Переход на следующую страницу
  };

  const handleUserClick = (user) => {
    setSelectedUser({...user});
  };

  //Сохранение изменений в поле Input
  const handleSaveUser = async (updatedUser) => {
    const updatedUsers = users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(updatedUser);

    try {
        await fetch("/save-users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUsers),
        });
    } catch (error) {
        console.error("Ошибка сохранения данных:", error);
    }
};

  return (
    <div className="App">
      <UserList 
        users={users} 
        loading={loading}
        onUserClick={handleUserClick}
        handleLoadMore={handleLoadMore}
        />
      <User userInf={selectedUser} onSave={handleSaveUser}/>
    </div>
  );
}

export default App;
