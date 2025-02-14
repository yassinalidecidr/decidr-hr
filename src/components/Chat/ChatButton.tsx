import { MessageCircleIcon } from '@/components/Icons';

interface ChatButtonProps {
  onClick: () => void;
}

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
    >
      <MessageCircleIcon className="w-6 h-6" />
    </button>
  );
} 