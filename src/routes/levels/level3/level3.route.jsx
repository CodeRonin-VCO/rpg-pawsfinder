import { useState } from "react";
import HeaderLayout from "../../../layout/header/header.jsx";
import styles from "./level3.route.module.css";
import BonusComponent from "./components/bonus/bonus.jsx";

export default function Level3Route() {
    const [count, setCount] = useState(0);


    return (
        <div className="page">
            <HeaderLayout />

            <main>
                {count === 0 && <BonusComponent />}
            </main>
        </div>
    )
}