import clsx from "clsx";
import React from "react"


const Wrapper = ({children,  classNames}: {children: React.ReactNode, classNames?:string}) => {
    return(
        <>
            <div className={clsx("p-12 md:px-16", classNames)}>
                {children}
            </div>
        </>
    )
}

export default Wrapper;