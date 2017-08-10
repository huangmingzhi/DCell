import React, {Component} from 'react'
import * as colors from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';
import SearchIcon from 'material-ui/svg-icons/action/search';
import LocationIcon from 'material-ui/svg-icons/device/location-searching';

import SearchTab from './SearchTab'

import TermSearchPanel from './TermSearchPanel'

const TERM_SEARCH_MODE = 'term'
const GENE_SEARCH_MODE = 'gene'


class SearchPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchMode: GENE_SEARCH_MODE
    };
  }

  handleChange = () => {

    let selected = this.state.searchMode;

    if(selected === TERM_SEARCH_MODE) {
      selected = GENE_SEARCH_MODE
    } else {
      selected = TERM_SEARCH_MODE
    }

    this.setState({
      searchMode: selected,
    })
  }

  render() {

    // Check show or hide
    const uiState = this.props.uiState

    if(!uiState.get('showSearchWindow')) {
      return (<div></div>)
    }

    const style = {
      width: '23%',
      minWidth: '400px',
      maxWidth: '450px',
      position: 'fixed',
      left: '0.3em',
      top: '5em',
      zIndex: 999
    };

    const tabStyle = {
      background: colors.blueGrey500,
      height: '100%',
      fontSize: '0.7em'
    }

    const searchStyle = {
      background: 'white',
      padding: '0.5em'
    }

    const tabTitleStyle = {
      fontSize: '1em'
    }


    return (
      <div style={style}>
        <Tabs
          style={tabStyle}
          value={this.state.searchMode}
          onChange={this.handleChange}
        >
          <Tab
            value={TERM_SEARCH_MODE}
            label='Locate Terms'
            style={tabTitleStyle}
          >
            <TermSearchPanel

              searchMode={this.state.searchMode}

              style={searchStyle}
              search={this.props.search}
              searchActions={this.props.searchActions}
              uiStateActions={this.props.uiStateActions}
              commandActions={this.props.commandActions}

              trees={this.props.trees}
              currentNetwork={this.props.currentNetwork}
            />
          </Tab>

          <Tab
            value={GENE_SEARCH_MODE}
            label="Select Gene/Genotype"
            style={tabTitleStyle}
          >
            <SearchTab
              searchMode={this.state.searchMode}

              style={searchStyle}
              search={this.props.search}
              searchActions={this.props.searchActions}
              uiStateActions={this.props.uiStateActions}
              backendServices={this.props.backendServices}
              queryGenesActions={this.props.queryGenesActions}
              queryGenes={this.props.queryGenes}
            />
          </Tab>
        </Tabs>
      </div>
    )

  }
}

export default SearchPanel
