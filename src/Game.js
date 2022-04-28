import { useEffect, useState } from "react";
import "./Game.scss";
import woodLog from "./assets/images/wood-log.png";
import { AiOutlineArrowUp } from "react-icons/ai";

function Game() {
  const [heroJump, setHeroJump] = useState(false);
  const [heroMove, setHeroMove] = useState(false);
  const [woodMove, setWoodMove] = useState(false);
  const [groundMove, setGroundMove] = useState(false);
  const [startScreen, setStartScreen] = useState(true);
  const [isDead, setIsDead] = useState(false);
  let [score, setScore] = useState(0);

  useEffect(() => {
    window.addEventListener("keydown", checkKeys);
  }, []);

  const jumping = () => {
    setHeroJump(true);
    setTimeout(() => setHeroJump(false), 400);
  };

  const startGame = () => {
    console.log("Game start!");
    setScore(0);
    setGroundMove(true);
    setHeroMove(true);
    setWoodMove(true);
    setStartScreen(false);
    checkDead();
  };

  const checkKeys = (e) => {
    if (e.keyCode === 32 || e.keyCode === 38) {
      if (heroJump === false) {
        jumping();
      } else return;
    } else if (e.keyCode === 13 && isDead === false) {
      startGame();
    } else return;
  };

  const checkDead = () => {
    const hero = document.querySelector(".hero");
    const log = document.querySelector(".wood-log");
    const ground = document.querySelector(".ground");

    const checkIsAlive = () =>
      setInterval(() => {
        const heroBottom = parseInt(
          window.getComputedStyle(hero).getPropertyValue("bottom")
        );
        const woodLeftSide = parseInt(
          window.getComputedStyle(log).getPropertyValue("left")
        );
        if (woodLeftSide < 180 && woodLeftSide > 60 && heroBottom <= 150) {
          setHeroMove(false);
          setIsDead(true);
          // setGroundMove(false);
          log.style.animationPlayState = "paused";
          ground.style.animationPlayState = "paused";
          clearInterval(checkIsAlive);
          setTimeout(() => {
            document.location.reload();
            startGame();
            alert(`Game Over! You score is ${score}! Click OK and try again!`);
          }, 200);
        }

        const woodPosition = log.getBoundingClientRect();
        if (woodPosition.right <= 10) {
          // DZIAŁA CAŁKIEM NIEŹLE
          setScore((score = score + 1));
        }
      }, 15);
    checkIsAlive();
  };

  return (
    <div className="world" onKeyDown={() => checkKeys}>
      <div className="score">Score: {score}</div>
      <div className="space-bar">
        <span>space bar</span> or{" "}
        <span className="arrow">
          <AiOutlineArrowUp />
        </span>{" "}
        = jump
      </div>
      <div className="title">Bushcraft Runner</div>
      <p className={`start-screen ${startScreen ? "" : "hide"}`}>
        Press Enter To Start
      </p>
      <div
        className={`hero
        ${heroJump ? "jump" : ""}
        ${heroMove ? "run" : ""}
        ${isDead ? "dead" : ""}`}
      ></div>
      <img
        className={`wood-log ${woodMove ? "log-move" : ""}`}
        src={woodLog}
        alt="character"
      />
      <div className={`ground ${groundMove ? "ground-move" : ""}`}></div>
    </div>
  );
}

export default Game;
