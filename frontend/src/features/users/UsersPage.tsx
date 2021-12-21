import { FC, useState, useEffect } from "react";

interface IUser {
  _id: String,
  username: String,
  email: String,
  role_id: String
}

interface IUsersState {
  users: IUser[];
  status: 'idle' | 'loading' | 'failed';
}

export const UsersPage: FC = () => {
  const [users, setUsers] = useState<IUsersState["users"]>([]);
  const [status, setStatus] = useState<IUsersState["status"]>('idle');

  useEffect(() => {
    setStatus('loading');
    fetch('http://localhost:4000/uzytkownicy', {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    })
      .then(res => res.json())
      .then((result) => {
        setStatus('idle');
        setUsers(result);
      })
      .catch(error => {
        console.log("Błąd: ", error);
        setStatus('failed');
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 style={{ textAlign: "center" }}>Zarejestrowani użytkownicy</h1>
      </div>
      <div className="row text-center flex-wrap">
        {status !== 'failed' ? (<table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nazwa użytkownika</th>
              <th>Email</th>
              <th>Rola</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id.toString()}>
                <th>{user._id}</th>
                <th>{user.username}</th>
                <th>{user.email}</th>
                <th>{user.role_id}</th>
              </tr>))}
          </tbody>
        </table>) : <p>Nie udało się pobrać danych</p>}
      </div>
    </div>
  );
}
