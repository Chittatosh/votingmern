import { connect } from 'react-redux';
import NavBarComponent from '../components/NavBarComponent';

const idProviderObj = {
  fb: 'facebook',
  gg: 'google',
  tt: 'twitter',
};

const mapStateToProps = ({ fbggId, displayName }, { btwnSlashNPage }) => ({
  idProvider: idProviderObj[fbggId.slice(0, 2)] || '',
  displayName,
  btwnSlashNPage,
});

const NavBarContainer = connect(mapStateToProps)(NavBarComponent);

export default NavBarContainer;
