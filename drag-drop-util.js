class DragDropUtil {
  constructor() {
    document.addEventListener("mousemove", this.onMouseMove);

    document.addEventListener("mouseup", (evnt) => {
      document.body.style.cursor = "initial";
    });
    window.addEventListener("mouseup", (e) => {
      document
        .querySelectorAll("[id='drag-element']")
        .forEach((item) => item.remove());
    });
  }

  onMouseDown(event) {
    const ball = document.createElement("div");
    ball.setAttribute("id", "drag-element");
    ball.innerHTML = `<div 
      ></div>`;

    document.body.append(ball);
    ball.style.position = "absolute";
    ball.style.zIndex = 1000;
    ball.style.width = "200px";
    ball.style.height = "200px";
    ball.style.background = "yellow";
    // centers the ball at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
      ball.style.left = pageX - ball.offsetWidth / 2 + "px";
      ball.style.top = pageY - ball.offsetHeight / 2 + "px";
    }

    // move our absolutely positioned ball under the pointer
    moveAt(event.pageX, event.pageY);
    let currentDroppable = null;

    function onMouseMove(e) {
      ball.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      ball.hidden = false;

      console.log("elembelow", elemBelow);
      moveAt(e.pageX, e.pageY);
    }

    // (2) move the ball on mousemove
    document.addEventListener("mousemove", onMouseMove);

    // (3) drop the ball, remove unneeded handlers
    ball.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      ball.onmouseup = null;
    };
  }

  onMouseMove(event) {
    const ball = document.getElementById("drag-element");
    if (ball) {
      ball.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      ball.hidden = false;

      console.log("elembelow", elemBelow);
      if (elemBelow?.id === "allowed") {
        document.body.style.cursor = "copy";
      } else if (elemBelow.id === "not-allowed") {
        document.body.style.cursor = "no-drop";
      } else {
        document.body.style.cursor = "grabbing";
      }
      moveAt(event.pageX, event.pageY);
      function moveAt(pageX, pageY) {
        const ball = document.getElementById("drag-element");

        ball.style.left = pageX - ball.offsetWidth / 2 + "px";
        ball.style.top = pageY - ball.offsetHeight / 2 + "px";
      }
    }
  }
}
