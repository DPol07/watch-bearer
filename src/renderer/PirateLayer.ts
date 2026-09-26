// PirateLayer.ts - Renders the main foreground pirate subject looking down at his mysterious watch

export class PirateLayer {
  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    ctx.save();

    // Position pirate on the dock (Right Side, balanced with new dock position)
    // Dock top is around y = height * 0.72
    const px = width * 0.88; // Center X of pirate
    const py = height * 0.725; // Feet level on the dock

    // Scale pirate proportionally to screen height
    const scale = Math.max(0.65, Math.min(1.1, height / 850));

    ctx.translate(px, py);
    ctx.scale(scale, scale);

    // Dynamic subtle breathing & cloak breeze animation
    const breath = Math.sin(time * 1.5) * 1.5;
    const coatBreeze = Math.sin(time * 2.2) * 3;

    // Palette (Rich dark pirate tones with moonlight rim highlights & golden watch glint)
    const silhouetteColor = '#030710';
    const coatColor = '#071020';
    const highlightMoon = 'rgba(195, 225, 255, 0.6)';

    // 1. Drop Shadow on Dock
    ctx.fillStyle = 'rgba(1, 3, 8, 0.7)';
    ctx.beginPath();
    ctx.ellipse(0, 5, 32, 10, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // 2. High Pirate Boots & Legs (3/4 Back Pose, Right foot slightly forward)
    // Left Boot
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

    // Right Boot (Forward foot)
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

    // Boot rim moonlight highlights
    ctx.strokeStyle = highlightMoon;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-24, -22); ctx.lineTo(-18, 0);
    ctx.moveTo(0, -22); ctx.lineTo(4, 0);
    ctx.stroke();

    // 3. Coat Tails / Frock Coat (Flowing in wind)
    ctx.fillStyle = coatColor;
    ctx.beginPath();
    ctx.moveTo(-20, -60);
    // Left tail blowing outwards
    ctx.quadraticCurveTo(-45 + coatBreeze, -35, -38 + coatBreeze * 0.8, -10);
    ctx.quadraticCurveTo(-22, -15, -10, -55);
    // Right tail
    ctx.moveTo(10, -55);
    ctx.quadraticCurveTo(25, -25, 20 + coatBreeze * 0.5, -8);
    ctx.quadraticCurveTo(12, -20, 2, -58);
    ctx.closePath();
    ctx.fill();

