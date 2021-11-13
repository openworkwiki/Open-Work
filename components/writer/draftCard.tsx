import advancedFormat from 'dayjs/plugin/advancedFormat'
import utc from "dayjs/plugin/utc"
import dayjs from "dayjs"
import { useRouter } from 'next/router'
dayjs.extend(advancedFormat)
dayjs.extend(utc)

interface DraftCardProps {
    draftName?: string,
    created: string,
    id: number,
    deleteDraft: (id:number) => void
}



const DraftCard = ({draftName, created, id, deleteDraft}: DraftCardProps) => { 
    const {push} = useRouter()
    return (
        <div 
        onClick={() => {
            push(`/drafts/${id}`)
        }}
        className={`h-auto w-full border-gray-600 border rounded-md hover:shadow transition-all py-4 px-4 cursor-pointer`}>
            <div className={`flex justify-between`}>
                <div className={`text-xl mb-2`}>
                Draft
                </div>
                <button
                onClick={(e) => {
                    e.stopPropagation()
                    deleteDraft(id)
                }}
                >
                Delete
                </button>
            </div>
            <div className={`flex justify-between`}>
                <div>
                    {draftName}
                </div>
                <div>
                    {dayjs(created).local().format("DD-MM-YYYY HH:mm")}
                </div>
            </div>
        </div>
    )
}

export default DraftCard