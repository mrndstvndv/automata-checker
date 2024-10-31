export const drawArrow = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number) => {
	var headlen = 10; // length of head in pixels
	var dx = endX - startX;
	var dy = endY - startY;
	var angle = Math.atan2(dy, dx);
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
	ctx.moveTo(endX, endY);
	ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
}

export const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, label: string = "") => {
	ctx.arc(x, y, 50, 0, 2 * Math.PI)
	ctx.stroke()

	if (label != null) {
		const textDimensions = ctx.measureText(label)

		ctx.fillText(label, x - (textDimensions.width / 2), y + 10)
	}

	drawArrow(ctx, x + 50, y, x + 100, y)
}
