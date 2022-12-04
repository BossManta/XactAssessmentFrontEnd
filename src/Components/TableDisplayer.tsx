import {FunctionComponent, useState} from 'react';
import { CustomRowElementBuilder } from './Shared/TableDisplayerTypes';

export type ColumnInfo = {headerName:string, jsonName: string, customFunction?: (input: any)=>any}[]


interface TableDisplayerProps {
    columnInfo: ColumnInfo
    jsonData: [],
    customRowElementBuilder?: CustomRowElementBuilder[]
    disableSort?: boolean
}
 
const TableDisplayer: FunctionComponent<TableDisplayerProps> = ({columnInfo, jsonData, customRowElementBuilder=[], disableSort=false}) => {
    
    const [sortingHeader, setSortingHeader] = useState<string>(columnInfo[0].headerName);
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
            <thead className='border-b'>
                <tr className='border-b border-gray-300'>
                    {columnInfo.map((column, i) => 
                        <th className='select-none' onClick={() => !disableSort && handleHeaderClick(column.jsonName)} key={column.headerName}>
                            {`${column.headerName} ${!disableSort && sortingHeader===column.jsonName?isDescendingSort?"🙂":"🙃":""}`}
                        </th>
                    )}
                </tr>
            </thead>

            <tbody>
                {jsonData.map((entry,i) => 
                    <tr key={i}  className='border-b border-gray-300 h-12'>
                        {columnInfo.map(column =>
                            <td key={column.jsonName}>
                                <h1 className='text-center'>
                                    {column.customFunction?column.customFunction(entry[column.jsonName]):entry[column.jsonName]}
                                </h1>
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