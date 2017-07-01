"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//work in progress got visuals but logic is tricky
//check function and move1
function helpToggle() {
  if ($("#help").css("visibility") === "visible") {
    $("#help").css("visibility", "hidden");
  } else {
    $("#help").css("visibility", "visible");
  }
}

var lit;
var x;
var y;
var i;
var on;
var off;
var j = 0;
var round = 1;
var randomSeq = [];
var litID = [];
var clicked = [];

//CREATE SOUNDS FROM AUDIO API
//HELP FROM PIZZICATO JS
//NOTES: G3 C4 E4 G4 HOLD YOUR NOTES!
var greenSound = new Pizzicato.Sound({
  source: 'wave',
  options: {
    type: 'sine',
    frequency: 196,
    release: .75,
    attack: .5
  } });
var redSound = new Pizzicato.Sound({
  source: 'wave',
  options: {
    type: 'sine',
    frequency: 261.63,
    release: .75,
    attack: .5
  } });
var yellowSound = new Pizzicato.Sound({
  source: 'wave',
  options: {
    type: 'sine',
    frequency: 329.63,
    release: .75,
    attack: .5
  } });
var blueSound = new Pizzicato.Sound({
  source: 'wave',
  options: {
    type: 'sine',
    frequency: 392.00,
    release: .75,
    attack: .5
  } });

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      gameOn: false,
      winner: false,
      pushed: false,
      start: false,
      strict: false
    };
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleStrictMode = _this.handleStrictMode.bind(_this);
    _this.handleStartApp = _this.handleStartApp.bind(_this);
    _this.handleGame = _this.handleGame.bind(_this);
    _this.handleCheck = _this.handleCheck.bind(_this);
    return _this;
  }

  App.prototype.handleGame = function handleGame() {
    var red = $("#red"),
        yellow = $("#yellow"),
        green = $("#green"),
        blue = $("#blue");
    if (round >= 13) {
      off = 200;
      on = 400;
    } else if (round >= 9) {
      off = 300;
      on = 600;
    } else if (round >= 5) {
      off = 400;
      on = 800;
    } else {
      off = 500;
      on = 1000;
    }

    x = setInterval(function () {
      if (randomSeq[j] == 1) {

        lit = 'colorGreenPush';
        green.addClass(lit);
        greenSound.play();
        litID.push(1);

        setTimeout(function () {
          green.removeClass(lit);
          greenSound.stop();
        }, off);
      } else if (randomSeq[j] == 2) {

        lit = 'colorRedPush';
        red.addClass(lit);
        redSound.play();
        litID.push(2);

        setTimeout(function () {
          red.removeClass(lit);
          redSound.stop();
        }, off);
      } else if (randomSeq[j] == 3) {

        lit = 'colorYellowPush';
        yellow.addClass(lit);
        yellowSound.play();
        litID.push(3);

        setTimeout(function () {
          yellow.removeClass(lit);
          yellowSound.stop();
        }, off);
      } else if (randomSeq[j] == 4) {

        lit = 'colorBluePush';
        blue.addClass(lit);
        blueSound.play();
        litID.push(4);

        setTimeout(function () {
          blue.removeClass(lit);
          blueSound.stop();
        }, off);
      }
      j++;
      if (j >= round) {
        clearInterval(x);
      }
    }, on);
  };

  App.prototype.handleCheck = function handleCheck() {
    var display = $("#display");
    if (litID.length == clicked.length) {
      if (litID.join() == clicked.join()) {
        if (round == 20) {
          setTimeout(function () {
            alert("Unreal. You Acually Won!!!");
            location.reload();
          }, 1000);
        } else {
          setTimeout(function () {
            display.text("-" + (round + 1) + "-");
            round++;
            console.log(this);
            litID = [];
            clicked = [];
            j = 0;
            this.App.prototype.handleGame();
          }, 1000);
        }
      } else {
        if (this.state.strict) {
          display.text("LOSE");
          setTimeout(function () {
            location.reload();
          }, 2000);
        } else {
          setTimeout(function () {
            display.text("!!!!");
            litID = [];
            clicked = [];
            j = 0;
            this.App.prototype.handleGame();
          }, 1000);
        }
      }
    }
  };

  App.prototype.handleMouseDown = function handleMouseDown(e) {
    if (e.target.id === "green") {
      $("#green").addClass("colorGreenPush");
      greenSound.play();
      clicked.push(1);
      this.handleCheck();
    } else if (e.target.id === "red") {
      $("#red").addClass("colorRedPush");
      redSound.play();
      clicked.push(2);
      this.handleCheck();
    } else if (e.target.id === "yellow") {
      $("#yellow").addClass("colorYellowPush");
      yellowSound.play();
      clicked.push(3);
      this.handleCheck();
    } else if (e.target.id === "blue") {
      $("#blue").addClass("colorBluePush");
      blueSound.play();
      clicked.push(4);
      this.handleCheck();
    }
  };

  App.prototype.handleMouseUp = function handleMouseUp(e) {
    if (e.target.id === "green") {
      $("#green").removeClass("colorGreenPush");
      greenSound.stop();
    } else if (e.target.id === "red") {
      $("#red").removeClass("colorRedPush");
      redSound.stop();
    } else if (e.target.id === "yellow") {
      $("#yellow").removeClass("colorYellowPush");
      yellowSound.stop();
    } else if (e.target.id === "blue") {
      $("#blue").removeClass("colorBluePush");
      blueSound.stop();
    }
  };

  App.prototype.handleClick = function handleClick() {
    this.setState({
      gameOn: !this.state.gameOn,
      strict: false,
      start: false
    });
    for (i = 0; i < 20; i++) {
      randomSeq[i] = Math.ceil(Math.random() * 4);
    }
  };

  App.prototype.handleStrictMode = function handleStrictMode() {
    this.setState({
      strict: !this.state.strict
    });
  };

  App.prototype.handleStartApp = function handleStartApp() {
    this.setState({
      start: true
    });
    $("#display").text("-" + round + "-");
    this.handleGame();
  };

  App.prototype.render = function render() {
    var colorClasses = ["colorGreen pad untouchable", "colorRed pad untouchable", "colorYellow pad untouchable", "colorBlue pad untouchable"];

    if (this.state.gameOn) {
      $("input[type='checkbox']").prop("checked", true);
      $("#strict").removeClass("untouchable");
      $("#start").removeClass("untouchable");
      $(".pad").removeClass("untouchable");
      $("#display").css({ "color": "rgba(162, 0, 0,.5)",
        "text-shadow": "0px 0px 50px red" });
    } else {
      $("input[type='checkbox']").prop("checked", false);
      $(".pad,#strict,#start").addClass("untouchable");
      $("#display").css({ "color": "#000000",
        "text-shadow": "none" });
    }

    if (this.state.strict) {
      $("#strict").css("background-color", "orangered");
    } else {
      $("#strict").css("background-color", "#727272");
    }

    if (this.state.start) {
      $("#start").css("background-color", "orangered");
    } else {
      $("#start").css("background-color", "#727272");
    }
    return React.createElement(
      "div",
      { className: "gameBase" },
      React.createElement(TopRow, { onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        greenClass: colorClasses[0],
        redClass: colorClasses[1] }),
      React.createElement(GameMiddle, { onClick: this.handleClick,
        strictMode: this.handleStrictMode,
        startApp: this.handleStartApp }),
      React.createElement(BottomRow, { onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        yellowClass: colorClasses[2],
        blueClass: colorClasses[3]
      })
    );
  };

  return App;
}(React.Component);

