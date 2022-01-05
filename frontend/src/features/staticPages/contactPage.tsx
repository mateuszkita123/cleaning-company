import { FC } from 'react';
import { ReturnToHomePage } from '../links/ReturnToHomePage';

export const ContactPage: FC = () => {
  return (<div className="container">
    <div className="row">
      <h1 style={{ textAlign: "center" }}>Skontaktuj się z nami</h1>
      <div style={{ width: "50%", margin: "25px auto" }}>
        <form method="POST">
          <div className="form-group">
            <label htmlFor={"firstName"}>Imię</label>
            <input required className="form-control" type="text" name="firstName" id="firstName" placeholder="Twoje imię" />
          </div>
          <div className="form-group">
            <label htmlFor={"message"}>Wiadomość</label>
            <textarea required className="form-control" name="message" id="message"
              placeholder="Twoja wiadomość(max. 500 znaków)" rows={8} maxLength={500}></textarea>
          </div>
          <p>
            <button type="submit">Wyślij</button>
          </p>
        </form>
        <ReturnToHomePage />
      </div>
    </div>
  </div >)
}