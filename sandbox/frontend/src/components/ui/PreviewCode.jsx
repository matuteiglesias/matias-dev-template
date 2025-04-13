import { useEffect } from 'react'

import Prism from 'prismjs'
require('prismjs/components/prism-jsx.min')

export default function PreviewCode({
  showPreview,
  componentCode = '',
  handleSetIsJsx,
  showToggle = false,
  isJsx = false,
}) {
  useEffect(() => Prism.highlightAll(), [componentCode])

  return (
    <div className={`relative ${showPreview ? 'hidden' : 'block'}`}>
      {showToggle && handleSetIsJsx && (
        <div className="absolute right-4 top-4 flex flex-col">
          <div className="flex justify-center">
            <div className="rounded-lg border border-slate-200/20">
              <div className="flex text-xs font-bold leading-5">
                <button
                  onClick={() => handleSetIsJsx(!isJsx)}
                  disabled={!isJsx}
                  className={
                    `flex w-auto gap-2 rounded-lg px-4 py-2 focus:outline-none` +
                    ` ` +
                    (!isJsx ? `bg-blue-600 text-slate-50` : `text-slate-300`)
                  }
                >
                  HTML
                </button>
                <button
                  onClick={() => handleSetIsJsx(!isJsx)}
                  disabled={isJsx}
                  className={
                    `flex gap-2 rounded-lg px-4 py-2 focus:outline-none` +
                    ` ` +
                    (isJsx ? `bg-blue-600 text-slate-50` : `text-slate-300`)
                  }
                >
                  JSX
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <pre className="h-[400px] overflow-auto rounded-lg p-4 text-base ring-1 ring-slate-200/10 lg:h-[600px]">
        <code className={`${isJsx ? 'language-jsx' : 'language-html'}`}>
          {componentCode}
        </code>
      </pre>
    </div>
  )
}
