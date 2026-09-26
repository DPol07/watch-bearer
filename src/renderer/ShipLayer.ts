// ShipLayer.ts - Renders the Black Pearl in the middle-distance sailing across the sea

export class ShipLayer {
  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    const horizonY = height * 0.52;

    // Ship position in middle distance
    // Slow horizontal movement across middle sea
    const driftSpeed = 1.5; // pixels per sec
    const baseShipX = (width * 0.44 + (time * driftSpeed) % (width * 0.4)) % (width * 0.7);

    // Gentle water bobbing motion
    const bobOffset = Math.sin(time * 1.2) * 2.5;
    const pitchAngle = Math.sin(time * 0.9) * 0.025; // pitch rotation in radians

    const shipY = horizonY + height * 0.015 + bobOffset;

    // Scale ship based on screen height to feel substantial yet distant
    const shipScale = Math.max(0.65, Math.min(1.25, height / 850));

    ctx.save();
    ctx.translate(baseShipX, shipY);
    ctx.rotate(pitchAngle);
    ctx.scale(shipScale, shipScale);

    // Ship Colors (Black Pearl aesthetic with distinct contrast & rim light)
    const hullColor = '#0c1526';
    const sailColor = '#121f36';
    const highlightColor = 'rgba(215, 240, 255, 0.75)';

    // 0. Soft Backlight Glow around ship silhouette
    const shipBacklight = ctx.createRadialGradient(0, -30, 10, 0, -30, 90);
    shipBacklight.addColorStop(0, 'rgba(160, 205, 255, 0.22)');
    shipBacklight.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shipBacklight;
    ctx.beginPath();
    ctx.arc(0, -30, 90, 0, Math.PI * 2);
    ctx.fill();

    // 1. Ship Wake / Water Ripples beneath hull
    ctx.fillStyle = 'rgba(180, 225, 255, 0.35)';
    ctx.beginPath();
    ctx.ellipse(-30, 8, 45, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Hull (3-masted Galleon Silhouette)
    ctx.fillStyle = hullColor;
    ctx.beginPath();
    // Bow (left side, heading left)
    ctx.moveTo(-45, 0); // Bow tip
    ctx.lineTo(-65, -8); // Bowsprit base
    ctx.quadraticCurveTo(-40, 6, -20, 8); // Bow to mid hull
    ctx.lineTo(25, 8); // Mid hull to stern
    ctx.quadraticCurveTo(45, 8, 50, -2); // Stern bottom curve
    ctx.lineTo(52, -18); // Elevated stern / quarterdeck
    ctx.lineTo(32, -18); // Stern deck top
    ctx.lineTo(30, -5); // Stern deck drop
    ctx.lineTo(-35, -5); // Main deck level
    ctx.lineTo(-42, -12); // Raised forecastle
    ctx.closePath();
    ctx.fill();

    // Hull moonlight rim highlight
    ctx.strokeStyle = highlightColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-42, -12);
    ctx.lineTo(-35, -5);
    ctx.lineTo(30, -5);
    ctx.lineTo(32, -18);
    ctx.lineTo(52, -18);
    ctx.stroke();

    // 3. Bowsprit Pole
    ctx.strokeStyle = hullColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-40, -10);
    ctx.lineTo(-85, -22);
    ctx.stroke();

    // 4. Masts & Yardarms
    // Masts positions: Foremast (-22), Mainmast (5), Mizzenmast (32)
    const masts = [
      { x: -22, height: 68, yardarms: [-20, -38, -54] },
      { x: 5, height: 78, yardarms: [-22, -44, -62] },
      { x: 32, height: 58, yardarms: [-18, -35, -48] }
    ];

    // Draw Masts
    for (const m of masts) {
      ctx.strokeStyle = hullColor;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(m.x, -5);
      ctx.lineTo(m.x, -m.height);
      ctx.stroke();

      // Masttop / Crow's Nest
      ctx.fillStyle = hullColor;
      ctx.fillRect(m.x - 3, -m.height * 0.65, 6, 3);

      // Yardarms & Billowing Sails
      for (const yHeight of m.yardarms) {
        const yardWidth = (m.height + yHeight) * 0.55 + 12;

        // Yardarm bar
        ctx.strokeStyle = hullColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x - yardWidth * 0.5, yHeight);
        ctx.lineTo(m.x + yardWidth * 0.5, yHeight);
        ctx.stroke();

        // Billowing Sail Shape
        ctx.fillStyle = sailColor;
        ctx.beginPath();
        ctx.moveTo(m.x - yardWidth * 0.5, yHeight);
        ctx.quadraticCurveTo(m.x - yardWidth * 0.6, yHeight + 7, m.x - yardWidth * 0.45, yHeight + 14);
        ctx.lineTo(m.x + yardWidth * 0.45, yHeight + 14);
        ctx.quadraticCurveTo(m.x + yardWidth * 0.6, yHeight + 7, m.x + yardWidth * 0.5, yHeight);
        ctx.closePath();
        ctx.fill();

        // Moonlight highlight on top & outer curve of sail
        ctx.strokeStyle = highlightColor;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(m.x - yardWidth * 0.5, yHeight);
        ctx.lineTo(m.x + yardWidth * 0.5, yHeight);
        ctx.quadraticCurveTo(m.x + yardWidth * 0.6, yHeight + 7, m.x + yardWidth * 0.45, yHeight + 14);
        ctx.stroke();
      }

      // Pennant / Flag at mast top
      ctx.fillStyle = '#080d16';
      ctx.beginPath();
      ctx.moveTo(m.x, -m.height);
      ctx.lineTo(m.x + 12 + Math.sin(time * 3 + m.x) * 3, -m.height + 2);
      ctx.lineTo(m.x, -m.height + 5);
      ctx.closePath();
      ctx.fill();
    }

    // Jib Sail on Bowsprit
    ctx.fillStyle = sailColor;
    ctx.beginPath();
    ctx.moveTo(-22, -45);
    ctx.quadraticCurveTo(-50, -30, -78, -20);
    ctx.lineTo(-22, -12);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = highlightColor;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // 5. Rigging Lines
    ctx.strokeStyle = 'rgba(140, 180, 220, 0.45)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    // Stays
    ctx.moveTo(-82, -21);
    ctx.lineTo(-22, -68);
    ctx.lineTo(5, -78);
    ctx.lineTo(32, -58);
    ctx.lineTo(50, -18);

    // Shrouds
    ctx.moveTo(-22, -60); ctx.lineTo(-28, -5);
    ctx.moveTo(-22, -60); ctx.lineTo(-16, -5);
    ctx.moveTo(5, -70); ctx.lineTo(-1, -5);
    ctx.moveTo(5, -70); ctx.lineTo(11, -5);
    ctx.moveTo(32, -50); ctx.lineTo(26, -18);
    ctx.moveTo(32, -50); ctx.lineTo(38, -18);
    ctx.stroke();

    ctx.restore();
  }
}