    // Coat Tail Edges Rim Light
    ctx.strokeStyle = highlightMoon;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-20, -60);
    ctx.quadraticCurveTo(-45 + coatBreeze, -35, -38 + coatBreeze * 0.8, -10);
    ctx.stroke();

    // 4. Main Torso / Coat Body & Belt
    ctx.fillStyle = silhouetteColor;
    ctx.beginPath();
    ctx.moveTo(-22, -60 + breath * 0.3);
    ctx.lineTo(-26, -115 + breath);
    ctx.lineTo(18, -115 + breath);
    ctx.lineTo(16, -60 + breath * 0.3);
    ctx.closePath();
    ctx.fill();

    // Waist Belt & Baldric / Sword Scabbard
    ctx.fillStyle = '#0a1424';
    ctx.fillRect(-23, -68 + breath * 0.3, 40, 7);

    // Belt Buckle (Dark Brass / Gold)
    ctx.strokeStyle = '#a88938';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(-4, -70 + breath * 0.3, 8, 10);

    // Sword Scabbard extending down left hip
    ctx.strokeStyle = silhouetteColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-18, -68);
    ctx.lineTo(-38, -15);
    ctx.stroke();

    // Sword Hilt / Cutlass Basket Guard
    ctx.strokeStyle = '#a88938';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-20, -70, 6, 0, Math.PI * 2);
    ctx.stroke();

    // 5. Left Arm (Rests at side or holding coat edge)
    ctx.fillStyle = silhouetteColor;
    ctx.beginPath();
    ctx.moveTo(-24, -112 + breath);
    ctx.quadraticCurveTo(-34, -90 + breath * 0.5, -26, -68 + breath * 0.2);
    ctx.quadraticCurveTo(-20, -68, -18, -105 + breath);
    ctx.closePath();
    ctx.fill();

    // Left Shoulder Epaulet / Seam Highlight
    ctx.strokeStyle = highlightMoon;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-24, -112 + breath);
    ctx.lineTo(-28, -98 + breath * 0.8);
    ctx.stroke();

    // 6. Right Arm & Raised Hand (Inspecting the Watch)
    // Shoulder to elbow
    ctx.fillStyle = silhouetteColor;
    ctx.beginPath();
    ctx.moveTo(16, -112 + breath);
    ctx.quadraticCurveTo(28, -98 + breath * 0.5, 22, -88 + breath * 0.2); // Elbow
    ctx.quadraticCurveTo(12, -82, 0, -96 + breath * 0.3); // Hand raised in front of chest
    ctx.lineTo(10, -110 + breath);
    ctx.closePath();
    ctx.fill();

    // Cuff of sleeve
    ctx.fillStyle = '#091222';
    ctx.fillRect(0, -98 + breath * 0.3, 8, 8);

    // Raised Hand (Cupped, looking down)
    const handX = -2;
    const handY = -97 + breath * 0.3;

    ctx.fillStyle = '#101c30';
    ctx.beginPath();
    ctx.arc(handX, handY, 5, 0, Math.PI * 2);
    ctx.fill();

    // 7. Head & Tricorn Hat (3/4 Back Pose, Tilted Downwards toward hand)
    const headX = -2;
    const headY = -128 + breath;

    // Head / Neck Silhouette
    ctx.fillStyle = silhouetteColor;
    ctx.beginPath();
    ctx.arc(headX, headY, 11, 0, Math.PI * 2);
    ctx.fill();

    // Tricorn Hat (Distinctive pirate silhouette)
    ctx.fillStyle = '#02050c';
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

    // Tricorn Hat Gold Trim / Lace
    ctx.strokeStyle = '#997e36';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Moonlight Rim Lighting along Hat and Back Shoulder
    ctx.strokeStyle = highlightMoon;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(headX - 22, headY - 4);
    ctx.quadraticCurveTo(headX - 10, headY - 24, headX + 2, headY - 22);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(headX - 12, headY + 5);
    ctx.lineTo(-24, -112 + breath);
    ctx.stroke();

    // 8. THE MYSTERIOUS GOLDEN WATCH GLINT / LIGHT
    // Subtle, mysterious warm golden light emitted from hand onto cuff & face silhouette
    const glintFlicker = 0.7 + 0.3 * Math.sin(time * 3.5) + 0.1 * Math.sin(time * 7.1);

    // Radial Golden Ambient Glow around hand
    const watchGlow = ctx.createRadialGradient(
      handX, handY, 1,
      handX, handY, 28
    );
    watchGlow.addColorStop(0, `rgba(255, 220, 120, ${0.5 * glintFlicker})`);
    watchGlow.addColorStop(0.3, `rgba(230, 170, 50, ${0.25 * glintFlicker})`);
    watchGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = watchGlow;
    ctx.beginPath();
    ctx.arc(handX, handY, 28, 0, Math.PI * 2);
    ctx.fill();

    // Warm Light Reflection on Hand & Sleeve Cuff
    ctx.fillStyle = `rgba(255, 235, 170, ${0.8 * glintFlicker})`;
    ctx.beginPath();
    ctx.arc(handX - 1, handY - 1, 2, 0, Math.PI * 2);
    ctx.fill();

    // Warm Light Edge Highlight on Face Silhouette looking down at hand
    ctx.strokeStyle = `rgba(255, 210, 110, ${0.65 * glintFlicker})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(headX, headY, 11, Math.PI * 0.25, Math.PI * 0.65);
    ctx.stroke();

    ctx.restore();
  }
}
