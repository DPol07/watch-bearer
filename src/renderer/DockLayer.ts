// DockLayer.ts - Renders weathered wooden dock in lower-right foreground

export class DockLayer {
  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    ctx.save();

    // Perspective Dock Anchor Points (Elegantly scaled on lower-right)
    const bottomNearX1 = width * 0.74;
    const bottomNearX2 = width * 1.02;

    const dockTopY = height * 0.71;
    const topFarX1 = width * 0.82;
    const topFarX2 = width * 0.96;

    // 1. Support Pilings under the dock extending into sea
    const pilings = [
      { xTop: topFarX1 + (topFarX2 - topFarX1) * 0.08, yTop: dockTopY, widthTop: 10, height: height * 0.26 },
      { xTop: topFarX1 + (topFarX2 - topFarX1) * 0.92, yTop: dockTopY, widthTop: 12, height: height * 0.26 },
      { xTop: width * 0.77, yTop: height * 0.85, widthTop: 15, height: height * 0.17 },
      { xTop: width * 0.98, yTop: height * 0.85, widthTop: 17, height: height * 0.17 }
    ];

    for (const p of pilings) {
      const pGrad = ctx.createLinearGradient(p.xTop, p.yTop, p.xTop + p.widthTop, p.yTop);
      pGrad.addColorStop(0, '#02050a');
      pGrad.addColorStop(0.5, '#070e1c');
      pGrad.addColorStop(1, '#010306');

      ctx.fillStyle = pGrad;
      ctx.fillRect(p.xTop, p.yTop, p.widthTop, p.height);

      // Water lapping around piling base with foam highlight
      const lapPhase = Math.sin(time * 2.2 + p.xTop) * 2;
      ctx.fillStyle = 'rgba(195, 225, 255, 0.28)';
      ctx.fillRect(p.xTop - 4, p.yTop + p.height - 10 + lapPhase, p.widthTop + 8, 2.5);
    }

    // 2. Under-Dock Deep Shadow Base
    ctx.fillStyle = '#010307';
    ctx.beginPath();
    ctx.moveTo(bottomNearX1, height);
    ctx.lineTo(topFarX1, dockTopY);
    ctx.lineTo(topFarX2, dockTopY);
    ctx.lineTo(bottomNearX2, height);
    ctx.closePath();
    ctx.fill();

    // 3. Wooden Deck Planks with Perspective & Weathered Grain Textures
    const numPlanks = 26;
    for (let i = 0; i < numPlanks; i++) {
      const t1 = i / numPlanks;
      const t2 = (i + 0.92) / numPlanks;

      // Perspective Interpolation
      const py1 = dockTopY + (height - dockTopY) * Math.pow(t1, 1.25);
      const py2 = dockTopY + (height - dockTopY) * Math.pow(t2, 1.25);

      const px1_left = topFarX1 + (bottomNearX1 - topFarX1) * Math.pow(t1, 1.25);
      const px1_right = topFarX2 + (bottomNearX2 - topFarX2) * Math.pow(t1, 1.25);

      const px2_left = topFarX1 + (bottomNearX1 - topFarX1) * Math.pow(t2, 1.25);
      const px2_right = topFarX2 + (bottomNearX2 - topFarX2) * Math.pow(t2, 1.25);

      // Plank Surface Gradient (Weathered dark oak / pine)
      const plankGrad = ctx.createLinearGradient(px1_left, py1, px1_right, py1);
      if (i % 3 === 0) {
        plankGrad.addColorStop(0, '#0e1828');
        plankGrad.addColorStop(0.5, '#0a1220');
        plankGrad.addColorStop(1, '#060c18');
      } else if (i % 2 === 0) {
        plankGrad.addColorStop(0, '#0a1220');
        plankGrad.addColorStop(0.5, '#070d18');
        plankGrad.addColorStop(1, '#040812');
      } else {
        plankGrad.addColorStop(0, '#070e1a');
        plankGrad.addColorStop(0.5, '#050a14');
        plankGrad.addColorStop(1, '#03060d');
      }

      ctx.fillStyle = plankGrad;
      ctx.beginPath();
      ctx.moveTo(px1_left, py1);
      ctx.lineTo(px1_right, py1);
      ctx.lineTo(px2_right, py2);
      ctx.lineTo(px2_left, py2);
      ctx.closePath();
      ctx.fill();

      // Deep gap seam between planks
      ctx.strokeStyle = '#010306';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Top Edge Moonlight Rim Highlight on Planks
      const moonHighlightAlpha = 0.12 + t1 * 0.28;
      ctx.strokeStyle = `rgba(195, 225, 255, ${moonHighlightAlpha})`;
      ctx.lineWidth = 0.8 + t1 * 1.2;
      ctx.beginPath();
      ctx.moveTo(px1_left + 3, py1 + 1);
      ctx.lineTo(px1_right - 3, py1 + 1);
      ctx.stroke();

      // Subtle Wood Grain Texture Lines
      ctx.strokeStyle = 'rgba(2, 6, 14, 0.65)';
      ctx.lineWidth = 0.8;
      const midY = (py1 + py2) / 2;
      ctx.beginPath();
      ctx.moveTo(px1_left + (px1_right - px1_left) * 0.15, midY);
      ctx.lineTo(px1_left + (px1_right - px1_left) * 0.85, midY);
      ctx.stroke();

      // Weathered Iron Fasteners / Bolts at plank ends
      ctx.fillStyle = 'rgba(175, 205, 245, 0.28)';
      const boltSize = 2 + t1 * 2.2;
      ctx.fillRect(px1_left + 8 + t1 * 12, midY - 1, boltSize, boltSize);
      ctx.fillRect(px1_right - 12 - t1 * 12, midY - 1, boltSize, boltSize);
    }

    // Outer Dock Left Edge Profile Shadow
    ctx.strokeStyle = 'rgba(1, 3, 8, 0.95)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(bottomNearX1, height);
    ctx.lineTo(topFarX1, dockTopY);
    ctx.stroke();

    ctx.restore();
  }
}
