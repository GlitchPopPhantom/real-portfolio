"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

type TileType = 'heart' | 'diamond' | 'clover' | 'spade';
const TYPES: TileType[] = ['heart', 'diamond', 'clover', 'spade'];
const GRID_SIZE = 6;

interface Tile {
  id: string;
  type: TileType;
}

// Generates a unique ID so the animation engine tracks the exact physical block
const createTile = (): Tile => ({
  id: Math.random().toString(36).substring(2, 10),
  type: TYPES[Math.floor(Math.random() * 4)]
});

// Prevents the game from spawning a board that already has matches on it
const createValidInitialGrid = (): Tile[][] => {
  let valid = false;
  let newGrid: Tile[][] = [];
  
  while (!valid) {
    newGrid = Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, createTile)
    );
    let hasMatch = false;
    for (let r = 0; r < GRID_SIZE - 1; r++) {
      for (let c = 0; c < GRID_SIZE - 1; c++) {
        if (
          newGrid[r][c].type === newGrid[r][c + 1].type &&
          newGrid[r][c].type === newGrid[r + 1][c].type &&
          newGrid[r][c].type === newGrid[r + 1][c + 1].type
        ) {
          hasMatch = true;
        }
      }
    }
    if (!hasMatch) valid = true;
  }
  return newGrid;
};

// The Visual Layer
const Piece = ({ type }: { type: TileType }) => {
  // Corrected color palette mapping
  const styles = {
    heart: "bg-[#dc2626]",   // Red
    diamond: "bg-[#2563eb]", // Blue
    clover: "bg-[#16a34a]",  // Green
    spade: "bg-[#0a0a0a]",   // Black
  };

  const svgs = {
    heart: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>,
    diamond: <path d="M12 2L2 12l10 10 10-10L12 2z"/>,
    clover: <path d="M12 2c-1.66 0-3 1.34-3 3 0 .8.31 1.52.82 2.06C8.89 7.42 8 8.6 8 10c0 1.66 1.34 3 3 3 .17 0 .34-.02.5-.05-.2.52-.5 1.05-.5 1.55H9v2h6v-2h-2c0-.5-.3-1.03-.5-1.55.16.03.33.05.5.05 1.66 0 3-1.34 3-3 0-1.4-.89-2.58-1.82-2.94.51-.54.82-1.26.82-2.06 0-1.66-1.34-3-3-3z"/>,
    spade: <path d="M12 2C8 6 4 10 4 14c0 2.21 1.79 4 4 4 1.1 0 2.1-.45 2.82-1.17-.32.67-.82 1.67-.82 2.17H14c0-.5-.5-1.5-.82-2.17C13.9 17.55 14.9 18 16 18c2.21 0 4-1.79 4-4 0-4-4-8-8-12z"/>,
  };

  return (
    <div className={`w-full h-full flex items-center justify-center rounded ${styles[type]} shadow-inner border border-white/10`}>
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 drop-shadow-md">
        {svgs[type]}
      </svg>
    </div>
  );
};

