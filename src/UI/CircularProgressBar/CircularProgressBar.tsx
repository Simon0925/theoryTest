interface CircularProgressBarProps {
  correct: number;
  skipped: number;
  incorrect: number;
}

const CircularProgressBar = ({ correct, skipped, incorrect }: CircularProgressBarProps) => {
  const total = correct + skipped + incorrect;

  if (total === 0) {
    return <div>No data available</div>;
  }

  // Процентное соотношение каждого сегмента
  const correctPercentage = (correct / total) * 100;
  const skippedPercentage = (skipped / total) * 100;
  const incorrectPercentage = (incorrect / total) * 100;

  // Окружность для r = 15.9155 (длина окружности)
  const circleLength = 2 * Math.PI * 15.9155;

  // Пробел 20% (72°)
  const gapLength = circleLength * 0.25; 

  // Видимая часть окружности (80% - оставшаяся часть)
  const visibleCircleLength = circleLength - gapLength;

  // Длина сегментов для каждого ответа
  const correctLength = (correctPercentage / 100) * visibleCircleLength;
  const skippedLength = (skippedPercentage / 100) * visibleCircleLength;
  const incorrectLength = (incorrectPercentage / 100) * visibleCircleLength;

  // Начальное смещение (для того, чтобы пробел был на 6 часов)
  const startOffset = -circleLength * 0.25; // 6 часов — смещение

  // Смещение для каждого сегмента
  const correctOffset = startOffset;
  const skippedOffset = correctOffset - correctLength;
  const incorrectOffset = skippedOffset - skippedLength;

  return (
    <svg width="300" height="200" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
      {/* Сегмент правильных ответов (зелёный) */}
      <circle
        r="15.9155"
        cx="21"
        cy="21"
        fill="transparent"
        stroke="#00C65D"
        strokeWidth="5"
        strokeDasharray={`${correctLength} ${circleLength}`}
        strokeDashoffset={correctOffset}
        transform="rotate(45 21 21)" // Поворот на 135 градусов (начало с 7 часов)
      />

      {/* Сегмент пропущенных ответов (жёлтый) */}
      <circle
        r="15.9155"
        cx="21"
        cy="21"
        fill="transparent"
        stroke="#FF8174"
        strokeWidth="5"
        strokeDasharray={`${skippedLength} ${circleLength}`}
        strokeDashoffset={skippedOffset}
        transform="rotate(45 21 21)" // Поворот на 135 градусов
      />

      {/* Сегмент неправильных ответов (красный) */}
      <circle
        r="15.9155"
        cx="21"
        cy="21"
        fill="transparent"
        stroke="#0078AB"
        strokeWidth="5"
        strokeDasharray={`${incorrectLength} ${circleLength}`}
        strokeDashoffset={incorrectOffset}
        transform="rotate(45 21 21)" // Поворот на 135 градусов
      />

      {/* Процент правильных ответов в центре */}
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontWeight="900" fontSize="10" fill="white">
        {Math.round(correctPercentage)}%
      </text>

      {/* PASS mark */}
      <text x="40" y="22" fontWeight="900" fontSize="3.5" fill="white">PASS</text>
      <text x="40" y="26" fontWeight="900" fontSize="3.5" fill="white">mark</text>
    </svg>
  );
};

export default CircularProgressBar;
