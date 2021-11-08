import { useEffect, useState } from "react"
import useDebounce from "../components/hooks/useDebounce"
import { SupabaseServiceClass } from "../utils/supabase-client"

class SearchService extends SupabaseServiceClass {
    async searchByString(string:string) {
        const {data, error} = await this.supabase
        .rpc("find_entries", {
            search_input: string
        })
        return data
    }
}
const searchService = new SearchService()

interface SearchResult {
    type: string,
    id: number,
    name: string
}

const Search = () => {
    const [searchString, setSearchString] = useState("")
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const debouncedSearchString = useDebounce(searchString, 1000)
    

    useEffect(() => {
        if (debouncedSearchString) {
            searchService
            .searchByString(debouncedSearchString)
            .then((data) => {
                setSearchResults(data)
            })
        }
    }, [debouncedSearchString])

    return (
        <div className={`p-6 `}>
            <input 
            value={searchString}
            onChange={(E) => {
                setSearchString(E.target.value)
            }}
            className={`mb-5`}
            type="text" 
            name="" 
            id="" />
            <div className={`grid grid-cols-1 gap-2`}>
                {searchResults.map((res) => {
                    return <div className={`w-full p-2 border bg-indigo-500 grid grid-cols-3 text-white`}>
                        <div>
                            {res.name}
                        </div>
                        <div>
                            {res.type}
                        </div>
                        <div>
                            {res.id}
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Search