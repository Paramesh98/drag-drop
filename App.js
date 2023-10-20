import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const data = [1, 2, 3, 4, 5];
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseMove, setMouseMove] = useState(false);

  const onMouseDown = (event) => {
    setMouseDown(true);
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
  };

  useEffect(() => {
    // window.addEventListener("mouseup", (e) => {
    //   document
    //     .querySelectorAll("[id='drag-element']")
    //     .forEach((item) => item.remove());
    // });
    // function moveAt(pageX, pageY) {
    //   const ball = document.getElementById("drag-element");
    //   ball.style.left = pageX - ball.offsetWidth / 2 + "px";
    //   ball.style.top = pageY - ball.offsetHeight / 2 + "px";
    // }
    // function onMouseMove(event) {
    //   const ball = document.getElementById("drag-element");
    //   if (ball) {
    //     ball.hidden = true;
    //     let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    //     ball.hidden = false;
    //     console.log("elembelow", elemBelow);
    //     if (elemBelow?.id === "allowed") {
    //       document.body.style.cursor = "copy";
    //     } else if (elemBelow.id === "not-allowed") {
    //       document.body.style.cursor = "no-drop";
    //     } else {
    //       document.body.style.cursor = "grabbing";
    //     }
    //     moveAt(event.pageX, event.pageY);
    //   }
    // }
    // document.addEventListener("mousemove", onMouseMove);
    // document.addEventListener("mouseup", (evnt) => {
    //   document.body.style.cursor = "initial";
    // });
    // (2) move the ball on mousemove
  }, []);

  return (
    <div id="drag-drop" style={{ position: "relative" }}>
      <div
        style={{ display: "flex", justifyContent: "space-around" }}
        className="App"
      >
        {data.map((item, key) => (
          <div
            key={key}
            onMouseDown={onMouseDown}
            style={{ width: "100px", height: "100px", background: "blue" }}
          ></div>
        ))}
      </div>
      <div>
        <div
          id="allowed"
          style={{
            width: "100%",
            height: "200px",
            marginTop: "200px",
            background: "blue",
          }}
        ></div>
      </div>

      <div>
        <div
          id="not-allowed"
          style={{
            width: "100%",
            height: "200px",
            marginTop: "00px",
            background: "orange",
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
