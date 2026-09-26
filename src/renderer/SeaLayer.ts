// SeaLayer.ts - Renders ocean water, atmospheric moonlight reflection, and organic wave movement

export class SeaLayer {
  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    const horizonY = height * 0.52;
    const seaHeight = height - horizonY;

    ctx.save();

    // 1. Base Sea Gradient (Deep atmospheric ocean)
    const seaGrad = ctx.createLinearGradient(0, horizonY, 0, height);
    seaGrad.addColorStop(0.0, '#091528');
    seaGrad.addColorStop(0.25, '#06101f');
    seaGrad.addColorStop(0.65, '#040814');
    seaGrad.addColorStop(1.0, '#020408');

    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, horizonY, width, seaHeight);

    // 2. Soft Atmospheric Moonlight Surface Glow (Natural trapezoidal reflection path)
    const moonX = width * 0.66;
    const topWidth = width * 0.08;
    const bottomWidth = width * 0.42;

    const surfaceGlow = ctx.createLinearGradient(0, horizonY, 0, height);
    surfaceGlow.addColorStop(0.0, 'rgba(180, 215, 255, 0.20)');
    surfaceGlow.addColorStop(0.3, 'rgba(120, 175, 240, 0.10)');
    surfaceGlow.addColorStop(0.7, 'rgba(60, 115, 190, 0.04)');
    surfaceGlow.addColorStop(1.0, 'rgba(20, 50, 110, 0.01)');

    ctx.fillStyle = surfaceGlow;
    ctx.beginPath();
    ctx.moveTo(moonX - topWidth * 0.5, horizonY);
    ctx.lineTo(moonX + topWidth * 0.5, horizonY);
    ctx.lineTo(moonX + bottomWidth * 0.5, height);
    ctx.lineTo(moonX - bottomWidth * 0.5, height);
    ctx.closePath();
    ctx.fill();

    // Secondary Radial Glow directly near horizon beneath moon
    const moonBaseGlow = ctx.createRadialGradient(moonX, horizonY, 2, moonX, horizonY + 60, width * 0.2);
    moonBaseGlow.addColorStop(0.0, 'rgba(210, 235, 255, 0.28)');
    moonBaseGlow.addColorStop(0.5, 'rgba(130, 185, 245, 0.08)');
    moonBaseGlow.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = moonBaseGlow;
    ctx.fillRect(0, horizonY, width, 180);

    // 3. Organic Specular Water Shimmer (Scatter shimmer streaks naturally across depth & lane width)
    const sparkleCount = 65;
    for (let i = 0; i < sparkleCount; i++) {
      // Pseudo-random depth & horizontal placement using deterministic index hash
      const seedY = Math.abs(Math.sin(i * 12.9898 + 0.1) * 43758.5453) % 1;
      const seedX = (Math.sin(i * 78.233 + 0.2) * 43758.5453) % 1;

      const depthFactor = 0.05 + seedY * 0.90; // Avoid extreme edges
      const y = horizonY + Math.pow(depthFactor, 1.8) * seaHeight;

      // Perspective width at current depth
      const currentLaneWidth = topWidth + (bottomWidth - topWidth) * depthFactor;

      // Natural scattered placement across the moonlight lane
      const xOffset = seedX * currentLaneWidth * 0.75;
      const wavePhase = time * (1.2 + (i % 5) * 0.25) + i * 1.7;
      const drift = Math.sin(wavePhase) * (6 + depthFactor * 12);
      const cx = moonX + xOffset + drift;

      // Distance falloff from moon centerline
      const distFromCenter = Math.abs(cx - moonX) / (currentLaneWidth * 0.55);
      if (distFromCenter > 1.0) continue;

      const centerAlpha = Math.max(0, 1 - Math.pow(distFromCenter, 1.8));

      // Thinner, delicate organic shimmer streaks
      const streakLength = (8 + depthFactor * 45) * (0.65 + 0.35 * Math.sin(time * 2.2 + i));
      const streakHeight = 0.4 + depthFactor * 1.1;

      // Soft opacity pulsing
      const opacity = (0.06 + 0.22 * Math.pow(Math.sin(time * 2.8 + i * 1.4), 2)) * centerAlpha * (1 - depthFactor * 0.35);

      ctx.strokeStyle = `rgba(225, 242, 255, ${opacity})`;
      ctx.lineWidth = streakHeight;
      ctx.lineCap = 'round';

      ctx.beginPath();
      const sx = cx - streakLength * 0.5;
      const ex = cx + streakLength * 0.5;
      ctx.moveTo(sx, y);
      ctx.lineTo(ex, y);
      ctx.stroke();
    }

    // 4. Smooth Ocean Swells & Horizon Water Horizon Line
    const swellCount = 12;
    for (let s = 0; s < swellCount; s++) {
      const sProg = s / swellCount;
      const sy = horizonY + Math.pow(sProg, 1.4) * seaHeight;
      const sAlpha = 0.04 + sProg * 0.08;

      ctx.strokeStyle = `rgba(140, 185, 230, ${sAlpha})`;
      ctx.lineWidth = 0.7 + sProg * 1.5;

      ctx.beginPath();
      const waveFreq = 0.005 - sProg * 0.0025;
      const waveSpeed = time * (0.8 + sProg * 0.6);

      for (let x = 0; x <= width; x += 40) {
        const offset = Math.sin(x * waveFreq + waveSpeed + s * 1.7) * (1.0 + sProg * 3.0);
        if (x === 0) {
          ctx.moveTo(x, sy + offset);
        } else {
          ctx.lineTo(x, sy + offset);
        }
      }
      ctx.stroke();
    }

    // Gentle crisp horizon edge
    ctx.strokeStyle = 'rgba(160, 205, 245, 0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(width, horizonY);
    ctx.stroke();

    ctx.restore();
  }
}
