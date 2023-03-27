const Perks = ({perk}) => {
    
    if(!perk) return null
    return (
        <>
        <button className="cursor-default hover:-translate-y-1 border border-purple-700 bg-transparent rounded-full px-4 py-2 shadow-md transition-all duration-200 dark:text-white dark:border-gray-700 hover:shadow-lg">
            {perk}
        </button>
        </>
    )
}

export default Perks