// PirateLayer.ts - Renders the main foreground pirate subject looking down at his mysterious watch

export class PirateLayer {
  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    ctx.save();

    // Position pirate on dock (Right Foreground)
    const px = width * 0.88; // Center X of pirate
    const py = height * 0.718; // Feet level on the dock

    // Scale pirate proportionally to screen height
    const scale = Math.max(0.68, Math.min(1.15, height / 820));

    ctx.translate(px, py);
    ctx.scale(scale, scale);

    // Subtle breathing & wind animations
    const breath = Math.sin(time * 1.5) * 1.5;
    const coatBreeze = Math.sin(time * 2.2) * 3.5;

    // Palette (Dark pirate silhouette with moonlight rim highlights & golden watch glint)
    const silhouetteColor = '#030712';
    const coatColor = '#081224';
    const highlightMoon = 'rgba(200, 230, 255, 0.65)';

    // 1. Drop Shadow on Dock Surface
    ctx.fillStyle = 'rgba(1, 3, 7, 0.75)';
    ctx.beginPath();
    ctx.ellipse(0, 5, 34, 10, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // 2. Leather Boots & Legs (3/4 Back Pose)
    // Left Leg / Boot
    ctx.fillStyle = silhouetteColor;
    ctx.beginPath();
    ctx.moveTo(-18, 0);
    ctx.lineTo(-24, -22);
    ctx.lineTo(-14, -60);
    ctx.lineTo(-4, -60);
    ctx.lineTo(-8, -20);
    ctx.lineTo(-5, 0);
    ctx.closePath();
    ctx.fill();

    // Right Leg / Boot (Stepped forward slightly)
    ctx.beginPath();
    ctx.moveTo(4, 0);
    ctx.lineTo(0, -22);
    ctx.lineTo(8, -62);
    ctx.lineTo(18, -62);
    ctx.lineTo(14, -20);
    ctx.lineTo(18, 0);
    ctx.closePath();
    ctx.fill();

    // Boot cuffs & turn-downs
    ctx.fillRect(-22, -42, 14, 8);
    ctx.fillRect(4, -44, 14, 8);

    // Boot moonlight rim highlights
    ctx.strokeStyle = highlightMoon;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-24, -22); ctx.lineTo(-18, 0);
    ctx.moveTo(0, -22); ctx.lineTo(4, 0);
    ctx.stroke();

    // 3. Flowing Coat Tails / Frock Coat
    ctx.fillStyle = coatColor;
    ctx.beginPath();
    ctx.moveTo(-20, -60);
    // Left tail blowing in sea breeze
    ctx.quadraticCurveTo(-48 + coatBreeze, -35, -40 + coatBreeze * 0.8, -10);
    ctx.quadraticCurveTo(-22, -15, -10, -55);
    // Right tail
    ctx.moveTo(10, -55);
    ctx.quadraticCurveTo(26, -25, 21 + coatBreeze * 0.5, -8);
    ctx.quadraticCurveTo(12, -20, 2, -58);
    ctx.closePath();
    ctx.fill();

    // Coat Tail Rim Light Highlight
    ctx.strokeStyle = highlightMoon;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(-20, -60);
    ctx.quadraticCurveTo(-48 + coatBreeze, -35, -40 + coatBreeze * 0.8, -10);
    ctx.stroke();

    // 4. Torso / Coat Body & Waist Belt
    ctx.fillStyle = silhouetteColor;
    ctx.beginPath();
    ctx.moveTo(-22, -60 + breath * 0.3);
    ctx.lineTo(-26, -115 + breath);
    ctx.lineTo(18, -115 + breath);
    ctx.lineTo(16, -60 + breath * 0.3);
    ctx.closePath();
    ctx.fill();

    // Leather Belt & Baldric / Sword Scabbard
    ctx.fillStyle = '#0b1628';
    ctx.fillRect(-23, -68 + breath * 0.3, 40, 7);

    // Weathered Brass Belt Buckle
    ctx.strokeStyle = '#b39442';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(-4, -70 + breath * 0.3, 8, 10);

