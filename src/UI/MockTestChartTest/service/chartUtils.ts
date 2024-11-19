export const calculateYPosition = (dimension: number, percentage: number): number => {
    switch (percentage) {
      case 100:
        return dimension - 98;
      case 0:
        return dimension - 3;
      default:
        return dimension - (percentage / 100) * dimension;
    }
  };
  
  

  const calculateControlPoints = (
    prev: { x: number; y: number },
    next: { x: number; y: number },
    factor: number
  ) => {
    const controlX1 = prev.x + (next.x - prev.x) * factor;
    const controlY1 = prev.y;
    const controlX2 = next.x - (next.x - prev.x) * factor;
    const controlY2 = next.y;
    return { controlX1, controlY1, controlX2, controlY2 };
  };

  const addSmoothSegment = (
    path: string,
    curr: { x: number; y: number },
    next: { x: number; y: number },
    factor: number
  ) => {
    const { controlX1, controlY1, controlX2, controlY2 } = calculateControlPoints(curr, next, factor);
    return `${path} C${controlX1},${controlY1} ${controlX2},${controlY2} ${next.x},${next.y}`;
  };

  export const generateVariableSmoothPath = (
    points: { x: number; y: number }[],
    dimensions: { maxX: number; maxY: number }
  ): string => {
  
    if (points.length < 2) return "";
  
    let path = `M${points[0].x},${dimensions.maxY}`;
  
    if (points.length > 2) {
      const zeroPoint = points[0];
      const firstPoint = points[1];
      const secondPoint = points[2];
  
      const { controlX1, controlY1, controlX2, controlY2 } = calculateControlPoints(zeroPoint, firstPoint, 0.1);
      path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${firstPoint.x},${firstPoint.y}`;
  
      path = addSmoothSegment(path, firstPoint, secondPoint, 1 / 3);
    } else {
      return `${path} L${points[1].x},${points[1].y}`;
    }
  
    for (let i = 3; i < points.length; i++) {
      const curr = points[i - 1];
      const next = points[i];
      const diffY = Math.abs(next.y - curr.y);
  
      if (diffY < 60) {
        path += ` L${next.x},${next.y}`;
      } else {
        path = addSmoothSegment(path, curr, next, 1 /3);
      }
    }
  
    return path;
  };
  