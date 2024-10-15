import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
    newValue: (e: number) => void;
    currentProgressPercentage: number;
    isDraggingProgressBar: (e: boolean) => void;
    newTime: (e: number) => void;
}

const ProgressBar = ({ currentProgressPercentage, newValue, isDraggingProgressBar, newTime }: ProgressBarProps) => {
    const [value, setValue] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const progressRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        isDraggingProgressBar(isDragging);
    }, [isDragging, isDraggingProgressBar]);

    useEffect(() => {
        if (!isDragging && currentProgressPercentage !== value) {
            setValue(currentProgressPercentage);
        }
    }, [currentProgressPercentage, value, isDragging]);

    const updateValueFromPosition = (clientX: number) => {
        if (progressRef.current) {
            const progress = progressRef.current.getBoundingClientRect();
            let newLeft = clientX - progress.left;
            if (newLeft < 0) newLeft = 0;
            if (newLeft > progress.width) newLeft = progress.width;
            const newValue = Math.round((newLeft / progress.width) * 100);
            setValue(newValue);
            return newValue;
        }
        return value;
    };

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDragging) {
                const newV = updateValueFromPosition(e.clientX);
                newValue(newV);
            }
        },
        [isDragging, newValue]
    );

    const handleMouseUp = useCallback(() => {
        newValue(value); 
        setIsDragging(false);
    }, [value, newValue]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        } else {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        const newV = updateValueFromPosition(e.clientX);
        newTime(newV);
    };

    return (
        <div className={styles.progressContainer}>
            <div
                ref={progressRef}
                className={styles.progressTrack}
                onMouseDown={handleMouseDown}
            >
                <div className={styles.progressFilled} style={{ width: `${value}%` }}></div>
                <div
                    className={styles.progressThumb}
                    style={{
                        left: `${value}%`,
                        transform: "translate(-50%, -50%)"
                    }}
                    onMouseDown={() => setIsDragging(true)}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
