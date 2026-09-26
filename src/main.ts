// main.ts - Application entry point, canvas setup, and UI menu state controller

import './style.css';
import { CanvasRenderer } from './renderer/CanvasRenderer';

const SAVE_KEY = 'watch_bearer_save_v1';

class App {
  private renderer: CanvasRenderer;
  private btnNewVoyage!: HTMLButtonElement;
  private btnContinue!: HTMLButtonElement;
  private btnSettings!: HTMLButtonElement;
  private btnQuit!: HTMLButtonElement;

  private modalOverlay!: HTMLElement;
  private settingsModal!: HTMLElement;
  private quitModal!: HTMLElement;
  private introScreen!: HTMLElement;

  private selectGraphics!: HTMLSelectElement;
  private btnResetSave!: HTMLButtonElement;
  private btnCloseSettings!: HTMLButtonElement;
  private btnConfirmQuit!: HTMLButtonElement;
  private btnCancelQuit!: HTMLButtonElement;
  private btnIntroBack!: HTMLButtonElement;

  constructor() {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!canvas) {
      throw new Error('Canvas element #game-canvas not found');
    }

    this.renderer = new CanvasRenderer(canvas);
    this.renderer.start();

    this.initUIElements();
    this.checkSaveState();
    this.attachEventListeners();
  }

  private initUIElements() {
    this.btnNewVoyage = document.getElementById('btn-new-voyage') as HTMLButtonElement;
    this.btnContinue = document.getElementById('btn-continue') as HTMLButtonElement;
    this.btnSettings = document.getElementById('btn-settings') as HTMLButtonElement;
    this.btnQuit = document.getElementById('btn-quit') as HTMLButtonElement;

    this.modalOverlay = document.getElementById('modal-overlay') as HTMLElement;
    this.settingsModal = document.getElementById('settings-modal') as HTMLElement;
    this.quitModal = document.getElementById('quit-modal') as HTMLElement;
    this.introScreen = document.getElementById('intro-screen') as HTMLElement;

    this.selectGraphics = document.getElementById('setting-graphics') as HTMLSelectElement;
    this.btnResetSave = document.getElementById('btn-reset-save') as HTMLButtonElement;
    this.btnCloseSettings = document.getElementById('btn-close-settings') as HTMLButtonElement;
    this.btnConfirmQuit = document.getElementById('btn-confirm-quit') as HTMLButtonElement;
    this.btnCancelQuit = document.getElementById('btn-cancel-quit') as HTMLButtonElement;
    this.btnIntroBack = document.getElementById('btn-intro-back') as HTMLButtonElement;
  }

  private checkSaveState() {
    const saveData = localStorage.getItem(SAVE_KEY);
    if (saveData) {
      this.btnContinue.disabled = false;
      this.btnContinue.title = 'Resume your journey';
    } else {
      this.btnContinue.disabled = true;
      this.btnContinue.title = 'No saved voyage found';
    }
  }

  private attachEventListeners() {
    // NEW VOYAGE
    this.btnNewVoyage.addEventListener('click', () => {
      // Save initial state
      const newSave = {
        chapter: 1,
        timestamp: Date.now(),
        location: 'Old Dead Mans Pier',
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(newSave));
      this.checkSaveState();
      this.showIntroScreen();
    });

    // CONTINUE
    this.btnContinue.addEventListener('click', () => {
      if (!this.btnContinue.disabled) {
        this.showIntroScreen();
      }
    });

    // SETTINGS
    this.btnSettings.addEventListener('click', () => {
      this.openModal(this.settingsModal);
    });

    this.selectGraphics.addEventListener('change', (e) => {
      const val = (e.target as HTMLSelectElement).value as 'high' | 'medium' | 'low';
      this.renderer.setQuality(val);
    });

    this.btnResetSave.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete your voyage saved data?')) {
        localStorage.removeItem(SAVE_KEY);
        this.checkSaveState();
        alert('Saved data reset successfully.');
      }
    });

    this.btnCloseSettings.addEventListener('click', () => {
      this.closeModal();
    });

    // QUIT
    this.btnQuit.addEventListener('click', () => {
      this.openModal(this.quitModal);
    });

    this.btnConfirmQuit.addEventListener('click', () => {
      alert('Thank you for playing The Watch Bearer. May the tides guide you back.');
      this.closeModal();
    });

    this.btnCancelQuit.addEventListener('click', () => {
      this.closeModal();
    });

    // INTRO BACK TO TITLE
    this.btnIntroBack.addEventListener('click', () => {
      this.introScreen.classList.add('hidden');
    });

    // Close modal on escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        this.introScreen.classList.add('hidden');
      }
    });
  }

  private openModal(modalCard: HTMLElement) {
    this.modalOverlay.classList.remove('hidden');
    this.settingsModal.classList.add('hidden');
    this.quitModal.classList.add('hidden');
    modalCard.classList.remove('hidden');
  }

  private closeModal() {
    this.modalOverlay.classList.add('hidden');
    this.settingsModal.classList.add('hidden');
    this.quitModal.classList.add('hidden');
  }

  private showIntroScreen() {
    this.introScreen.classList.remove('hidden');
  }
}

// Instantiate application when script loads
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}
