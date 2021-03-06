import React, { Component, PropTypes } from 'react';
import ReactDom, { findDOMNode } from 'react-dom';

class Slider extends Component {

    componentDidMount() {
        this.setDimVariables();

        $(this.refs.pos).css('left', this.props.pos + '%');
        $(this.refs.bg).width(this.props.pos + '%');

        $(window).bind('resize.slider', _.debounce(this.setDimVariables.bind(this), 200));
    }

    setDimVariables() {
        const dims = this.refs.container.getBoundingClientRect();

        this.setState({
            offset: dims.left,
            width: dims.width,
            posWidth: $(this.refs.pos).width()
        });
    }

    componentWillUnmount() {
        $(window).unbind('resize.slider');
    }

    onMouseDown() {
        $(document).on('mousemove', (event) => {
            this.onSliderClick(event);
        });

        $(document).one('mouseup', (event) => {
            $(document).off('mousemove');
        });
    }

    onSliderClick(event) {
        const rawNewLeft = (event.clientX - this.state.offset - this.state.posWidth / 2) / this.state.width * 100;
        const newLeft = this.checkSliderRange(rawNewLeft);

        $(this.refs.pos).css('left', newLeft + '%');
        $(this.refs.bg).width(newLeft + '%');

        if (this.props.onSliderChange) this.props.onSliderChange(newLeft);
    }

    checkSliderRange(value) {
        if (value > 100 - this.state.posWidth) {
            return 100 - this.state.posWidth;
        } else if (value < 0) {
            return 0;
        }

        return value;
    }

    render() {
        return (
            <div className = 'slider'
                  onMouseDown = {this.onSliderClick.bind(this)}
                  ref = 'container'>
                <div className = 'slider-bg'
                     ref = 'bg'
                     />
                <div className = 'slider-pos'
                     ref = 'pos'
                     onMouseDown = {this.onMouseDown.bind(this)}/>
            </div>
         );
    }
}

export default Slider;
