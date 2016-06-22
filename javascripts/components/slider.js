import React, { Component, PropTypes } from 'react';
import ReactDom, { findDOMNode } from 'react-dom';

var globalFrame;

class Slider extends Component {
    mouseMoveHandle() {
        console.log('Mouse Move!');
        globalFrame = requestAnimationFrame(this.mouseMoveHandle.bind(this));
    }

    mouseUpHandle() {
        console.log('Mouse Up!');
        cancelAnimationFrame(globalFrame);
    }

    mouseDownHandle() {
        console.log('Mouse Down!');
        globalFrame = requestAnimationFrame(this.mouseMoveHandle.bind(this));
    }

    render() {
        return (
            <div className = 'slider'>
                <div className = 'slider-pos'
                     ref = 'slider'
                     onMouseDown = {this.mouseDownHandle.bind(this)}
                     onMouseUp = {this.mouseUpHandle.bind(this)}
                     />
            </div>
         );
    }
}

export default Slider;
