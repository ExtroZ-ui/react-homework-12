import { memo } from 'react';

function ErrorMessageComponent({ message }) {
  return (
    <div className="error" role="alert">
      {message}
    </div>
  );
}

export const ErrorMessage = memo(ErrorMessageComponent);
