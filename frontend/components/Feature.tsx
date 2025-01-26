

export const Feature = ({title, subtitle}: {
    title: string,
    subtitle: string
}) => {
    return <div className="flex border">
        <Check />
        <div className="flex-col justify-center ">
            <div className="flex">
                <div className="font-bold text-[1vmax] max-sm:text-[1.8vmax]">
                    {title}
                </div>

                <div className="pl-1 pt-1  text-[0.8vmax] max-sm:pt-0.5  max-sm:text-[1.5vmax]">
                    {subtitle}
                </div>
            </div>
        </div>
    </div>
}

function Check () {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 pt-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
  
}