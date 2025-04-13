interface ResponseBlockProps {
    content: string
  }
  
  export default function ResponseBlock({ content }: ResponseBlockProps) {
    return (
      <div className="text-left text-sm text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md shadow-sm whitespace-pre-wrap">
        {content}
      </div>
    )
  }
  