import styles from '../scss/main.module.scss';
import { FixedSizeList as List } from 'react-window';

function UserList({ users, onUserClick, handleLoadMore, loading }) {
  const Row = ({ index, style }) => {
    const user = users[index];
    return (
      <div className={styles.userItem} style={style} onClick={() => onUserClick(user)}>
        {user.name}
      </div>
    );
  };

  return (
    <div className={styles.wrapperList}>
      <List
        height={500}
        itemCount={users.length}
        itemSize={45}
        width="100%"
        style={{ overflowX: 'hidden' }}
      >
        {Row}
      </List>

      {users.length >= 50 && (
        <button className='btn' onClick={handleLoadMore} disabled={loading}>
          {loading ? "Загрузка..." : "Загрузить больше"}
        </button>
      )}
    </div>
  );
}

export default UserList;
