import styles from './App.module.css';
import { useState } from 'react';
import data from './data.json';

export const App = () => {
    // Можно задать 2 состояния — steps и activeIndex
    const [steps] = useState(data);
    const [activeIndex, setActiveIndex] = useState(0);

    // И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
    const onClickForward = () => {
        setActiveIndex((prevState) => (prevState += 1));
    };

    const onClickBack = () => {
        if (activeIndex > 0) {
            setActiveIndex((prevState) => (prevState -= 1));
        }
    };

    const onClickStartOver = () => {
        setActiveIndex(0);
    };

    // И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
    const isOnLastStep = activeIndex === steps.length - 1;
    const isOnFirstStep = activeIndex === 0;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Инструкция по готовке пельменей</h1>
                <div className={styles.steps}>
                    <div className={styles['steps-content']}>
                        {steps[activeIndex].content}
                        {/* {steps.map(({ id, content }) =>
                            activeIndex === Number(id) ? content : '',
                        )} */}
                    </div>
                    <ul className={styles['steps-list']}>
                        {steps.map(({ id, title }, index) => (
                            <li
                                key={id}
                                className={
                                    styles['steps-item'] +
                                    (activeIndex === index ? ` ${styles.active}` : '') +
                                    (activeIndex > index ? ` ${styles.done}` : '')
                                }
                            >
                                <button
                                    className={styles['steps-item-button']}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    {index + 1}
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
                            onClick={() => (isOnLastStep ? onClickStartOver() : onClickForward())}
                        >
                            {isOnLastStep ? 'Начать сначала' : 'Далее'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
