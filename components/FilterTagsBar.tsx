import { X } from "lucide-react";

interface Props {
  tags: string[];
  onRemove: (tag: string) => void;
  onClear: () => void;
}

export default function FilterTagsBar({ tags, onRemove, onClear }: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onRemove(tag)}
          className="flex items-center gap-1.5 h-[28px] px-3 bg-white border border-[#DEE2E7] rounded-md text-[12px] text-[#505050] hover:border-[#8B96A5] transition-colors cursor-pointer"
        >
          {tag}
          <X size={11} strokeWidth={2.5} className="text-[#8B96A5]" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-[12px] font-medium text-primary hover:underline cursor-pointer"
      >
        Clear all filter
      </button>
    </div>
  );
}
