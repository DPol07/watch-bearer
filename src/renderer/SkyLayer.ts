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
        radius: Math.random() < 0.85 ? Math.random() * 1.1 + 0.4 : Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.65 + 0.35,
        twinkleSpeed: Math.random() * 2.5 + 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    const horizonY = height * 0.52;

    // 1. Deep Celestial Gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGradient.addColorStop(0.0, '#02050e');
    skyGradient.addColorStop(0.35, '#070e22');
    skyGradient.addColorStop(0.7, '#0d1a36');
    skyGradient.addColorStop(1.0, '#162746');

    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, horizonY + 20);

    // 2. Render Stars with Twinkle
    ctx.save();
    for (const star of this.stars) {
      const sx = star.x * width;
      const sy = star.y * height;
      const alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.phase) * 0.3;
      const clampedAlpha = Math.max(0.12, Math.min(1.0, alpha));

      ctx.fillStyle = `rgba(228, 240, 255, ${clampedAlpha})`;
      ctx.beginPath();
      ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 3. Moon Positioning & Atmospheric Soft Glow
    const moonX = width * 0.66;
    const moonY = height * 0.17;
    const moonRadius = Math.min(width, height) * 0.04;

    ctx.save();
    // Broad Soft Sky Corona
    const outerGlow = ctx.createRadialGradient(
      moonX, moonY, moonRadius * 0.2,
      moonX, moonY, moonRadius * 7.5
    );
    outerGlow.addColorStop(0, 'rgba(215, 232, 255, 0.32)');
    outerGlow.addColorStop(0.2, 'rgba(165, 200, 250, 0.16)');
    outerGlow.addColorStop(0.5, 'rgba(95, 140, 210, 0.06)');
    outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = outerGlow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius * 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Inner Radiant Halo
    const innerGlow = ctx.createRadialGradient(
      moonX, moonY, moonRadius * 0.7,
      moonX, moonY, moonRadius * 2.0
    );
    innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    innerGlow.addColorStop(0.45, 'rgba(215, 232, 255, 0.4)');
    innerGlow.addColorStop(1, 'rgba(215, 232, 255, 0)');

    ctx.fillStyle = innerGlow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius * 2.0, 0, Math.PI * 2);
    ctx.fill();

    // Moon Disc (Spherical Shading)
    const moonDiscGrad = ctx.createRadialGradient(
      moonX - moonRadius * 0.35, moonY - moonRadius * 0.35, moonRadius * 0.1,
      moonX, moonY, moonRadius
    );
    moonDiscGrad.addColorStop(0, '#ffffff');
    moonDiscGrad.addColorStop(0.65, '#e1efff');
    moonDiscGrad.addColorStop(1.0, '#abc9ed');

    ctx.fillStyle = moonDiscGrad;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fill();

    // Organic Soft Lunar Surface Maria
    ctx.fillStyle = 'rgba(120, 150, 190, 0.11)';
    ctx.beginPath();
    ctx.ellipse(moonX - moonRadius * 0.25, moonY - moonRadius * 0.1, moonRadius * 0.3, moonRadius * 0.2, -0.3, 0, Math.PI * 2);
    ctx.ellipse(moonX + moonRadius * 0.2, moonY + moonRadius * 0.25, moonRadius * 0.25, moonRadius * 0.18, 0.4, 0, Math.PI * 2);
    ctx.ellipse(moonX + moonRadius * 0.28, moonY - moonRadius * 0.15, moonRadius * 0.18, moonRadius * 0.22, 0.1, 0, Math.PI * 2);
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

    // Cloud Layer 1 - High wispy nocturnal haze
    const cloudShift1 = (time * 10) % width;
    ctx.fillStyle = 'rgba(150, 185, 230, 0.035)';

    for (let i = -1; i <= 1; i++) {
      const cx = (width * 0.35 + cloudShift1) + i * width;
      const cy = height * 0.14;

      ctx.beginPath();
      ctx.ellipse(cx, cy, width * 0.28, height * 0.05, 0.04, 0, Math.PI * 2);
      ctx.ellipse(cx + width * 0.12, cy - height * 0.015, width * 0.18, height * 0.04, -0.04, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cloud Layer 2 - Moon backlit clouds
    const cloudShift2 = (time * 7) % (width * 1.4);
    const mcx = ((moonX - width * 0.2) + cloudShift2) % (width * 1.4) - width * 0.2;
    const mcy = moonY + height * 0.015;

    const cloudGrad = ctx.createRadialGradient(
      moonX, moonY, 15,
      mcx, mcy, width * 0.28
    );
    cloudGrad.addColorStop(0, 'rgba(215, 232, 255, 0.11)');
    cloudGrad.addColorStop(0.5, 'rgba(110, 150, 205, 0.05)');
    cloudGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = cloudGrad;
    ctx.beginPath();
    ctx.ellipse(mcx, mcy, width * 0.22, height * 0.045, -0.02, 0, Math.PI * 2);
    ctx.ellipse(mcx - width * 0.09, mcy + height * 0.01, width * 0.16, height * 0.035, 0.02, 0, Math.PI * 2);
    ctx.fill();

    // Horizon fog/cloud band
    const fogGrad = ctx.createLinearGradient(0, horizonY - height * 0.08, 0, horizonY);
    fogGrad.addColorStop(0, 'rgba(12, 22, 42, 0)');
    fogGrad.addColorStop(1, 'rgba(18, 32, 58, 0.4)');

    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, horizonY - height * 0.08, width, height * 0.08);

    ctx.restore();
  }
}
