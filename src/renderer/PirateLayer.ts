// PirateLayer.ts - Renders an organic, detailed pirate silhouette looking down at his mysterious watch

export class PirateLayer {
  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    ctx.save();

    // Position pirate on dock (Right Foreground)
    const px = width * 0.88; // Center X of pirate
    const py = height * 0.722; // Feet level on dock surface

    // Scale pirate proportionally to screen height
    const scale = Math.max(0.70, Math.min(1.18, height / 800));

    ctx.translate(px, py);
    ctx.scale(scale, scale);

    // Subtle breathing & breeze animations
    const breath = Math.sin(time * 1.6) * 1.2;
    const breeze = Math.sin(time * 2.2) * 3.0;

    // Palette: Deep atmospheric midnight silhouette with moonlight rim highlights & warm watch glow
    const silhouetteDark = '#030611';
    const coatDark = '#070d1c';
    const beltDark = '#0a1426';
    const moonlightRim = 'rgba(195, 225, 255, 0.75)';
    const goldTrim = '#c4a44d';

    // 1. Soft Ground Shadow on Dock Planks
    ctx.fillStyle = 'rgba(1, 3, 8, 0.85)';
    ctx.beginPath();
    ctx.ellipse(0, 4, 38, 12, -0.05, 0, Math.PI * 2);
    ctx.fill();

    // 2. Leather Pirate Boots & Legs
    // Left Leg & Boot
    ctx.fillStyle = silhouetteDark;
    ctx.beginPath();
    ctx.moveTo(-18, 0);
    ctx.quadraticCurveTo(-26, -20, -22, -45);
    ctx.quadraticCurveTo(-15, -55, -8, -60);
    ctx.lineTo(-2, -60);
    ctx.quadraticCurveTo(-8, -35, -5, -20);
    ctx.lineTo(-4, 0);
    ctx.closePath();
    ctx.fill();

    // Boot cuff left
    ctx.beginPath();
    ctx.moveTo(-25, -42);
    ctx.quadraticCurveTo(-15, -46, -6, -42);
    ctx.quadraticCurveTo(-10, -32, -23, -32);
    ctx.closePath();
    ctx.fill();

    // Right Leg & Boot
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.quadraticCurveTo(0, -20, 4, -45);
    ctx.quadraticCurveTo(12, -55, 18, -60);
    ctx.lineTo(26, -60);
    ctx.quadraticCurveTo(22, -35, 18, -20);
    ctx.lineTo(18, 0);
    ctx.closePath();
    ctx.fill();

    // Boot cuff right
    ctx.beginPath();
    ctx.moveTo(2, -42);
    ctx.quadraticCurveTo(13, -46, 22, -42);
    ctx.quadraticCurveTo(17, -32, 4, -32);
    ctx.closePath();
    ctx.fill();

    // Boot outlines
    ctx.strokeStyle = moonlightRim;
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(-25, -18); ctx.quadraticCurveTo(-22, -2, -18, 0);
    ctx.moveTo(0, -18); ctx.quadraticCurveTo(3, -2, 6, 0);
    ctx.stroke();

    // 3. Flowing Coat Tails
    ctx.fillStyle = coatDark;

    // Left Coat Tail
    ctx.beginPath();
    ctx.moveTo(-16, -62);
    ctx.quadraticCurveTo(-42 + breeze, -48, -48 + breeze * 1.2, -20);
    ctx.quadraticCurveTo(-32 + breeze * 0.8, -12, -18, -18);
    ctx.quadraticCurveTo(-14, -38, -10, -58);
    ctx.closePath();
    ctx.fill();

    // Right Coat Tail
    ctx.beginPath();
    ctx.moveTo(12, -60);
    ctx.quadraticCurveTo(32 + breeze * 0.5, -42, 28 + breeze * 0.7, -15);
    ctx.quadraticCurveTo(18, -12, 10, -22);
    ctx.quadraticCurveTo(8, -42, 2, -58);
    ctx.closePath();
    ctx.fill();

