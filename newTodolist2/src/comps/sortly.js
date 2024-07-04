import React, { useEffect, useState } from 'react';
import _ from "lodash";
import { FaSortAmountDown, FaSortAmountUpAlt } from 'react-icons/fa';

function Sortly({ tasks_ar, setTasksAr, setTasksArSort }) {
    const [sortUpOrDown, setSortUpOrDown] = useState();
    const [orderByT, setOrderByT] = useState();

    useEffect(() => {
        if (localStorage.getItem('sort')) {
            const storedTasks = JSON.parse(localStorage.getItem('sort'));

            if (storedTasks.sortUpOrDown && storedTasks.orderByT) {
                setSortUpOrDown(storedTasks.sortUpOrDown);
                setOrderByT(storedTasks.orderByT);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sort', JSON.stringify({ sortUpOrDown, orderByT }));

    }, [orderByT, sortUpOrDown]);

    const completionCheck = () => {
        const ar_completed = tasks_ar.filter(item => item.Completed);
        const ar_notComplete = tasks_ar.filter(item => !item.Completed);

        return [ar_completed, ar_notComplete];
    }

    const sortTaskBy = () => {
        const [completedTasks, notCompletedTasks] = completionCheck();

        let sort_ar = notCompletedTasks;
        sort_ar = _.orderBy(sort_ar, [orderByT], [sortUpOrDown]);
        sort_ar = [...sort_ar, ...completedTasks]

        setTasksArSort(sort_ar);
        // localStorage.setItem('tasks', JSON.stringify(sort_ar));
    }

    useEffect(() => {
        sortTaskBy();
    }, [orderByT, sortUpOrDown, tasks_ar]);

    return (
        <div className='border btn-group p-0 m-1'>
            <select onChange={e => setOrderByT(e.target.value)} className="border-0 bg-dark text-white-50 rounded-start">
                <option>sort by...</option>
                <option value="created">created</option>
                <option value="time">target time</option>
                <option value="edit">editing</option>
                <option value="name">task name</option>
            </select>
            <div>
                {
                    sortUpOrDown === 'asc' ?
                        <button
                            className='border-0 bg-dark text-white-50 rounded-end'
                            onClick={() => setSortUpOrDown('desc')}>
                            < FaSortAmountUpAlt />
                        </button> :
                        <button
                            className='border-0 bg-dark text-white-50 rounded-end'
                            onClick={() => setSortUpOrDown('asc')}>
                            <FaSortAmountDown />
                        </button>
                }
            </div>
        </div>
    )
}

export default Sortly;