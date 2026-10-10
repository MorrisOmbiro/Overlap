const BEST_SCORE_KEY = "overlap-best";

function readBestScore() {
  try {
    return Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBestScore(best: number) {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(best));
  } catch {
    /* Best scores are optional when browser storage is disabled. */
  }
}

export { readBestScore, saveBestScore };
