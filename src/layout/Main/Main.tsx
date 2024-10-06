import Error from '../../pages/Error/Error';
import HPT from '../../pages/HPT/HPT';
import MockTest from '../../pages/MockTest/MockTest';
import Practice from '../../pages/Practice/Practice';
import Results from '../../pages/Results/Results';
import Settings from '../../pages/Settings/Settings';
import Trainer from '../../pages/Trainer/Trainer';
import styles from './Main.module.scss';
import { Routes, Route } from 'react-router-dom';

export default function Main() {
    return (
        <main>
            <div className={styles['wrap-main']}>
                <Routes>
                    <Route path='/' element={<Practice />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/results" element={<Results />} /> 
                    <Route path="/mock-test" element={<MockTest />} />
                    <Route path="/trainer" element={<Trainer />} />
                    <Route path="/HPT" element={<HPT />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </main>
    );
}
