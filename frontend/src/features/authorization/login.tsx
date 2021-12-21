import { Return } from "../links/Return";

export function Login() {
  return (
    <div className="container">
      <div className="row">
        <h1 style={{ textAlign: "center" }}>Logowanie</h1>
        <div style={{ width: "30%", margin: "25px auto" }}>
          <form method="post">
            <div className="form-group">
              <input className="form-control" type="text" name="username" placeholder="Nazwa użytkownika" />
            </div>
            <div className="form-group">
              <input className="form-control" type="password" name="password" placeholder="Hasło" />
            </div>
            <div className="form-group">
              <button className="btn btn-lg btn-primary btn-block">Zaloguj</button>
            </div>
          </form>
          <Return />
        </div>
      </div>
    </div >
  );
}
