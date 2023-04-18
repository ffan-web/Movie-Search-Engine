import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FaImdb } from 'react-icons/fa';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearch(event) {
    event.preventDefault();
    // TODO: implement search logic using searchTerm state
    console.log(`Searching for "${this.state.searchTerm}"...`);
    this.props.history.push(`/mainpage/${this.state.searchTerm}`);
  }

  render() {
    return (
      <div className="search-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1 style={{ marginBottom: '32px' }}><FaImdb style={{ marginRight: '16px', fontSize: '48px', verticalAlign: 'middle' }} />Search IMDb</h1>
        <form onSubmit={this.handleSearch} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Search for a movie or TV show..."
            variant="outlined"
            size="small"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            style={{ marginBottom: '16px', fontSize: '24px', padding: '24px' }}
          />
          <Button variant="contained" color="primary" type="submit" style={{ minWidth: '80px', height: '36px' }}>Search</Button>
        </form>
      </div>
    );
  }
}

export default SearchPage;