import { Card, Text } from "@mantine/core";
import { type FC, type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./draggable-modal.module.scss";

type DraggableModalProps = {
  children: ReactNode;
  title?: string;
  initialPosition?: { x: number; y: number };
  width?: number;
  height?: number;
};

/**
 * ドラッグ可能なモーダルコンポーネント
 */
export const DraggableModal: FC<DraggableModalProps> = ({
  children,
  title,
  initialPosition = { x: 20, y: 20 },
  width = 200,
  height = 100,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // ドラッグ開始時の処理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  // ドラッグ中の処理
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  // ドラッグ終了時の処理
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // マウスイベントのリスナー設定
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={modalRef}
      className={styles.modal}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${width}px`,
        height: `${height}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <Card className={styles.card}>
        <div
          onMouseDown={handleMouseDown}
          className={styles.header}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <Text className={styles.text}>{title || "ドラッグして移動"}</Text>
        </div>
        <div className={styles.content}>{children}</div>
      </Card>
    </div>
  );
};
