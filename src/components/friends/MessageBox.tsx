interface MessageBoxProps {
  username: string;
}

function MessageBox({ username }: MessageBoxProps) {
  return (
    <div>
      <p>@{username}</p>
    </div>
  );
}

export default MessageBox;
