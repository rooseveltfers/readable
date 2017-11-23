import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getCategories } from './actions'

class Categories extends Component {

  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    return (
      <div className="app">
        <h2>Categories:</h2>
        <ul className="list-group">
          {this.props.categories.map(category => (
            <a key={category.name} href={'/category/' + category.name} className="font-weight-bold" >
              <li className="list-group-item text-capitalize">
                {category.name}
              </li>
            </a>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories.categories }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ getCategories }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
