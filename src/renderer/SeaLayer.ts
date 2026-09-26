// SeaLayer.ts - Renders ocean water, moonlight shimmer lane, and ambient wave motion

export class SeaLayer {
  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    const horizonY = height * 0.52;
    const seaHeight = height - horizonY;

    ctx.save();

    // 1. Base Sea Gradient (Deep atmospheric ocean)
    const seaGrad = ctx.createLinearGradient(0, horizonY, 0, height);
    seaGrad.addColorStop(0.0, '#0a172c');
    seaGrad.addColorStop(0.2, '#071122');
    seaGrad.addColorStop(0.6, '#040916');
    seaGrad.addColorStop(1.0, '#02050b');

    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, horizonY, width, seaHeight);

    // 2. Soft Ambient Moon Beam / Reflection Column on Water Surface
    const moonX = width * 0.66;
    const laneWidthTop = width * 0.06;
    const laneWidthBottom = width * 0.38;

    const beamGrad = ctx.createLinearGradient(0, horizonY, 0, height);
    beamGrad.addColorStop(0.0, 'rgba(195, 225, 255, 0.22)');
    beamGrad.addColorStop(0.25, 'rgba(145, 195, 250, 0.12)');
    beamGrad.addColorStop(0.65, 'rgba(85, 140, 210, 0.05)');
    beamGrad.addColorStop(1.0, 'rgba(30, 70, 130, 0.01)');

    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(moonX - laneWidthTop * 0.5, horizonY);
    ctx.lineTo(moonX + laneWidthTop * 0.5, horizonY);
    ctx.lineTo(moonX + laneWidthBottom * 0.5, height);
    ctx.lineTo(moonX - laneWidthBottom * 0.5, height);
    ctx.closePath();
    ctx.fill();

    // 3. Organic Moonlight Water Ripples / Specular Shimmer
    const numRippleRows = 90;
    for (let i = 0; i < numRippleRows; i++) {
      const progress = i / numRippleRows; // 0 at horizon, 1 at screen bottom
      const y = horizonY + Math.pow(progress, 1.4) * seaHeight;

      // Current width of reflection column at depth y
      const currentLaneWidth = laneWidthTop + (laneWidthBottom - laneWidthTop) * progress;

      // Draw multiple organic wave fragments per row
      const fragmentsInRow = Math.floor(2 + progress * 6);
      for (let f = 0; f < fragmentsInRow; f++) {
        const fragProgress = (f + 0.5) / fragmentsInRow;

        // Offset wave center organically within the lane
        const wavePhase = time * 2.2 + progress * 14 + f * 1.7;
        const waveOffset = Math.sin(wavePhase) * (2 + progress * 8);
        const centerOffset = (fragProgress - 0.5) * currentLaneWidth * 0.85;

        const rx = moonX + centerOffset + waveOffset;

        // Distance from central moon line controls alpha falloff
        const distFromCenter = Math.abs(rx - moonX) / (currentLaneWidth * 0.5);
        const centerFalloff = Math.max(0, 1 - Math.pow(distFromCenter, 1.8));

        // Length and stroke width scale with perspective
        const baseLength = (12 + progress * 65) * (0.4 + 0.6 * Math.sin(time * 1.5 + f * 2) ** 2);
        const fragLength = baseLength * centerFalloff;

        if (fragLength < 2) continue;

        const lineWidth = Math.max(0.8, progress * 2.8);
        const alpha = (1 - progress * 0.6) * centerFalloff * (0.25 + 0.4 * Math.abs(Math.sin(wavePhase)));

        ctx.strokeStyle = `rgba(220, 240, 255, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';

        ctx.beginPath();
        const startX = rx - fragLength * 0.5;
        const endX = rx + fragLength * 0.5;
        const midX = rx;
        const midY = y + Math.sin(wavePhase) * (0.8 + progress * 1.8);

        ctx.moveTo(startX, y);
        ctx.quadraticCurveTo(midX, midY, endX, y);
        ctx.stroke();
      }
    }

    // 4. Subtle Full-Width Ocean Waves & Swells
    const waveRows = 20;
    for (let r = 0; r < waveRows; r++) {
      const rowProg = r / waveRows;
      const wy = horizonY + Math.pow(rowProg, 1.35) * seaHeight;
      const rowAlpha = 0.05 + rowProg * 0.12;

      ctx.strokeStyle = `rgba(125, 170, 220, ${rowAlpha})`;
      ctx.lineWidth = 0.8 + rowProg * 1.6;

      ctx.beginPath();
      const waveFreq = 0.007 - rowProg * 0.0035;
      const waveSpeed = time * (1.1 + rowProg * 0.7);

      for (let x = 0; x <= width; x += 35) {
        const offset = Math.sin(x * waveFreq + waveSpeed + r * 1.3) * (1.2 + rowProg * 3.5);
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
