import {createRoot} from 'react-dom/client';

import "./index.scss";

const MyApplication = () => {
    return (
        <div className = "my-flix">
            <div>Good Morning</div>
        </div>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyApplication/>);