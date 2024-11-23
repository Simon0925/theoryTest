import styles from './VisibilityToggle.module.scss';
import BurgerMenuSVG from '../../SVG/BurgerMenuSVG/BurgerMenuSVG';
import ArrowPrevSmallSvg from '../../SVG/ArrowPrevSmallSvg/ArrowPrevSmallSvg';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

interface VisibilityToggleProps {
  textColor: string;
  updateBurgerMenu: (state: boolean) => void;
  updateVisible: (state: boolean) => void;
}

const VisibilityToggle = ({
  textColor,
  updateBurgerMenu,
  updateVisible,
}:VisibilityToggleProps) => {
  const { open: isMenuOpen, visible } = useSelector((state: RootState) => state.menu);

  return visible ? (
    <div onClick={() => updateBurgerMenu(!isMenuOpen)} className={styles.burgerMenu}>
      <BurgerMenuSVG color={textColor} />
    </div>
  ) : (
    <div onClick={() => updateVisible(true)} className={styles.arrow}>
      <ArrowPrevSmallSvg width="40px" height="40px" color={textColor} />
    </div>
  );
};

export default VisibilityToggle;
