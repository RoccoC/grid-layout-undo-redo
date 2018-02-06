import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import RGL, { WidthProvider } from 'react-grid-layout';
import { addGridItem, updateLayout, undo, redo, selectGridItem } from './actions';
import './App.css';
import 'react-grid-layout/css/styles.css';

/**
 * TODO: ReactGridLayout fires onLayoutChange each time a grid item is clicked (e.g. DragStart),
 * which results in unnecessary history getting added to the undo stack. This event also fires
 * each time the layout state is updated in the redux store, again resulting in extranneous
 * undo history.
 */

const ReactGridLayout = WidthProvider(RGL);

const mapStateToProps = state => ({
    canUndo: state.canUndo,
    canRedo: state.canRedo,
    layout: state.layout,
    selectedGridItemId: state.selectedGridItemId
});

const mapDispatchToProps = dispatch => ({
    onAddClick: () => {
        dispatch(addGridItem);
    },
    onLayoutChange: layout => {
        dispatch(updateLayout(layout));
    },
    onUndoClick: () => {
        dispatch(undo);
    },
    onRedoClick: () => {
        dispatch(redo);
    },
    onSelectGridItem: id => {
        dispatch(selectGridItem(id));
    }
});

class App extends Component {
    static propTypes = {
        canRedo: PropTypes.bool,
        canUndo: PropTypes.bool,
        layout: PropTypes.array.isRequired,
        onAddClick: PropTypes.func.isRequired,
        onLayoutChange: PropTypes.func.isRequired,
        onRedoClick: PropTypes.func.isRequired,
        onUndoClick: PropTypes.func.isRequired,
        onSelectGridItem: PropTypes.func.isRequired,
        selectedGridItemId: PropTypes.string
    };

    getSizeFromUnits(units) {
        return units * 150 + ((units- 1) * 10);
    }

    onGridItemResized(layout, oldL, newL, a, b, c) {
        const oldW = this.getSizeFromUnits(oldL.w);
        const oldH = this.getSizeFromUnits(oldL.h);
        const newW = this.getSizeFromUnits(newL.w);
        const newH = this.getSizeFromUnits(newL.h);
        console.log(`Resized from: { w: ${oldW}, h: ${oldH} } to: { w: ${newW}, h: ${newH} }`);
    }

    generateGridItems() {
        return this.props.layout.map((l, i) => {
            return (
                <div
                    key={l.i}
                    className={"grid-item" + (this.props.selectedGridItemId === l.i ? " selected" : "")}
                    onClick={this.props.onSelectGridItem.bind(this, l.i)}>
                    <span className="text">{l.i}</span>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">POC: Grid Layout with Undo / Redo</h1>
                </header>
                <p className="App-intro">
                    <button className="add-button" onClick={this.props.onAddClick}>Add Item</button>
                    <button disabled={!this.props.canUndo} onClick={this.props.onUndoClick}>Undo</button>
                    <button disabled={!this.props.canRedo} onClick={this.props.onRedoClick}>Redo</button>
                </p>
                <ReactGridLayout
                    layout={this.props.layout}
                    onLayoutChange={this.props.onLayoutChange}
                    onResizeStop={this.onGridItemResized}>
                    {this.generateGridItems()}
                </ReactGridLayout>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
