import {FunctionComponent, useState} from 'react';
import { CustomRowElementBuilder } from './Shared/TableDisplayerTypes';

interface TableDisplayerProps {
    headerNames: string[],
    dataNames: string[],
    jsonData: [],
    customRowElementBuilder?: CustomRowElementBuilder[]
}
 
const TableDisplayer: FunctionComponent<TableDisplayerProps> = ({headerNames, dataNames, jsonData, customRowElementBuilder=[]}) => {
    
    const [sortingHeader, setSortingHeader] = useState<string>(dataNames[0]);
    const [isDescendingSort, setIsDescendingSort] = useState<boolean>(true);

    const handleHeaderClick = (headerJsonName: string) => {
        if (sortingHeader === headerJsonName) {
            ResortRecords(headerJsonName, !isDescendingSort);
            setIsDescendingSort(!isDescendingSort);
        }
        else {
            setSortingHeader(headerJsonName);
            setIsDescendingSort(true);
            ResortRecords(headerJsonName, true);
        }
    }

    const ResortRecords = (header: string, isDesc: boolean) => {

        const sorter = (a: any, b: any) => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                return a.toLowerCase()<b.toLowerCase()?-1:1;
            }
            return a-b;
        }

        jsonData = jsonData.sort((a,b) => isDesc?sorter(a[header],b[header]):sorter(b[header],a[header]));
    }
    
    
    return ( 
        <table className='w-full'>
            <thead className=' border-b'>
                <tr className='border-b border-gray-300'>
                    {headerNames.map((header, i) => 
                        <th className='select-none' onClick={() => handleHeaderClick(dataNames[i])} key={header}>{`${header} ${sortingHeader===dataNames[i]?isDescendingSort?"🙂":"🙃":""}`}</th>
                    )}
                </tr>
            </thead>

            <tbody>
                {jsonData.map((entry,i) => 
                    <tr key={i}  className='border-b border-gray-300 h-12'>
                        {dataNames.map(field =>
                            <td key={field}>
                                <h1 className='text-center'>{entry[field]}</h1>
                            </td>
                        )}
                        <td>
                            {
                                customRowElementBuilder.map((elementBuilder :CustomRowElementBuilder)=> {
                                    return elementBuilder(entry);
                                })
                            }
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
     );
}
 
export default TableDisplayer;