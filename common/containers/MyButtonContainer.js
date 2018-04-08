import { connect } from 'react-redux';
import MyButtonComponent from '../components/MyButtonComponent';

const mapStateToProps = ({ fbggId }, { btwnSlashNPage }) => {
  const myPollsBool = btwnSlashNPage.slice(0, 7) === 'mypolls';
  return { myPollsBool, fbggId };
};

const MyButtonContainer = connect(mapStateToProps)(MyButtonComponent);

export default MyButtonContainer;
