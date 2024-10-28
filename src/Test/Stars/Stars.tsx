import Star from '../../SVG/Star/Star';
import styles from './Stars.module.scss';

interface starColorProps {
    starColor:number
}

const Stars = ({starColor}:starColorProps) => {

    const totalStars = 5;

    return (
        <div className={styles.wrap}>
            {Array.from({ length: starColor }).map((_, index) => (
                <Star key={index} color={'#FF7F00'} width={'20px'} height={'20px'} />
            ))}
            {Array.from({ length: totalStars - starColor }).map((_, index) => (
                <Star key={index + starColor} color={'#FFFFFF'} width={'20px'} height={'20px'} />
            ))}
        </div>
    );
};

export default Stars;
