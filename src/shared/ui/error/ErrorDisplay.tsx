interface Props {
  message: string;
}

export default function ErrorDisplay({ message }: Props) {
  return (
    <div className="rounded-lg bg-red-50 p-4 text-center text-red-700 dark:bg-red-950/40 dark:text-red-300">
      Error: {message}
    </div>
  );
}
