// CanvasRenderer.ts - Orchestrates all layers, high-DPI canvas scaling, and animation loop

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
  }

  public getQuality(): string {
    return this.quality;
  }

  private handleResize() {
    const maxDpr = this.quality === 'low' ? 1 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
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
    const elapsed = (now - this.startTime) / 1000; // seconds

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Clear Screen
    this.ctx.fillStyle = '#030611';
    this.ctx.fillRect(0, 0, width, height);

    // Render Layers in Composition Hierarchy
    this.skyLayer.render(this.ctx, width, height, elapsed);
    this.horizonLayer.render(this.ctx, width, height, elapsed);
    this.seaLayer.render(this.ctx, width, height, elapsed);
    this.shipLayer.render(this.ctx, width, height, elapsed);
    this.dockLayer.render(this.ctx, width, height, elapsed);
    this.pirateLayer.render(this.ctx, width, height, elapsed);

    this.animId = requestAnimationFrame(this.render);
  }

  public destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
  }
}
