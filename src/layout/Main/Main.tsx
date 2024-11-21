import Error from '../../pages/Error/Error';
import Practice from '../../pages/Practice/Practice';
import Settings from '../../pages/Settings/Settings';
import styles from './Main.module.scss';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import MockTest from '../../pages/MockTest/MockTest';
import Trainer from '../../pages/Trainer/Trainer';
import HPT from '../../pages/HPT/HPT';
import NewPassword from '../../pages/NewPassword/NewPassword';

export default function Main() {
    const {mainColor} = useSelector((state: RootState) => state.color.themeData);
    return (
        <main>
            <div  style={{backgroundColor:mainColor}} className={styles['wrap-main']}>
                <Routes>
                    <Route path='/' element={<Practice />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/mock-test" element={<MockTest />} />
                    <Route path="/trainer" element={<Trainer />} />
                    <Route path="/HPT" element={<HPT />} />
                    <Route path="/new-password" element={<NewPassword />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </main>
    );
}
