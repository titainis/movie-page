import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";
import './AccountPage.scss';

interface User {
  username: string;
  email: string;
}

// ponytail: localStorage-only account, no password — swap for a real auth backend when one exists
const AccountPage = () => {
  const [user, setUser] = useState<User | null>(
    () => JSON.parse(localStorage.getItem("user") || "null")
  );

  const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newUser: User = {
      username: (form.get("username") as string).trim(),
      email: (form.get("email") as string).trim(),
    };
    if (!newUser.username || !newUser.email) return;
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <Header />
      <div className="container account-page pt-60 d-flex flex-column align-items-center">
        {user ? (
          <div className="account-page__card d-flex flex-column align-items-center text-center gap-2">
            <h2>Welcome, {user.username}</h2>
            <p className="mb-1">{user.email}</p>
            <p className="account-page__hint">Your favorites are saved on this device.</p>
            <Button className="account-page__submit" onClick={logout}>Log Out</Button>
          </div>
        ) : (
          <div className="account-page__card d-flex flex-column align-items-center text-center gap-2">
            <h2>Create Account</h2>
            <form onSubmit={createAccount} className="d-flex flex-column gap-3 w-100">
              <input
                className="account-page__input"
                name="username"
                type="text"
                placeholder="Username"
                required
                maxLength={30}
              />
              <input
                className="account-page__input"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
              <Button className="account-page__submit" type="submit">Create Account</Button>
            </form>

            <p className="account-page__hint pt-2 mb-1">or</p>
            <Link to="/movies" className="text-decoration-none">
              <Button className="account-page__guest">Continue as Guest</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountPage;
