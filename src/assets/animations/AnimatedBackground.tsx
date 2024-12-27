import s from './AnimatedBackground.module.scss'
import React, { useEffect, useRef } from "react";

type Props = { className?: string };

export const AnimatedBackground = ({ className }: Props) => {
    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([null, null, null]);
    const config = {
        circle: {
            amount: 18,
            layer: 3,
            color: [157, 97, 207],
            alpha: 0.3,
        },
        line: {
            amount: 12,
            layer: 3,
            color: [255, 255, 255],
            alpha: 0.3,
        },
        speed: 0.5,
        angle: 20,
    };

    useEffect(() => {
        const background = canvasRefs.current[0];
        const foreground1 = canvasRefs.current[1];
        const foreground2 = canvasRefs.current[2];
        const M = Math;
        const degree = (config.angle / 360) * M.PI * 2;
        let circles: any[] = [];
        let lines: any[] = [];
        let wWidth = window.innerWidth;
        let wHeight = window.innerHeight;
        let timer: number;

        if (background && foreground1 && foreground2) {
            const bctx = background.getContext("2d");
            const fctx1 = foreground1.getContext("2d");
            const fctx2 = foreground2.getContext("2d");

            // Функции для рисования
            const drawCircle = (x: number, y: number, radius: number, color: number[], alpha: number) => {
                if (fctx1) {  // Проверяем, существует ли контекст
                    const gradient = fctx1.createRadialGradient(x, y, radius, x, y, 0);
                    gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${alpha})`);
                    gradient.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},${alpha - 0.1})`);

                    fctx1.beginPath();
                    fctx1.arc(x, y, radius, 0, M.PI * 2, true);
                    fctx1.fillStyle = gradient;
                    fctx1.fill();
                }
            };

            const drawLine = (x: number, y: number, width: number, color: number[], alpha: number) => {
                const endX = x + M.sin(degree) * width;
                const endY = y - M.cos(degree) * width;
                const gradient = fctx2?.createLinearGradient(x, y, endX, endY);
                if (fctx2 && gradient) {
                    gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${alpha})`);
                    gradient.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},${alpha - 0.1})`);

                    fctx2.beginPath();
                    fctx2.moveTo(x, y);
                    fctx2.lineTo(endX, endY);
                    fctx2.lineWidth = 3;
                    fctx2.lineCap = "round";
                    fctx2.strokeStyle = gradient;
                    fctx2.stroke();
                }
            };

            const drawBack = () => {
                if (bctx) {
                    bctx.clearRect(0, 0, wWidth, wHeight);

                    const gradient1 = bctx.createRadialGradient(wWidth * 0.3, wHeight * 0.1, 0, wWidth * 0.3, wHeight * 0.1, wWidth * 0.9);
                    gradient1.addColorStop(0, "rgb(0, 26, 77)");
                    gradient1.addColorStop(1, "transparent");

                    bctx.save();
                    bctx.fillStyle = gradient1;
                    bctx.fillRect(0, 0, wWidth, wHeight);
                    bctx.restore();
                }
            };

            const animate = () => {
                const sin = M.sin(degree);
                const cos = M.cos(degree);

                // Анимация кругов
                fctx1?.clearRect(0, 0, wWidth, wHeight);
                circles.forEach((circle) => {
                    const { x, y, radius, speed } = circle;  // Используем const

                    let newX = x;
                    let newY = y;

                    if (newX > wWidth + radius) {
                        newX = -radius;
                    } else if (newX < -radius) {
                        newX = wWidth + radius;
                    } else {
                        newX += sin * speed;
                    }

                    if (newY > wHeight + radius) {
                        newY = -radius;
                    } else if (newY < -radius) {
                        newY = wHeight + radius;
                    } else {
                        newY -= cos * speed;
                    }

                    circle.x = newX;
                    circle.y = newY;
                    drawCircle(newX, newY, radius, circle.color, circle.alpha);
                });

                // Анимация линий
                fctx2?.clearRect(0, 0, wWidth, wHeight);
                lines.forEach((line) => {
                    const { x, y, width, speed } = line;  // Используем const

                    let newX = x;
                    let newY = y;

                    if (newX > wWidth + width * M.sin(degree)) {
                        newX = -width * M.sin(degree);
                    } else if (newX < -width * M.sin(degree)) {
                        newX = wWidth + width * M.sin(degree);
                    } else {
                        newX += M.sin(degree) * speed;
                    }

                    if (newY > wHeight + width * M.cos(degree)) {
                        newY = -width * M.cos(degree);
                    } else if (newY < -width * M.cos(degree)) {
                        newY = wHeight + width * M.cos(degree);
                    } else {
                        newY -= M.cos(degree) * speed;
                    }

                    line.x = newX;
                    line.y = newY;
                    drawLine(newX, newY, width, line.color, line.alpha);
                });

                timer = requestAnimationFrame(animate);
            };

            const createItems = () => {
                circles = [];
                lines = [];

                for (let i = 0; i < config.circle.amount; i++) {
                    circles.push({
                        x: M.random() * wWidth,
                        y: M.random() * wHeight,
                        radius: M.random() * 20 + 20,
                        color: config.circle.color,
                        alpha: config.circle.alpha,
                        speed: config.speed,
                    });
                }

                for (let i = 0; i < config.line.amount; i++) {
                    lines.push({
                        x: M.random() * wWidth,
                        y: M.random() * wHeight,
                        width: M.random() * 20 + 20,
                        color: config.line.color,
                        alpha: config.line.alpha,
                        speed: config.speed,
                    });
                }

                cancelAnimationFrame(timer);
                requestAnimationFrame(animate);
                drawBack();
            };

            const setCanvasHeight = () => {
                wWidth = window.innerWidth;
                wHeight = window.innerHeight;

                [background, foreground1, foreground2].forEach((canvas) => {
                    if (canvas) {
                        canvas.width = wWidth;
                        canvas.height = wHeight;
                    }
                });
            };

            setCanvasHeight();
            createItems();

            window.addEventListener("resize", () => {
                setCanvasHeight();
                createItems();
            });
        }
    }, []);

    return (
        <div className={className}>
            <canvas
                ref={(el) => {
                    if (canvasRefs.current) {
                        canvasRefs.current[0] = el;
                    }
                }}
                className={s.canvasItem}
            />
            <canvas
                ref={(el) => {
                    if (canvasRefs.current) {
                        canvasRefs.current[1] = el;
                    }
                }}
                className={s.canvasItem}
            />
            <canvas
                ref={(el) => {
                    if (canvasRefs.current) {
                        canvasRefs.current[2] = el;
                    }
                }}
                className={s.canvasItem}
            />
        </div>
    );
};