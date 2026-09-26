// SkyLayer.ts - Handles rendering night sky, stars, moon, and atmospheric clouds

export interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
}

export class SkyLayer {
  private stars: Star[] = [];
  private numStars = 220;

  constructor() {
    this.initStars();
  }

  private initStars() {
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random() * 0.52, // Sky occupies upper half
        radius: Math.random() < 0.85 ? Math.random() * 1.2 + 0.4 : Math.random() * 1.5 + 1.2,
        baseAlpha: Math.random() * 0.6 + 0.35,
        twinkleSpeed: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    const horizonY = height * 0.52;

    // 1. Deep Celestial Gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGradient.addColorStop(0.0, '#030611');
    skyGradient.addColorStop(0.4, '#080f24');
    skyGradient.addColorStop(0.75, '#0f1b38');
    skyGradient.addColorStop(1.0, '#192847');

    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, horizonY + 20);

    // 2. Render Stars
    ctx.save();
    for (const star of this.stars) {
      const sx = star.x * width;
      const sy = star.y * height;
      const alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.phase) * 0.3;
      const clampedAlpha = Math.max(0.1, Math.min(1.0, alpha));

      ctx.fillStyle = `rgba(225, 238, 255, ${clampedAlpha})`;
      ctx.beginPath();
      ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle cross flare for larger stars
      if (star.radius > 2) {
        ctx.strokeStyle = `rgba(225, 238, 255, ${clampedAlpha * 0.4})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(sx - 4, sy);
        ctx.lineTo(sx + 4, sy);
        ctx.moveTo(sx, sy - 4);
        ctx.lineTo(sx, sy + 4);
        ctx.stroke();
      }
    }
    ctx.restore();

    // 3. Moon Positioning & Atmospheric Glow
    const moonX = width * 0.66;
    const moonY = height * 0.18;
    const moonRadius = Math.min(width, height) * 0.042;

    // Ambient Outer Moon Glow
    ctx.save();
    const outerGlow = ctx.createRadialGradient(
      moonX, moonY, moonRadius * 0.5,
      moonX, moonY, moonRadius * 8
    );
    outerGlow.addColorStop(0, 'rgba(212, 229, 255, 0.35)');
    outerGlow.addColorStop(0.25, 'rgba(160, 195, 245, 0.15)');
    outerGlow.addColorStop(0.6, 'rgba(100, 145, 210, 0.05)');
    outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = outerGlow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius * 8, 0, Math.PI * 2);
    ctx.fill();

    // Inner Radiant Halo
    const innerGlow = ctx.createRadialGradient(
      moonX, moonY, moonRadius * 0.8,
      moonX, moonY, moonRadius * 2.2
    );
    innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    innerGlow.addColorStop(0.5, 'rgba(212, 229, 255, 0.4)');
    innerGlow.addColorStop(1, 'rgba(212, 229, 255, 0)');

    ctx.fillStyle = innerGlow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius * 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Moon Disc
    const moonDiscGrad = ctx.createRadialGradient(
      moonX - moonRadius * 0.3, moonY - moonRadius * 0.3, moonRadius * 0.1,
      moonX, moonY, moonRadius
    );
    moonDiscGrad.addColorStop(0, '#ffffff');
    moonDiscGrad.addColorStop(0.7, '#e3efff');
    moonDiscGrad.addColorStop(1.0, '#b3cef0');

    ctx.fillStyle = moonDiscGrad;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fill();

    // Soft Organic Lunar Surface Texture (Mare)
    ctx.fillStyle = 'rgba(110, 140, 180, 0.12)';
    ctx.beginPath();
    ctx.arc(moonX - moonRadius * 0.2, moonY - moonRadius * 0.1, moonRadius * 0.25, 0, Math.PI * 2);
    ctx.arc(moonX + moonRadius * 0.18, moonY + moonRadius * 0.22, moonRadius * 0.2, 0, Math.PI * 2);
    ctx.arc(moonX + moonRadius * 0.22, moonY - moonRadius * 0.18, moonRadius * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Drifting Atmospheric Clouds
    this.renderClouds(ctx, width, height, time, moonX, moonY, horizonY);
  }

  private renderClouds(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    moonX: number,
    moonY: number,
    horizonY: number
  ) {
    ctx.save();

    // Cloud Layer 1 - High wispy haze
    const cloudShift1 = (time * 12) % width;
    ctx.fillStyle = 'rgba(160, 190, 230, 0.04)';

    for (let i = -1; i <= 1; i++) {
      const cx = (width * 0.3 + cloudShift1) + i * width;
      const cy = height * 0.15;

      ctx.beginPath();
      ctx.ellipse(cx, cy, width * 0.3, height * 0.06, 0.05, 0, Math.PI * 2);
      ctx.ellipse(cx + width * 0.15, cy - height * 0.02, width * 0.2, height * 0.05, -0.05, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cloud Layer 2 - Moon backlit clouds
    const cloudShift2 = (time * 8) % (width * 1.5);
    const mcx = ((moonX - width * 0.2) + cloudShift2) % (width * 1.4) - width * 0.2;
    const mcy = moonY + height * 0.02;

    const cloudGrad = ctx.createRadialGradient(
      moonX, moonY, 10,
      mcx, mcy, width * 0.3
    );
    cloudGrad.addColorStop(0, 'rgba(212, 229, 255, 0.12)');
    cloudGrad.addColorStop(0.5, 'rgba(120, 155, 205, 0.06)');
    cloudGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = cloudGrad;
    ctx.beginPath();
    ctx.ellipse(mcx, mcy, width * 0.25, height * 0.05, -0.02, 0, Math.PI * 2);
    ctx.ellipse(mcx - width * 0.1, mcy + height * 0.01, width * 0.18, height * 0.04, 0.02, 0, Math.PI * 2);
    ctx.fill();

    // Horizon fog/cloud band
    const fogGrad = ctx.createLinearGradient(0, horizonY - height * 0.08, 0, horizonY);
    fogGrad.addColorStop(0, 'rgba(15, 27, 50, 0)');
    fogGrad.addColorStop(1, 'rgba(20, 35, 62, 0.45)');

    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, horizonY - height * 0.08, width, height * 0.08);

    ctx.restore();
  }
}
