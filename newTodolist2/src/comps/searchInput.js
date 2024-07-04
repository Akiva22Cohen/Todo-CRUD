import React, { useEffect, useRef } from 'react';
import { FcSearch } from 'react-icons/fc';

function SearchInput({ setTasksArSearch, tasks_arSort, tasks_arSearch }) {
    const refSearch = useRef();

    useEffect(() => {
        setTasksArSearch(
            tasks_arSort.filter(
                item =>
                    (item.name.toLocaleUpperCase()).includes((refSearch.current.value).toLocaleUpperCase())
            )
        )
    }, [tasks_arSort])

    return (
        <div className='d-flex align-items-center bg-white rounded shadow border m-1 p-1'>
            <input
                list='datalist'
                style={{ outline: 'none' }}
                className='bg-transparent border-0'
                type="search"
                placeholder='task search...'
                ref={refSearch}
                onChange={
                    e =>
                        setTasksArSearch(
                            tasks_arSort.filter(
                                item =>
                                    (item.name.toLocaleUpperCase()).includes((e.target.value).toLocaleUpperCase())
                            )
                        )
                }
            />
            <FcSearch />
            <datalist id='datalist'>
                {
                    tasks_arSearch.map((item, i) => <option key={i}>{item.name}</option>)
                }
            </datalist>
        </div>
    )
}

export default SearchInput;