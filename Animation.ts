class CanvasDrawer {
  elements: { x: number; y: number; xValue: number; yValue: number }[] = [];

  private readonly context: CanvasRenderingContext2D;

  myEvent: any;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext("2d");
    setCount(this.elements.length | 0);
    this.initializeCanvasElements();
  }

  /// Add default elements
  private initializeCanvasElements() {
    this.elements = [
      { x: 20, y: 20, xValue: 3, yValue: 4 },
      { x: 60, y: 40, xValue: 4, yValue: 6 },
      { x: 100, y: 90, xValue: 6, yValue: 7 }
    ];
  }


  /// Performs rendering for all the elements presents in elements array
  renderBouncingBalls(): void {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.elements.forEach(e => {
      this.drawIndividualCircle(e);
    });
  }


  /// Draws one element at a time on Canvas
  private drawIndividualCircle(e: {
    x: number;
    y: number;
    xValue: number;
    yValue: number;
  }) {
    this.context.fillStyle = "#D40000";
    this.context.beginPath();
    this.context.arc(e.x, e.y, 15, 0, 2 * Math.PI);
    this.context.fill();
    if (e.y >= canvas.height - 15) {
      e.yValue = -4;
    }
    if (e.y <= 15) {
      e.yValue = 4;
    }
    if (e.x <= 15) {
      e.xValue = 3;
    }
    if (e.x >= canvas.width - 15) {
      e.xValue = -3;
    }
    e.x = e.x + e.xValue;
    e.y = e.y + e.yValue;
  }

  /// Triggers the animation and fixes the refresh rate for rendering
  startAnimation(): void {
    stopAnimation();
    setCount(this.elements.length);
    window.requestAnimationFrame(() => this.renderBouncingBalls());
    this.myEvent = setInterval(
      () => window.requestAnimationFrame(() => this.renderBouncingBalls()),
      50
    );
  }

  /// Stops the animation
  stopAnimation(): void {
    if (this.myEvent != undefined) clearInterval(this.myEvent);
  }
}

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
let cd = new CanvasDrawer(canvas);

/// Starts the animation when Start button is clicked
function startAnimation() {
  cd.startAnimation();
}

/// Push new element when add button is clicked
function addMoreElements() {
  if (cd.myEvent != undefined && cd.myEvent != null) {
    cd.elements.push({ x: 100, y: 90, xValue: 6, yValue: 7 });
    setCount(cd.elements.length);
  }
}

/// Stops the animation when Pause button is clicked
function stopAnimation() {
  cd.stopAnimation();
  if (cd.myEvent != undefined && cd.myEvent != null) {
    cd.myEvent = undefined;
  }
}

function setCount(elementCount) {
  document.getElementById("lblTotal").innerHTML = elementCount;
}
