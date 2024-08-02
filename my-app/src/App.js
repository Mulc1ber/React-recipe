import styles from './App.module.css';
import { useState } from 'react';
import data from './data.json';

export const App = () => {
    // Можно задать 2 состояния — steps и activeIndex
    const [steps, setSteps] = useState(data);
    const [activeIndex, setActiveIndex] = useState(1);

    // И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
    const onClickForward = () => {
        setActiveIndex((prevState) => (prevState += 1));
    };

    const onClickBack = () => {
        setActiveIndex((prevState) => (prevState -= 1));
    };

    const onClickStartOver = () => {
        setActiveIndex(1);
    };

    const handleClickOnStep = (id) => {
        setActiveIndex(id);
    };

    // И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
    let isOnFirstStep = true;
    let isOnLastStep = false;

    const handleStatusStep = () => {
        switch (activeIndex) {
            case 1:
                isOnFirstStep = true;
                isOnLastStep = false;
                break;
            case 7:
                isOnFirstStep = false;
                isOnLastStep = true;
                break;
            default:
                isOnFirstStep = false;
                isOnLastStep = false;
                return;
        }
    };
    handleStatusStep();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Инструкция по готовке пельменей</h1>
                <div className={styles.steps}>
                    <div className={styles['steps-content']}>
                        {steps.map(({ id, content }) =>
                            activeIndex === Number(id) ? content : '',
                        )}
                    </div>
                    <ul className={styles['steps-list']}>
                        {steps.map(({ id, title }) => (
                            <li
                                key={id}
                                className={`${styles['steps-item']} ${activeIndex > Number(id) ? styles.done : ''} ${activeIndex === Number(id) ? styles.active : ''}`}
                            >
                                <button
                                    className={styles['steps-item-button']}
                                    onClick={() => handleClickOnStep(Number(id))}
                                >
                                    {Number(id)}
                                </button>
                                {title}
                            </li>
                        ))}
                    </ul>
                    <div className={styles['buttons-container']}>
                        <button
                            className={styles.button}
                            onClick={onClickBack}
                            disabled={isOnFirstStep}
                        >
                            Назад
                        </button>
                        <button
                            className={styles.button}
                            onClick={
                                activeIndex === steps.length ? onClickStartOver : onClickForward
                            }
                        >
                            {isOnLastStep ? 'Начать сначала' : 'Далее'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
