interface KeyDifferencesProps {
  lines: string[];
}

export function KeyDifferences({ lines }: KeyDifferencesProps) {
  if (lines.length === 0) return null;

  return (
    <div className='border border-gray-200 dark:border-gray-800 p-6 mb-8 animate-fade-in'>
      <h3 className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3'>
        Key Differences
      </h3>
      <ul className='space-y-1.5'>
        {lines.map((line, i) => (
          <li
            key={i}
            className='text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2'
          >
            <span className='text-emerald-500 mt-0.5 shrink-0'>▸</span>
            {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong
                  key={j}
                  className='font-semibold text-gray-900 dark:text-white'
                >
                  {part.slice(2, -2)}
                </strong>
              ) : (
                part
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
