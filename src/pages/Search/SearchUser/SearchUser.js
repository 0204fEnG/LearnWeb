import { useSearchParams } from "react-router-dom"
const SearchUser = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    return (
        <div className="search-post-container">
            <p>{searchParams.get('p')}</p>
            <p>{searchParams.get('type')}</p>
        </div>
    )
}
export default SearchUser