    // Moonlight highlight on coat edge
    ctx.strokeStyle = moonlightRim;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-16, -62);
    ctx.quadraticCurveTo(-42 + breeze, -48, -48 + breeze * 1.2, -20);
    ctx.stroke();

    // 4. Torso, Sash & Belt
    ctx.fillStyle = silhouetteDark;
    ctx.beginPath();
    ctx.moveTo(-20, -62 + breath * 0.3);
    ctx.quadraticCurveTo(-26, -90 + breath * 0.6, -24, -118 + breath);
    ctx.quadraticCurveTo(0, -122 + breath, 20, -118 + breath);
    ctx.quadraticCurveTo(22, -90 + breath * 0.6, 18, -62 + breath * 0.3);
    ctx.closePath();
    ctx.fill();

    // Waist Sash
    ctx.fillStyle = beltDark;
    ctx.beginPath();
    ctx.moveTo(-22, -72 + breath * 0.3);
    ctx.quadraticCurveTo(0, -68 + breath * 0.3, 20, -72 + breath * 0.3);
    ctx.lineTo(19, -62 + breath * 0.3);
    ctx.quadraticCurveTo(0, -58 + breath * 0.3, -21, -62 + breath * 0.3);
    ctx.closePath();
    ctx.fill();

    // Belt Buckle (Simple Path, No Symbols)
    ctx.strokeStyle = goldTrim;
    ctx.lineWidth = 1.6;
    ctx.strokeRect(-5, -71 + breath * 0.3, 10, 10);

    // Diagonal Baldric Strap
    ctx.strokeStyle = '#050a14';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(16, -114 + breath);
    ctx.lineTo(-18, -66 + breath * 0.3);
    ctx.stroke();

    // Cutlass Scabbard & Guard Hilt
    ctx.strokeStyle = silhouetteDark;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-18, -66);
    ctx.lineTo(-38, -12);
    ctx.stroke();

    ctx.strokeStyle = goldTrim;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(-20, -68, 6, 0, Math.PI * 2);
    ctx.stroke();

    // 5. Left Arm
    ctx.fillStyle = silhouetteDark;
    ctx.beginPath();
    ctx.moveTo(-24, -116 + breath);
    ctx.quadraticCurveTo(-36, -95 + breath * 0.5, -28, -72 + breath * 0.2);
    ctx.quadraticCurveTo(-20, -72, -18, -108 + breath);
    ctx.closePath();
    ctx.fill();

    // Left Shoulder Rim Highlight
    ctx.strokeStyle = moonlightRim;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-24, -116 + breath);
    ctx.quadraticCurveTo(-36, -95 + breath * 0.5, -28, -72 + breath * 0.2);
    ctx.stroke();

    // 6. Right Arm & Cupped Hands
    ctx.fillStyle = silhouetteDark;
    ctx.beginPath();
    ctx.moveTo(18, -116 + breath);
    ctx.quadraticCurveTo(30, -100 + breath * 0.5, 24, -88 + breath * 0.2);
    ctx.quadraticCurveTo(12, -80, 2, -94 + breath * 0.3);
    ctx.lineTo(12, -110 + breath);
    ctx.closePath();
    ctx.fill();

    // Cupped Hands
    const handX = -2;
    const handY = -96 + breath * 0.3;

    ctx.fillStyle = '#0f1c30';
    ctx.beginPath();
    ctx.arc(handX, handY, 6, 0, Math.PI * 2);
    ctx.fill();

    // 7. Head & Tricorn Hat
    const headX = -2;
    const headY = -130 + breath;

    // Head Profile
    ctx.fillStyle = silhouetteDark;
    ctx.beginPath();
    ctx.arc(headX, headY, 12, 0, Math.PI * 2);
    ctx.fill();

    // Tricorn Hat
    ctx.fillStyle = '#02040b';
    ctx.beginPath();
    ctx.moveTo(headX - 26, headY - 2);
    ctx.quadraticCurveTo(headX - 6, headY + 2, headX + 22, headY - 1);
    ctx.quadraticCurveTo(headX + 18, headY - 28, headX, headY - 24);
    ctx.quadraticCurveTo(headX - 14, headY - 26, headX - 26, headY - 2);
    ctx.closePath();
    ctx.fill();

    // Gold Trim along Brim
    ctx.strokeStyle = goldTrim;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // Moonlight Rim Lighting across Hat Crown & Shoulder
    ctx.strokeStyle = moonlightRim;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(headX - 26, headY - 2);
    ctx.quadraticCurveTo(headX - 14, headY - 26, headX, headY - 24);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(headX - 14, headY + 6);
    ctx.quadraticCurveTo(headX - 22, headY + 14, -24, -116 + breath);
    ctx.stroke();

    // 8. GOLDEN WATCH GLINT & AMBER ILLUMINATION
    const glintFlicker = 0.78 + 0.22 * Math.sin(time * 3.5) + 0.1 * Math.sin(time * 6.0);

    // Warm Golden Radial Ambient Light
    const watchGlow = ctx.createRadialGradient(
      handX, handY, 1,
      handX, handY, 28
    );
    watchGlow.addColorStop(0.0, `rgba(255, 220, 120, ${0.60 * glintFlicker})`);
    watchGlow.addColorStop(0.4, `rgba(230, 165, 45, ${0.28 * glintFlicker})`);
    watchGlow.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = watchGlow;
    ctx.beginPath();
    ctx.arc(handX, handY, 28, 0, Math.PI * 2);
    ctx.fill();

    // Golden Watch Specular Sparkle in Cupped Hands
    ctx.fillStyle = `rgba(255, 245, 190, ${0.90 * glintFlicker})`;
    ctx.beginPath();
    ctx.arc(handX - 1, handY - 1, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Golden Ambient Light Reflection on bowed face
    ctx.strokeStyle = `rgba(255, 210, 110, ${0.65 * glintFlicker})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(headX, headY, 12, Math.PI * 0.28, Math.PI * 0.62);
    ctx.stroke();

    ctx.restore();
  }
}
