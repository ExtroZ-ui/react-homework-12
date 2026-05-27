export default function ErrorMessage({ message }) {
  return (
    <div className="error-box">
      <strong>Ошибка:</strong> {message}
    </div>
  );
}
