import { memo } from 'react';

function LoaderComponent() {
  return (
    <div className="loader" role="status" aria-live="polite">
      Загрузка данных...
    </div>
  );
}

export const Loader = memo(LoaderComponent);
