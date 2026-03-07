# Oh, the test expects a .matrix-bg-text class to exist somewhere for visual effect (maybe on a background div or overlay, not on the text itself)
# Let's restore .matrix-bg-text on the grid background div that we have.
sed -i 's/<div className="absolute inset-0 grid-bg pointer-events-none z-0"><\/div>/<div className="absolute inset-0 grid-bg matrix-bg-text pointer-events-none z-0"><\/div>/g' src/components/layout/OrchestratorLayout.tsx
