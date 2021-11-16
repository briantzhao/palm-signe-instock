import "./Header.scss";
import Logo from "../../assets/logo/InStock-Logo_2x.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <main className="header">
        <div>
          <Link to="/">
            <img className="header__logo" src={Logo} alt="instock logo" />
          </Link>
        </div>

        <section className="header__section-container">
          <div>
            <Link to="/">
              <h3 className="header__link">Warehouses</h3>
            </Link>
          </div>
          <div>
            <Link to="/inventory/">
              <h3 className="header__link">Inventory</h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
