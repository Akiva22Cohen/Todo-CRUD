import { useEffect, useState } from "react";

function Watch() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="m-1 d-flex">
            <p className="m-1">{currentDateTime.toLocaleDateString()}</p>
            <p className="m-1">{currentDateTime.toLocaleTimeString()}</p>
        </div>
    )
}

export default Watch