export default function Play() {
  const [grid, setGrid] = useState<Tile[][]>(createValidInitialGrid);
  const [moves, setMoves] = useState(20);
  const [isProcessing, setIsProcessing] = useState(false);

  // Core Game Engine: Evaluates the grid for 2x2 boxes
  const evaluateBoard = useCallback((currentGrid: Tile[][]) => {
    let hasMatch = false;
    let matchMask = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));

    for (let r = 0; r < GRID_SIZE - 1; r++) {
      for (let c = 0; c < GRID_SIZE - 1; c++) {
        const type = currentGrid[r][c].type;
        if (
          type === currentGrid[r][c + 1].type &&
          type === currentGrid[r + 1][c].type &&
          type === currentGrid[r + 1][c + 1].type
        ) {
          matchMask[r][c] = true;
          matchMask[r][c + 1] = true;
          matchMask[r + 1][c] = true;
          matchMask[r + 1][c + 1] = true;
          hasMatch = true;
        }
      }
    }

    if (hasMatch) {
      setIsProcessing(true);
      setTimeout(() => {
        setGrid(prev => {
          const newGrid = prev.map(row => [...row]);
          let matchCount = 0;
          
          for (let c = 0; c < GRID_SIZE; c++) {
            let writeIdx = GRID_SIZE - 1;
            for (let r = GRID_SIZE - 1; r >= 0; r--) {
              if (!matchMask[r][c]) {
                newGrid[writeIdx--][c] = newGrid[r][c];
              } else {
                matchCount++;
              }
            }
            while (writeIdx >= 0) {
              newGrid[writeIdx--][c] = createTile();
            }
          }
          
          // Reward: Refund the move + give 1 extra per 2x2 box matched
          setMoves(m => m + Math.floor(matchCount / 4) + 1); 
          return newGrid;
        });
        setIsProcessing(false);
      }, 400); 
    }

    return hasMatch;
  }, []);

  // Input Handling: Row Slider
  const shiftRow = (rowIndex: number, direction: 1 | -1) => {
    if (moves <= 0 || isProcessing) return;

    const newGrid = grid.map(row => [...row]);
    if (direction === 1) { 
      const last = newGrid[rowIndex].pop()!;
      newGrid[rowIndex].unshift(last);
    } else { 
      const first = newGrid[rowIndex].shift()!;
      newGrid[rowIndex].push(first);
    }

    setGrid(newGrid);
    const matchFound = evaluateBoard(newGrid);
    
    // Cost: If you slide and nothing matches, you lose a move.
    if (!matchFound) setMoves(m => m - 1);
  };

  // Input Handling: Column Slider
  const shiftCol = (colIndex: number, direction: 1 | -1) => {
    if (moves <= 0 || isProcessing) return;

    const newGrid = grid.map(row => [...row]);
    if (direction === 1) { 
      const last = newGrid[GRID_SIZE - 1][colIndex];
      for (let r = GRID_SIZE - 1; r > 0; r--) {
        newGrid[r][colIndex] = newGrid[r - 1][colIndex];
      }
      newGrid[0][colIndex] = last;
    } else { 
      const first = newGrid[0][colIndex];
      for (let r = 0; r < GRID_SIZE - 1; r++) {
        newGrid[r][colIndex] = newGrid[r + 1][colIndex];
      }
      newGrid[GRID_SIZE - 1][colIndex] = first;
    }

    setGrid(newGrid);
    const matchFound = evaluateBoard(newGrid);
    
    if (!matchFound) setMoves(m => m - 1);
  };

  // Triggers secondary cascade if falling blocks create new matches
  useEffect(() => {
    if (!isProcessing) {
      evaluateBoard(grid);
    }
  }, [grid, isProcessing, evaluateBoard]);

  return (
    <main className="min-h-screen bg-[#050505] text-[#E0E0E0] font-mono p-12 flex flex-col items-center select-none">
      <header className="w-full max-w-2xl flex justify-between items-center mb-16 border-b border-white/10 pb-4">
        <div className="text-orange-500 font-bold tracking-widest">[4Z_SIMULATION]</div>
        <div className="text-xl">SYSTEM_MOVES: <span className="text-orange-500 font-black">{moves}</span></div>
      </header>

      <div className="relative bg-[#0d0d0f] p-8 rounded-xl border border-white/5 shadow-2xl">
        
        {/* Top Controls */}
        <div className="flex gap-2 mb-4 ml-12">
          {grid[0].map((_, cIdx) => (
            <button 
              key={`up-${cIdx}`} 
              disabled={isProcessing}
              onClick={() => shiftCol(cIdx, -1)} 
              className="w-12 text-center text-white/20 hover:text-orange-500 disabled:opacity-10 transition-colors"
            >▲</button>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          
          {/* Left Controls */}
          <div className="flex flex-col gap-2">
            {grid.map((_, rIdx) => (
              <button 
                key={`left-${rIdx}`} 
                disabled={isProcessing}
                onClick={() => shiftRow(rIdx, -1)} 
                className="h-12 w-8 flex items-center justify-center text-white/20 hover:text-orange-500 disabled:opacity-10 transition-colors"
              >◀</button>
            ))}
          </div>

          {/* The Board */}
          <div className="grid grid-cols-6 gap-2 bg-black/40 p-3 rounded-lg border border-white/5 relative">
            {grid.map((row) => 
              row.map((tile) => (
                <motion.div 
                  key={tile.id}
                  layout="position" // This specific prop prevents the wild "flying" bug on wrap-around
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 35,
                    mass: 0.8
                  }}
                  className="w-12 h-12 z-10"
                >
                  <Piece type={tile.type} />
                </motion.div>
              ))
            )}
          </div>

          {/* Right Controls */}
          <div className="flex flex-col gap-2">
            {grid.map((_, rIdx) => (
              <button 
                key={`right-${rIdx}`} 
                disabled={isProcessing}
                onClick={() => shiftRow(rIdx, 1)} 
                className="h-12 w-8 flex items-center justify-center text-white/20 hover:text-orange-500 disabled:opacity-10 transition-colors"
              >▶</button>
            ))}
          </div>

        </div>

        {/* Bottom Controls */}
        <div className="flex gap-2 mt-4 ml-12">
          {grid[0].map((_, cIdx) => (
            <button 
              key={`down-${cIdx}`} 
              disabled={isProcessing}
              onClick={() => shiftCol(cIdx, 1)} 
              className="w-12 text-center text-white/20 hover:text-orange-500 disabled:opacity-10 transition-colors"
            >▼</button>
          ))}
        </div>

      </div>
    </main>
  );
}