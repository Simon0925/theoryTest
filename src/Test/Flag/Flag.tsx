import { useEffect, useState, useCallback, useMemo } from "react";
import FlagSvg from "../../SVG/FlagSvg/FlagSvg";
import styles from "./Flag.module.scss";
import service from "../../service/service";
import { useDispatch, useSelector } from "react-redux";
import { updateFlagged } from '../../store/practice/practice.slice';
import idUser from "../../config/idUser";
import { RootState } from '../../store/store';

export default function Flag() {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(false);
    const [currentFlags, setCurrentFlags] = useState({ quantity: 0 });

    const flagged = useSelector((state: RootState) => state.practice.flagged);
    const allQuestionLength = useSelector((state: RootState) => state.practice.allQuestionLength);

    useEffect(() => {
        setSelected(flagged && currentFlags.quantity > 0);
    }, [flagged, currentFlags.quantity]);

    useEffect(() => {
        setActive(currentFlags.quantity > 0);
    }, [currentFlags]);

    useEffect(() => {
        const fetchData = async () => {
            if (currentFlags.quantity === 0) {
                try {
                    const groupTest = await service.getFlags(idUser);
                    setCurrentFlags({ quantity: groupTest.quantity });
                } catch (error) {
                    console.error("Error fetching data in useEffect:", error);
                }
            }
        };
        fetchData();
    }, [currentFlags.quantity]);

    const marker = useCallback(() => {
        if (currentFlags.quantity <= 0) return null;
        const nextState = !selected;
        dispatch(updateFlagged(nextState));
        setSelected(nextState);
    }, [currentFlags.quantity, selected, allQuestionLength, dispatch]);

    const flagColor = useMemo(() => (active ? "#FE8000" : "#FFCDA8"), [active]);

    return (
        <div onClick={marker} className={styles['flag']}>
            <div className={styles.title}>
                <div className={selected ? styles.active : styles.notActive}>
                    <FlagSvg color={flagColor} width={"50px"} height={"50px"} />
                </div>
                <span style={{ color: flagColor }}>
                    Flagged questions
                </span>
            </div>
            <span className={active ? styles['quantityActive'] : styles['quantityNotActive']}>
                {currentFlags.quantity}
            </span>
        </div>
    );
}
