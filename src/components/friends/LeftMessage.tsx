interface LeftMessageProps {
  time: number;
  message: string;
}

function LeftMessage({ time, message }: LeftMessageProps) {
  return (
    <div className="text-start">
      <p className="text-secondary">{new Date(time).toLocaleString()}</p>
      <p>{message}</p>
    </div>
  );
}

export default LeftMessage;
