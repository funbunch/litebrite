import React, { Component } from "react";
import Peg from "./Peg";
import "../styles/litebrite.scss"

const colors = ["red", "orange", "blue", "yellow", "lime", "hotpink"];

export default class LiteBrite extends Component {
  state = {
    activeLights: {},
    selectedColor: "orange"
  };

  render() {
    console.log(this.props);
    return (
      <div
        className={`lite-brite ${
          this.props.classic ? " lite-brite--classic" : ""
        }`}
      >
        <div className="lite-brite__lights">
          {Array.from(new Array(this.props.rows)).map((_, x) => (
            <div className="row" id={`row-${x}`} key={`row-${x}`}>
              {Array.from(
                new Array(
                  this.props.classic
                    ? x % 2 !== 0
                      ? this.props.cols - 1
                      : this.props.cols
                    : this.props.cols
                )
              ).map((_, y) => {
                const pegState = this.state.activeLights[`${x},${y}`];
                return (
                  <div
                    className="column"
                    id={`cols-${x}-${y}`}
                    key={`cols-${x}-${y}`}
                  >
                    <Peg
                      onClick={() => {
                        const updatedLights = { ...this.state.activeLights };
                        const coordinateString = `${x},${y}`;
                        const peg = updatedLights[coordinateString] || {};

                        peg.active = !peg.active;
                        peg.color = this.state.selectedColor;

                        updatedLights[coordinateString] = peg;

                        this.setState({
                          activeLights: updatedLights
                        });
                      }}
                      color={
                        pegState ? pegState.color : this.state.selectedColor
                      }
                      isActive={pegState ? pegState.active : false}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="light-brite__colors">
          {colors.map(color => (
            <button
              className={`color-picker color-picker--${color} ${
                color === this.state.selectedColor
                  ? " color-picker--active"
                  : ""
              }`}
              onClick={() => {
                /** setState of selectedColor to 'blue' **/
                this.setState({
                  selectedColor: color
                });
              }}
            >
              {color}
            </button>
          ))}

          <button
            onClick={() => {
              const shouldClear = window.confirm("You sure you want to clear?");
              /** setState of selectedColor to 'blue' **/
              if (shouldClear) {
                this.setState({
                  activeLights: {}
                });
              }
            }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}
