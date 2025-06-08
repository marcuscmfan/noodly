import './ui/SearchBar.css'
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, placeholder = 'ex. ramen danbo' }) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className="search-input"
  />
);

SearchBar.propTypes = {
    placeholder: PropTypes.string.isRequired,
}


export default SearchBar;