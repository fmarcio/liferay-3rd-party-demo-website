import { Link } from "react-router-dom";
import { ClayInput } from "@clayui/form";
import { useQuery } from "../hooks/useQuery";

const Header = ({ value, onChange, showFilter = true, userName }) => {
  const userId = useQuery("userId");

  return (
    <header className="header d-flex justify-content-between py-4 px-6">
      <Link to={`/home?userId=${userId}`}>
        <img
          width={300}
          src="liferay-3rd-party-demo-website/logo.png"
          alt="logo"
        />
      </Link>

      <div className="header__right-side">
        <div className="d-flex">
          <ul className="fake-navigation mb-4">
            <li>
              <a href="/">News</a>
            </li>
            <li>
              <a href="/">Events</a>
            </li>
            <li>
              <a href="/">Documents</a>
            </li>
            <li>
              <a href="/">About </a>
            </li>
            <li>
              <a href="/">Education</a>
            </li>
            <li>
              <a href="/">Citizen Area</a>
            </li>
          </ul>

          {userName && (
            <div className="logged-in-user ml-8">
              welcome, {userName}!
              <span className="ml-2">
                <Link to="/login">Sign out</Link>
              </span>
            </div>
          )}
        </div>

        {showFilter && (
          <ClayInput
            onChange={onChange}
            placeholder="Type to filter by content recommendation..."
            value={value}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
