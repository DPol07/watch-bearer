// CanvasRenderer.ts - Orchestrates cinematic layered dynamic rendering for The Watch Bearer title screen

import { SkyLayer } from './SkyLayer';
import { HorizonLayer } from './HorizonLayer';
import { SeaLayer } from './SeaLayer';
import { ShipLayer } from './ShipLayer';
import { DockLayer } from './DockLayer';
import { PirateLayer } from './PirateLayer';

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animId: number | null = null;
  private startTime: number = 0;

  private skyLayer: SkyLayer;
  private horizonLayer: HorizonLayer;
  private seaLayer: SeaLayer;
  private shipLayer: ShipLayer;
  private dockLayer: DockLayer;
  private pirateLayer: PirateLayer;

  private quality: 'high' | 'medium' | 'low' = 'high';

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) {
      throw new Error('Failed to get 2D rendering context');
    }
    this.ctx = context;

    // Initialize environment layers
    this.skyLayer = new SkyLayer();
    this.horizonLayer = new HorizonLayer();
    this.seaLayer = new SeaLayer();
    this.shipLayer = new ShipLayer();
    this.dockLayer = new DockLayer();
    this.pirateLayer = new PirateLayer();

    this.handleResize = this.handleResize.bind(this);
    this.render = this.render.bind(this);

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  public setQuality(quality: 'high' | 'medium' | 'low') {
    this.quality = quality;
    this.handleResize();
  }

  public getQuality(): string {
    return this.quality;
  }

  private handleResize() {
    const maxDpr = this.quality === 'low' ? 1 : 2;
    const rawDpr = window.devicePixelRatio || 1;
    const dpr = Math.max(1, Math.min(rawDpr, maxDpr));

    const width = Math.max(window.innerWidth || document.documentElement.clientWidth || 320, 100);
    const height = Math.max(window.innerHeight || document.documentElement.clientHeight || 240, 100);

    this.canvas.width = Math.floor(width * dpr);
    this.canvas.height = Math.floor(height * dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  public start() {
    if (this.animId !== null) return;
    this.startTime = performance.now();
    this.animId = requestAnimationFrame(this.render);
  }

  public stop() {
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  private render(now: number) {
    try {
      const elapsed = (now - this.startTime) / 1000; // time in seconds

      const width = window.innerWidth || document.documentElement.clientWidth || 320;
      const height = window.innerHeight || document.documentElement.clientHeight || 240;

      // Clear Canvas
      this.ctx.fillStyle = '#02050e';
      this.ctx.fillRect(0, 0, width, height);

      // Render Layered Environment Stack (Z-Index Order)
      // 1. Sky, Stars, Moon & Haze
      this.skyLayer.render(this.ctx, width, height, elapsed);

      // 2. Distant Horizon Islands & Mountains
      this.horizonLayer.render(this.ctx, width, height, elapsed);

      // 3. Middle Sea & Moonlight Water Reflection
      this.seaLayer.render(this.ctx, width, height, elapsed);

      // 4. Black Pearl Galleon in Middle Distance
      this.shipLayer.render(this.ctx, width, height, elapsed);

      // 5. Weathered Wooden Dock (Foreground Right)
      this.dockLayer.render(this.ctx, width, height, elapsed);

      // 6. Pirate Subject Looking at Mysterious Golden Watch (Foreground Right)
      this.pirateLayer.render(this.ctx, width, height, elapsed);

      // Subtle atmospheric vignette overlay for cinematic depth
      if (this.quality !== 'low') {
        const vignette = this.ctx.createRadialGradient(
          width * 0.5, height * 0.5, Math.min(width, height) * 0.4,
          width * 0.5, height * 0.5, Math.max(width, height) * 0.8
        );
        vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vignette.addColorStop(1, 'rgba(2, 4, 10, 0.42)');

        this.ctx.fillStyle = vignette;
        this.ctx.fillRect(0, 0, width, height);
      }
    } catch (err) {
      console.error('Canvas render error:', err);
    }

    this.animId = requestAnimationFrame(this.render);
  }

  public destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
  }
}
