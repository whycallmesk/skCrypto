interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="text-center py-12">
      <p className="text-red-500 animate-bounce-slow">{message}</p>
    </div>
  );
} 