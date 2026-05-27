export default function About() {
  return (
    <section className="about-card">
      <p className="eyebrow">О проекте</p>
      <h1>Интернет-магазин на React</h1>
      <p>
        Это учебное приложение для дисциплины «Разработка прототипов программных решений».
        Проект показывает работу с React Router, API-запросами, Context API, localStorage,
        оптимизацией компонентов и тестированием.
      </p>

      <ul className="feature-list">
        <li>Маршрутизация: главная, каталог, карточка товара, избранное, информация о проекте.</li>
        <li>Работа с сетью: загрузка списка товаров и подробной информации через API.</li>
        <li>Состояние: избранное хранится в Context API и сохраняется в localStorage.</li>
        <li>Оптимизация: React.memo, useMemo, useCallback, React.lazy и Suspense.</li>
        <li>Тестирование: Jest и React Testing Library.</li>
      </ul>
    </section>
  );
}
