import Error from '../../pages/Error/Error';
import MockTest from '../../pages/MockTest/MockTest';
import Practice from '../../pages/Practice/Practice';
import Results from '../../pages/Results/Results';
import Settings from '../../pages/Settings/Settings';
import TestPage from '../../pages/TestPage/TestPage';  
import styles from './Main.module.scss';
import { Routes, Route } from 'react-router-dom';

export default function Main() {
    return (
        <main>
            <div className={styles['wrap-main']}>
                <Routes>
                    <Route path='/' element={<Practice />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/results" element={<Results />} /> 
                    <Route path="/mock-test" element={<MockTest />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </main>
    );
}