    // Cutlass Scabbard extending down left hip
    ctx.strokeStyle = silhouetteColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-18, -68);
    ctx.lineTo(-38, -15);
    ctx.stroke();

    // Cutlass Guard Hilt (Gold / Brass)
    ctx.strokeStyle = '#b39442';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-20, -70, 6, 0, Math.PI * 2);
    ctx.stroke();

    // 5. Left Arm (At side)
    ctx.fillStyle = silhouetteColor;
    ctx.beginPath();
    ctx.moveTo(-24, -112 + breath);
    ctx.quadraticCurveTo(-34, -90 + breath * 0.5, -26, -68 + breath * 0.2);
    ctx.quadraticCurveTo(-20, -68, -18, -105 + breath);
    ctx.closePath();
    ctx.fill();

    // Left Shoulder Seam Highlight
    ctx.strokeStyle = highlightMoon;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-24, -112 + breath);
    ctx.lineTo(-28, -98 + breath * 0.8);
    ctx.stroke();

    // 6. Right Arm & Cupped Hand (Holding & Inspecting Watch)
    // Shoulder to elbow
    ctx.fillStyle = silhouetteColor;
    ctx.beginPath();
    ctx.moveTo(16, -112 + breath);
    ctx.quadraticCurveTo(28, -98 + breath * 0.5, 22, -88 + breath * 0.2); // Elbow
    ctx.quadraticCurveTo(12, -82, 0, -96 + breath * 0.3); // Raised hand in front of chest
    ctx.lineTo(10, -110 + breath);
    ctx.closePath();
    ctx.fill();

    // Sleeve Cuff
    ctx.fillStyle = '#0a1426';
    ctx.fillRect(0, -98 + breath * 0.3, 8, 8);

    // Cupped Hand Position
    const handX = -2;
    const handY = -97 + breath * 0.3;

    ctx.fillStyle = '#122036';
    ctx.beginPath();
    ctx.arc(handX, handY, 5, 0, Math.PI * 2);
    ctx.fill();

    // 7. Head & Tricorn Hat (3/4 Back Pose, Tilted Downward toward hand)
    const headX = -2;
    const headY = -128 + breath;

    // Head / Neck Silhouette
    ctx.fillStyle = silhouetteColor;
    ctx.beginPath();
    ctx.arc(headX, headY, 11, 0, Math.PI * 2);
    ctx.fill();

    // Tricorn Hat (Classic Captain's Silhouette)
    ctx.fillStyle = '#02050e';
    ctx.beginPath();
    // Front brim curve
    ctx.moveTo(headX - 22, headY - 4);
    ctx.quadraticCurveTo(headX, headY - 10, headX + 20, headY - 2);
    // Right brim turn-up
    ctx.quadraticCurveTo(headX + 16, headY - 24, headX + 2, headY - 22);
    // Back brim turn-up
    ctx.quadraticCurveTo(headX - 10, headY - 24, headX - 22, headY - 4);
    ctx.closePath();
    ctx.fill();

    // Tricorn Gold Trim / Edge Braid
    ctx.strokeStyle = '#a68c3e';
    ctx.lineWidth = 1.3;
    ctx.stroke();

    // Moonlight Rim Lighting along Hat & Back Shoulder
    ctx.strokeStyle = highlightMoon;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(headX - 22, headY - 4);
    ctx.quadraticCurveTo(headX - 10, headY - 24, headX + 2, headY - 22);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(headX - 12, headY + 5);
    ctx.lineTo(-24, -112 + breath);
    ctx.stroke();

    // 8. THE MYSTERIOUS GOLDEN WATCH GLINT / LIGHT
    // Warm golden ambient illumination emitted from hand onto coat cuff & face
    const glintFlicker = 0.75 + 0.25 * Math.sin(time * 3.8) + 0.1 * Math.sin(time * 6.5);

    // Radial Golden Ambient Glow around hand
    const watchGlow = ctx.createRadialGradient(
      handX, handY, 1,
      handX, handY, 26
    );
    watchGlow.addColorStop(0, `rgba(255, 225, 130, ${0.55 * glintFlicker})`);
    watchGlow.addColorStop(0.35, `rgba(235, 175, 55, ${0.28 * glintFlicker})`);
    watchGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = watchGlow;
    ctx.beginPath();
    ctx.arc(handX, handY, 26, 0, Math.PI * 2);
    ctx.fill();

    // Subtle Golden Specular Reflection Point in Hand
    ctx.fillStyle = `rgba(255, 240, 180, ${0.85 * glintFlicker})`;
    ctx.beginPath();
    ctx.arc(handX - 1, handY - 1, 2, 0, Math.PI * 2);
    ctx.fill();

    // Warm Light Rim Reflection on Face Silhouette looking down
    ctx.strokeStyle = `rgba(255, 215, 120, ${0.7 * glintFlicker})`;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(headX, headY, 11, Math.PI * 0.25, Math.PI * 0.65);
    ctx.stroke();

    ctx.restore();
  }
}