var TopRow = function TopRow(props) {
  return React.createElement(
    "div",
    { className: "row" },
    React.createElement("div", { id: "green", className: props.greenClass, onMouseDown: props.onMouseDown, onMouseUp: props.onMouseUp }),
    React.createElement("div", { id: "red", className: props.redClass, onMouseDown: props.onMouseDown, onMouseUp: props.onMouseUp })
  );
};

var BottomRow = function BottomRow(props) {
  return React.createElement(
    "div",
    { className: "row" },
    React.createElement("div", { id: "yellow", className: props.yellowClass, onMouseDown: props.onMouseDown, onMouseUp: props.onMouseUp }),
    React.createElement("div", { id: "blue", className: props.blueClass, onMouseDown: props.onMouseDown, onMouseUp: props.onMouseUp })
  );
};
var GameMiddle = function GameMiddle(props) {
  return React.createElement(
    "div",
    { className: "gameMiddle" },
    React.createElement(
      "p",
      { className: "gameName" },
      "SIMON"
    ),
    React.createElement(
      "span",
      { id: "display" },
      "-0-"
    ),
    React.createElement("span", { id: "start", className: "untouchable", onClick: props.startApp }),
    React.createElement("span", { id: "strict", className: "untouchable", onClick: props.strictMode }),
    React.createElement(
      "span",
      { id: "off" },
      "OFF"
    ),
    React.createElement(
      "div",
      { className: "switch tiny" },
      React.createElement("input", { className: "switch-input", id: "onOff", type: "checkbox", name: "onOff" }),
      React.createElement("label", { className: "switch-paddle", "for": "onOff", onClick: props.onClick })
    ),
    React.createElement(
      "span",
      { id: "on" },
      "ON"
    )
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));