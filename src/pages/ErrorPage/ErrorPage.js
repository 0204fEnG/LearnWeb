import { NavLink, useNavigate, useRouteError } from "react-router-dom";
import './ErrorPage.scss'
export default function ErrorPage() {
    const error = useRouteError();
    const navigate=useNavigate()
    const returnLastPage = () => {
        navigate(-1)
    }
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
          </p>
        <NavLink className="last-page" onClick={returnLastPage}>返回</NavLink>
    </div>
  );
}