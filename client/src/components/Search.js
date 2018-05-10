import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import setItemList from '../../src/actions/itemsActions';

class Search extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};

		this.updateDB = this.updateDB.bind(this);
		this.testIsoDateSorting = this.testIsoDateSorting.bind(this);
		this.queryDB = this.queryDB.bind(this);
	}

	updateDB() {
	  axios.get(`/updateDB?region=${'US'}&&realm=${'Thrall'}`)
	    .then((res) => {
	    	console.log('success ', res);
	    })
	    .catch((res) => {
	    	console.log('error ', res);
	    });
	}

  testIsoDateSorting() {
    axios.get(`/dates`)
    .then((res) => {
      console.log('res: ', res);
    })
    .catch((res) => {
      console.log('error ', res);
    });
  }

	queryDB(e) {
		e.preventDefault();
		let input = $('#queryDB').val();
		$('#queryDB').val('');
		axios.get(`/queryDB?item=${input}`)
			.then((res) => {
				console.log('res ', res.data);
				this.props.loadItems(res.data);
			})
			.catch((res) => {
				console.log('error ', res);
			});
	}

	render() {
		return(
		  <div>
        <button onClick={this.updateDB}>Update DB</button>

        <p className="intro">
          Use this app to help you calculate a competitive price to buy or sell items on the World of Warcraft auction house. It works with a Blizzard API to collect data on hundreds of thousands of items from other players and applies an algorithm to get you market color.
        </p>
        <p className="disclaimer">
        * Due to database limits, real time updates from Blizzard have been suspended. 500 MB of historical data is still available.					 
        </p>

	    	<form onSubmit={this.queryDB}>
			    <input className="search" id="queryDB" placeholder="search by item ID (ex. 124102)"/>
	    	</form>
		  </div>
		);
	}
}

const mapDispatchToProps = dispatch => (
  { loadItems: itemList => dispatch(setItemList(itemList)) }
);

const mapStateToProps = (state) => {
  return ( {items: state.items} );
};

const SearchConnected = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchConnected;
