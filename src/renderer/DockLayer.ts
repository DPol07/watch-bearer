// DockLayer.ts - Renders weathered wooden dock in lower-right foreground

export class DockLayer {
  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    ctx.save();

    // Refined Perspective Dock Anchor Points (Elegantly scaled, occupying far less screen area)
    // Bottom edge of screen (y = height)
    const bottomNearX1 = width * 0.75;
    const bottomNearX2 = width * 1.02;

    // Far end of dock (y = dockTopY where pirate stands)
    const dockTopY = height * 0.72;
    const topFarX1 = width * 0.82;
    const topFarX2 = width * 0.96;

    // 1. Support Pilings under the dock extending into sea
    const pilings = [
      { xTop: topFarX1 + (topFarX2 - topFarX1) * 0.08, yTop: dockTopY, widthTop: 10, height: height * 0.25 },
      { xTop: topFarX1 + (topFarX2 - topFarX1) * 0.92, yTop: dockTopY, widthTop: 12, height: height * 0.25 },
      { xTop: width * 0.78, yTop: height * 0.86, widthTop: 14, height: height * 0.16 },
      { xTop: width * 0.97, yTop: height * 0.86, widthTop: 16, height: height * 0.16 }
    ];

    for (const p of pilings) {
      const pGrad = ctx.createLinearGradient(p.xTop, p.yTop, p.xTop + p.widthTop, p.yTop);
      pGrad.addColorStop(0, '#02050b');
      pGrad.addColorStop(0.5, '#070f1e');
      pGrad.addColorStop(1, '#010307');

      ctx.fillStyle = pGrad;
      ctx.fillRect(p.xTop, p.yTop, p.widthTop, p.height);

      // Water lapping around piling base
      const lapPhase = Math.sin(time * 2 + p.xTop) * 2;
      ctx.fillStyle = 'rgba(180, 215, 255, 0.25)';
      ctx.fillRect(p.xTop - 4, p.yTop + p.height - 12 + lapPhase, p.widthTop + 8, 3);
    }

    // 2. Under-Dock Shadow & Crossbeams
    ctx.fillStyle = '#010308';
    ctx.beginPath();
    ctx.moveTo(bottomNearX1, height);
    ctx.lineTo(topFarX1, dockTopY);
    ctx.lineTo(topFarX2, dockTopY);
    ctx.lineTo(bottomNearX2, height);
    ctx.closePath();
    ctx.fill();

    // 3. Wooden Deck Planks with Perspective & Weathered Textures
    const numPlanks = 22;
    for (let i = 0; i < numPlanks; i++) {
      const t1 = i / numPlanks;
      const t2 = (i + 0.9) / numPlanks;

      // Perspective Interpolation
      const py1 = dockTopY + (height - dockTopY) * Math.pow(t1, 1.25);
      const py2 = dockTopY + (height - dockTopY) * Math.pow(t2, 1.25);

      const px1_left = topFarX1 + (bottomNearX1 - topFarX1) * Math.pow(t1, 1.25);
      const px1_right = topFarX2 + (bottomNearX2 - topFarX2) * Math.pow(t1, 1.25);

      const px2_left = topFarX1 + (bottomNearX1 - topFarX1) * Math.pow(t2, 1.25);
      const px2_right = topFarX2 + (bottomNearX2 - topFarX2) * Math.pow(t2, 1.25);

      // Individual Plank Shading & Wood Tones
      const toneVariation = (i % 3 === 0) ? '#0c1626' : (i % 2 === 0 ? '#08101e' : '#050b16');
      ctx.fillStyle = toneVariation;

      ctx.beginPath();
      ctx.moveTo(px1_left, py1);
      ctx.lineTo(px1_right, py1);
      ctx.lineTo(px2_right, py2);
      ctx.lineTo(px2_left, py2);
      ctx.closePath();
      ctx.fill();

      // Gap between planks
      ctx.strokeStyle = '#010408';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Top Edge Moonlight Highlight on Planks
      const moonHighlightAlpha = 0.15 + t1 * 0.25;
      ctx.strokeStyle = `rgba(180, 210, 250, ${moonHighlightAlpha})`;
      ctx.lineWidth = 0.9 + t1 * 1.1;
      ctx.beginPath();
      ctx.moveTo(px1_left + 4, py1 + 1);
      ctx.lineTo(px1_right - 4, py1 + 1);
      ctx.stroke();

      // Wood Grain Lines & Iron Bolts
      ctx.strokeStyle = 'rgba(2, 6, 14, 0.6)';
      ctx.lineWidth = 0.7;
      const midY = (py1 + py2) / 2;
      ctx.beginPath();
      ctx.moveTo(px1_left + (px1_right - px1_left) * 0.2, midY);
      ctx.lineTo(px1_left + (px1_right - px1_left) * 0.8, midY);
      ctx.stroke();

      // Iron Bolts at plank ends
      ctx.fillStyle = 'rgba(160, 190, 230, 0.25)';
      ctx.fillRect(px1_left + 8 + t1 * 10, midY - 1, 2 + t1 * 2, 2 + t1 * 2);
      ctx.fillRect(px1_right - 12 - t1 * 10, midY - 1, 2 + t1 * 2, 2 + t1 * 2);
    }

    // Outer Dock Edge Profile Shadow
    ctx.strokeStyle = 'rgba(2, 5, 12, 0.9)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bottomNearX1, height);
    ctx.lineTo(topFarX1, dockTopY);
    ctx.stroke();

    ctx.restore();
  }
}
