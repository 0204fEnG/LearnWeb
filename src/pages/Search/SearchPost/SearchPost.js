import { useSearchParams } from "react-router-dom"
const SearchPost = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    return (
        <div className="search-post-container">
            <p>{searchParams.get('p')}</p>
            <p>{searchParams.get('type')}</p>
        </div>
    )
}
export default SearchPost