# Oh wait, I deleted the <main> tag when I used `d`. Let's restore the <main> tag.
sed -i '/<aside className="w-60 border border-accent\/30 shadow-\[0_0_10px_rgba(0,242,255,0.1)\] bg-black\/60 backdrop-blur-md flex flex-col shrink-0">/i \      <main className="flex-1 flex flex-col min-w-0">' src/pages/ExecutionLogs.tsx
