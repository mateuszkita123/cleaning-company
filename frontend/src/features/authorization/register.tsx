import { ReturnToHomePage } from "../links/ReturnToHomePage";

export function Register() {
  return (
    <div className="container">
      <div className="row">
        <h1 style={{ textAlign: "center" }}>Rejestracja</h1>
        <div style={{ width: "30%", margin: "25px auto" }}>
          <form method="post">
            <div className="form-group">
              <input className="form-control" type="text" name="username" placeholder="Nazwa użytkownika" />
            </div>
            <div className="form-group">
              <input className="form-control" type="email" name="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <input className="form-control" type="password" name="password" placeholder="Hasło" />
            </div>
            <div className="form-group">
              <button className="btn btn-lg btn-primary btn-block">
                Zarejestruj się!
              </button>
            </div>
          </form>
          <ReturnToHomePage />
        </div>
      </div>
    </div>
  );
}
