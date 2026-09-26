// SeaLayer.ts - Renders ocean water, moonlight shimmer lane, and ambient wave motion

export class SeaLayer {
  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    const horizonY = height * 0.52;
    const seaHeight = height - horizonY;

    ctx.save();

    // 1. Base Sea Gradient (Horizon to Foreground)
    const seaGrad = ctx.createLinearGradient(0, horizonY, 0, height);
    seaGrad.addColorStop(0.0, '#0c1a30');
    seaGrad.addColorStop(0.2, '#081224');
    seaGrad.addColorStop(0.6, '#050c19');
    seaGrad.addColorStop(1.0, '#02060d');

    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, horizonY, width, seaHeight);

    // 2. Moonlight Reflection Lane (Centered beneath Moon at x ≈ 0.66)
    const moonX = width * 0.66;
    const shimmerWidthTop = width * 0.08;
    const shimmerWidthBottom = width * 0.35;

    // Draw Shimmer Mask Area
    const shimmerGrad = ctx.createLinearGradient(0, horizonY, 0, height);
    shimmerGrad.addColorStop(0.0, 'rgba(180, 215, 255, 0.45)');
    shimmerGrad.addColorStop(0.2, 'rgba(140, 190, 245, 0.30)');
    shimmerGrad.addColorStop(0.6, 'rgba(90, 145, 215, 0.18)');
    shimmerGrad.addColorStop(1.0, 'rgba(40, 85, 150, 0.05)');

    // 2a. Soft Ambient Glow Beam under Moon
    const beamGrad = ctx.createLinearGradient(moonX, horizonY, moonX, height);
    beamGrad.addColorStop(0.0, 'rgba(180, 215, 255, 0.22)');
    beamGrad.addColorStop(0.3, 'rgba(130, 180, 240, 0.12)');
    beamGrad.addColorStop(1.0, 'rgba(50, 95, 160, 0.02)');

    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(moonX - shimmerWidthTop * 0.5, horizonY);
    ctx.lineTo(moonX + shimmerWidthTop * 0.5, horizonY);
    ctx.lineTo(moonX + shimmerWidthBottom * 0.5, height);
    ctx.lineTo(moonX - shimmerWidthBottom * 0.5, height);
    ctx.closePath();
    ctx.fill();

    // 2b. Render blended, organic ocean ripples along the lane
    const numRipples = 80;
    for (let i = 0; i < numRipples; i++) {
      const progress = i / numRipples; // 0 at horizon, 1 at bottom
      const y = horizonY + Math.pow(progress, 1.35) * seaHeight;
      const currentLaneWidth = shimmerWidthTop + (shimmerWidthBottom - shimmerWidthTop) * progress;

      // Oscillate ripple position and length smoothly
      const wavePhase = time * 2.0 + progress * 12;
      const waveOffset = Math.sin(wavePhase) * (1.5 + progress * 6);
      const rippleLength = (0.25 + 0.75 * Math.sin(time * 1.4 + progress * 8) ** 2) * currentLaneWidth;

      const rx = moonX + waveOffset + (Math.cos(progress * 25 + time) * currentLaneWidth * 0.15);

      // Soft blended opacity & line caps
      const lineWidth = Math.max(0.7, progress * 3.0);
      const alpha = (1 - progress * 0.65) * (0.2 + 0.45 * Math.abs(Math.sin(wavePhase)));

      ctx.strokeStyle = `rgba(215, 235, 255, ${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(rx - rippleLength * 0.5, y);
      ctx.quadraticCurveTo(rx, y + Math.sin(wavePhase) * 1.5, rx + rippleLength * 0.5, y);
      ctx.stroke();
    }

    // 3. Subtle Wave Swells across the wider sea
    const waveRows = 18;
    for (let r = 0; r < waveRows; r++) {
      const rowProg = r / waveRows;
      const wy = horizonY + Math.pow(rowProg, 1.4) * seaHeight;
      const rowAlpha = 0.08 + rowProg * 0.12;

      ctx.strokeStyle = `rgba(130, 175, 225, ${rowAlpha})`;
      ctx.lineWidth = 1 + rowProg * 1.8;

      ctx.beginPath();
      const waveFreq = 0.008 - rowProg * 0.004;
      const waveSpeed = time * (1.2 + rowProg * 0.8);

      for (let x = 0; x <= width; x += 30) {
        const offset = Math.sin(x * waveFreq + waveSpeed + r) * (1.5 + rowProg * 4);
        if (x === 0) {
          ctx.moveTo(x, wy + offset);
        } else {
          ctx.lineTo(x, wy + offset);
        }
      }
      ctx.stroke();
    }

    ctx.restore();
  }
}
