import { useEffect, useState } from "react";
import FlagSvg from "../../SVG/FlagSvg/FlagSvg";
import styles from "./Flag.module.scss";
import service from "../../service/service";
import { useDispatch } from "react-redux";
import { updateFlagged } from '../../store/practice.slice'; 
import idUser from "../../config/idUser";

export default function Flag() {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(false);
    const [currentFlags, setCurrentFlags] = useState({ quantity: 0 });

    useEffect(() => {
        if (!selected) dispatch(updateFlagged(false));
    }, [selected]);

    useEffect(() => {
        setActive(currentFlags.quantity > 0);
    }, [currentFlags]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const groupTest = await service.getFlags(idUser);
                setCurrentFlags({ quantity: groupTest.quantity });
            } catch (error) {
                console.error("Error fetching data in useEffect:", error);
            }
        };
        fetchData();
    }, []);

    const marker = () => {
        setSelected(!selected);
        dispatch(updateFlagged(!selected));
    };

    return (
        <div onClick={marker} className={styles['flag']}>
            <div className={styles.title}>
                <div className={selected ? styles.active : styles.notActive}>
                    <FlagSvg color={active ? "#FE8000" : "#FFCDA8"} width={"50px"} height={"50px"} />
                </div>
                <span style={{ color: active ? "#FE8000" : "#FFCDA8" }}>
                    Flagged questions
                </span>
            </div>
            <span className={active ? styles['quantityActive'] : styles['quantityNotActive']}>
                {currentFlags.quantity}
            </span>
        </div>
    );
}
