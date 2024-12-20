interface RightMessageProps {
  time: number;
  message: string;
}

function RightMessage({ time, message }: RightMessageProps) {
  return (
    <div className="text-end secondary-chatbox-cus">
      <p className="text-secondary">{new Date(time).toLocaleString()}</p>
      <p>{message}</p>
    </div>
  );
}

export default RightMessage;
