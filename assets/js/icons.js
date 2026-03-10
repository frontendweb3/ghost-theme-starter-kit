// Initialize Lucide icons - include only the icons you need
import { createIcons, Sun, Moon, Search,UserRound, SendHorizontal } from 'lucide';

export function initIcons() {
  createIcons({
    icons: {
      Sun,
      Moon,
      Search,
      UserRound,
      SendHorizontal
    }
  });
}

// Auto-initialize icons
initIcons();