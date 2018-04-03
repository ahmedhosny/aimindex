import * as React from 'react';
import {ContentBox} from './demo/ContentBox';
import PropTypes from 'prop-types';
import {AutoSizer, Grid, ScrollSync} from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import Glamorous from 'glamorous';

import './Cells.css';

/**
 * Cells Class
 * @extends React
 */
class Cells extends React.PureComponent {
  /**
   * Constructor
   * @param  {object} props props,
   */
  constructor(props) {
    super(props);
    const {columnWidths} = this.props.data;
    this.state = {
      columnWidth: columnWidths[0],
      columnCount: columnWidths.length,
      height: 600,
      overscanColumnCount: 0,
      overscanRowCount: 5,
      rowHeight: 40,
      rowCount: 35,
      leftHeaderWidth: columnWidths[0],
    };

    this._renderBodyCell = this._renderBodyCell.bind(this);
    this._renderHeaderCell = this._renderHeaderCell.bind(this);
    this._renderLeftSideCell = this._renderLeftSideCell.bind(this);
    this._renderLeftHeaderCell = this._renderLeftHeaderCell.bind(this);
    this._getColumnWidth = this._getColumnWidth.bind(this);
  }
  /**
   * Render functions
   * @return {ReactElement}
   */
  render() {
    const {
      columnCount,
      columnWidth,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
      leftHeaderWidth,
    } = this.state;

    return (
      <ContentBox>
        <ScrollSync>
          {({
            clientHeight,
            clientWidth,
            onScroll,
            scrollHeight,
            scrollLeft,
            scrollTop,
            scrollWidth,
          }) => {
            return (
              <div className={'GridRow'}>
                {/* corner */}
                <div
                  className={'LeftSideGridContainer'}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: '#fff',
                    backgroundColor: '#696969',
                  }}
                >
                  <Grid
                    cellRenderer={this._renderLeftHeaderCell}
                    className={'HeaderGrid'}
                    width={leftHeaderWidth}
                    height={rowHeight}
                    rowHeight={rowHeight}
                    columnWidth={columnWidth}
                    rowCount={1}
                    columnCount={1}
                  />
                </div>
                {/* left header */}
                <div
                  className={'LeftSideGridContainer'}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: rowHeight,
                    backgroundColor: '#fff',
                  }}
                >
                  <Grid
                    overscanColumnCount={overscanColumnCount}
                    overscanRowCount={overscanRowCount}
                    cellRenderer={this._renderLeftSideCell}
                    columnWidth={columnWidth}
                    columnCount={1}
                    className={'LeftSideGrid'}
                    height={height - scrollbarSize()}
                    rowHeight={rowHeight}
                    rowCount={rowCount}
                    scrollTop={scrollTop}
                    width={leftHeaderWidth}
                  />
                </div>
                <div className={'GridColumn'}>
                  <AutoSizer disableHeight>
                    {({width}) => (
                      <div>
                        {/* top header*/}
                        <div
                          style={{
                            color: '#fff',
                            backgroundColor: '#696969',
                            height: rowHeight,
                            width: width - scrollbarSize(),
                          }}
                        >
                          <Grid
                            className={'HeaderGrid'}
                            columnWidth={this._getColumnWidth}
                            columnCount={columnCount}
                            height={rowHeight}
                            overscanColumnCount={overscanColumnCount}
                            cellRenderer={this._renderHeaderCell}
                            rowHeight={rowHeight}
                            rowCount={1}
                            scrollLeft={scrollLeft}
                            width={width - scrollbarSize()}
                          />
                        </div>
                        {/* cells */}
                        <div
                          style={{
                            backgroundColor: '#fff',
                            height,
                            width,
                          }}
                        >
                          <Grid
                            className={'BodyGrid'}
                            columnWidth={this._getColumnWidth}
                            columnCount={columnCount}
                            height={height}
                            onScroll={onScroll}
                            overscanColumnCount={overscanColumnCount}
                            overscanRowCount={overscanRowCount}
                            cellRenderer={this._renderBodyCell}
                            rowHeight={rowHeight}
                            rowCount={rowCount}
                            width={width}
                          />
                        </div>
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </div>
            );
          }}
        </ScrollSync>
      </ContentBox>
    );
  }

  _renderBodyCell({columnIndex, key, rowIndex, style}) {
    if (columnIndex < 1) {
      return;
    }
    return this._renderLeftSideCell({columnIndex, key, rowIndex, style});
  }

  _renderHeaderCell({columnIndex, key, rowIndex, style}) {
    if (columnIndex < 1) {
      return;
    }

    return this._renderLeftHeaderCell({columnIndex, key, rowIndex, style});
  }

  _renderLeftHeaderCell({columnIndex, key, style}) {
    return (
      <div className={'headerCell'} key={key} style={style}>
        <span className={'span'}>{this.props.data.columns[columnIndex]}</span>
      </div>
    );
  }

  _renderLeftSideCell({columnIndex, key, rowIndex, style}) {
    const rowClass = rowIndex % 2 === 0 ? 'evenRow' : 'oddRow';
    const {entries, columns} = this.props.data;
    return (
      <div className={rowClass} key={key} style={style}>
        <span className={'span'}>
          {entries[rowIndex][columns[columnIndex]]}
        </span>
      </div>
    );
  }

  /**
   * Returns the width of the column given the index - from Props
   * @param  {number} index Column index
   * @return {number}       Column width
   */
  _getColumnWidth({index}) {
    return this.props.data.columnWidths[index];
  }
}
Cells.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Cells;
