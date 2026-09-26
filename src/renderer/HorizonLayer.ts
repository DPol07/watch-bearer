// HorizonLayer.ts - Renders distant dark, atmospheric island and mountain silhouettes

export class HorizonLayer {
  public render(ctx: CanvasRenderingContext2D, width: number, height: number, _time: number) {
    const horizonY = height * 0.52;
    ctx.save();

    // Layer 1: Far Distant Mountain Range (Softest, highest atmospheric haze)
    ctx.fillStyle = '#14223d';
    ctx.beginPath();
    ctx.moveTo(0, horizonY);

    const pointsFar = [
      { x: 0, h: 0.02 },
      { x: 0.08, h: 0.055 },
      { x: 0.16, h: 0.03 },
      { x: 0.24, h: 0.07 },
      { x: 0.32, h: 0.045 },
      { x: 0.40, h: 0.025 },
      { x: 0.48, h: 0.06 },
      { x: 0.58, h: 0.085 },
      { x: 0.68, h: 0.04 },
      { x: 0.78, h: 0.065 },
      { x: 0.88, h: 0.035 },
      { x: 1.0, h: 0.02 },
    ];

    for (let i = 0; i < pointsFar.length; i++) {
      const pt = pointsFar[i];
      const px = pt.x * width;
      const py = horizonY - pt.h * height;
      if (i === 0) {
        ctx.lineTo(px, py);
      } else {
        const prev = pointsFar[i - 1];
        const prevX = prev.x * width;
        const prevY = horizonY - prev.h * height;
        const cx = (prevX + px) / 2;
        ctx.quadraticCurveTo(prevX, prevY, cx, (prevY + py) / 2);
      }
    }
    ctx.lineTo(width, horizonY);
    ctx.closePath();
    ctx.fill();

    // Haze tint overlay over distant range
    const haze1 = ctx.createLinearGradient(0, horizonY - height * 0.09, 0, horizonY);
    haze1.addColorStop(0, 'rgba(25, 42, 72, 0)');
    haze1.addColorStop(1, 'rgba(25, 42, 72, 0.4)');
    ctx.fillStyle = haze1;
    ctx.fillRect(0, horizonY - height * 0.09, width, height * 0.09);

    // Layer 2: Mid-Distant Island Silhouettes
    ctx.fillStyle = '#0f1c33';

    // Left Island Group
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.quadraticCurveTo(width * 0.05, horizonY - height * 0.05, width * 0.12, horizonY - height * 0.065);
    ctx.quadraticCurveTo(width * 0.18, horizonY - height * 0.075, width * 0.25, horizonY - height * 0.035);
    ctx.quadraticCurveTo(width * 0.30, horizonY - height * 0.015, width * 0.35, horizonY);
    ctx.closePath();
    ctx.fill();

    // Center-Right Island Group
    ctx.beginPath();
    ctx.moveTo(width * 0.52, horizonY);
    ctx.quadraticCurveTo(width * 0.60, horizonY - height * 0.045, width * 0.68, horizonY - height * 0.058);
    ctx.quadraticCurveTo(width * 0.74, horizonY - height * 0.07, width * 0.82, horizonY - height * 0.04);
    ctx.quadraticCurveTo(width * 0.90, horizonY - height * 0.02, width * 0.96, horizonY);
    ctx.closePath();
    ctx.fill();

    // Moonlight Highlights on Island Ridges
    ctx.strokeStyle = 'rgba(200, 230, 255, 0.42)';
    ctx.lineWidth = 1.8;

    ctx.beginPath();
    ctx.moveTo(width * 0.64, horizonY - height * 0.052);
    ctx.quadraticCurveTo(width * 0.68, horizonY - height * 0.058, width * 0.72, horizonY - height * 0.062);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width * 0.10, horizonY - height * 0.06);
    ctx.quadraticCurveTo(width * 0.12, horizonY - height * 0.065, width * 0.15, horizonY - height * 0.072);
    ctx.stroke();

    // Subtle Base Sea Mist
    const mistGrad = ctx.createLinearGradient(0, horizonY - 4, 0, horizonY + 8);
    mistGrad.addColorStop(0, 'rgba(25, 42, 70, 0)');
    mistGrad.addColorStop(0.5, 'rgba(80, 120, 170, 0.2)');
    mistGrad.addColorStop(1, 'rgba(12, 22, 40, 0)');

    ctx.fillStyle = mistGrad;
    ctx.fillRect(0, horizonY - 4, width, 12);

    ctx.restore();
  }
}
