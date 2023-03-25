import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import "./styles.css";
import SimpleWhiteBoard from "simple-white-board";
import Controls from "./Controls";

const WIDTH = Math.min(
  typeof window !== "undefined" ? window.screen.width * 0.8 : 500,
  500
);

export interface ReactSimpleWhiteBoardProps {
}

const ReactSimpleWhiteBoard = React.forwardRef<HTMLCanvasElement>((props: ReactSimpleWhiteBoardProps, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const whiteBoard = useRef<SimpleWhiteBoard>();

  useImperativeHandle(ref, () => canvasRef.current as HTMLCanvasElement, []);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("#000000");

  useEffect(() => {
    if (!canvasRef.current) return;

    whiteBoard.current = new SimpleWhiteBoard(canvasRef.current);

    return () => {
      if (whiteBoard.current) {
        whiteBoard.current.dispose();
      }
    }
  }, []);

  useEffect(() => {
    if (!whiteBoard.current) return;

    whiteBoard.current.setLineColor(lineColor);
    whiteBoard.current.setLineWidth(lineWidth);
  }, [lineColor, lineWidth]);

  return (
    <div className="react-simple-white-board">
      <Controls
        lineColor={lineColor}
        lineWidth={lineWidth}
        setLineColor={setLineColor}
        setLineWidth={setLineWidth}
      />
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={WIDTH}
      />
      <button onClick={() => whiteBoard.current?.erase()}>Erase</button>
    </div>
  );
});

export default ReactSimpleWhiteBoard;
