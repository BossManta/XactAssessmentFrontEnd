import { FunctionComponent } from "react";

interface SpacedListProps {
    labels: any[]
    values: any[]
    className?: string
}

//A component that allows for a neatly spaced (Label: Value) list.
const SpacedList: FunctionComponent<SpacedListProps> = ({labels, values, className}) => {
    return ( 
        <div className={`${className} flex justify-between`}>
            <div className="mr-5 font-bold">
                {
                    labels.map(l=>
                        <p key={l}>
                            {l}
                        </p>
                    )
                }
            </div>

            <div className="text-right">
                {
                    values.map(v=>
                        <p key={v}>
                            {v}
                        </p>
                    )
                }
            </div>
        </div>
     );
}
 
export default SpacedList;