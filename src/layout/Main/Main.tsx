import Error from '../../pages/Error/Error';
import Practice from '../../pages/Practice/Practice';
import Settings from '../../pages/Settings/Settings';
import TestPage from '../../pages/TestPage/TestPage';  // Make sure this import is necessary and the path is correct
import styles from './Main.module.scss';
import { Routes, Route } from 'react-router-dom';

export default function Main() {
    return (
        <main>
            <div className={styles['wrap-main']}>
                <Routes>
                    <Route path='/' element={<Practice />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/test" element={<TestPage />} /> {/* Added missing route */}
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </main>
    );
}
