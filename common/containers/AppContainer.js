import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';

const pollsPerPage = 6;

const getPollsForAPage = (poll_idArr, normPollObj, sliceIndex) => 
  poll_idArr.slice(sliceIndex, sliceIndex+pollsPerPage);

const filterByUrl = (poll_idArr, normPollObj, btwnSlashNPage) => { 
  if(btwnSlashNPage.slice(0,7) === 'mypolls') {
    const creatorId = btwnSlashNPage.slice(7);
    return poll_idArr.filter(key => normPollObj[key].creatorId === creatorId);
  }
  return poll_idArr;
};

const searchPollArr = (poll_idArr, normPollObj, searchTerm)  => { 
  if(searchTerm) {
    return poll_idArr.filter(key => 
      normPollObj[key].pollTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) + 1
    );
  }
  return poll_idArr;
};

const mapStateToProps = ({poll_idArr, normPollObj, searchTerm}, {match:{params:{filter}}}) => {
  // Get keys searched by searchTerm
  const searchedKeysArr = searchPollArr(poll_idArr, normPollObj, searchTerm);
  // Get 'my' or 'all' and page number from url
  const pageSplitArr = (filter||'allpollspage1').split('page');
  const btwnSlashNPage = pageSplitArr[0];
  const numFromUrl = +pageSplitArr[1];
  // Get polls created by a user if required by the url
  const urlFilteredKeysArr = filterByUrl(searchedKeysArr, normPollObj, btwnSlashNPage);
  const pollCount = urlFilteredKeysArr.length;
  const pageCount = Math.floor(pollCount/pollsPerPage) + (pollCount%pollsPerPage ? 1 : 0);
  // Get polls by page number
  const sliceIndex = (numFromUrl-1)*pollsPerPage;
  const _idsForPageArr = getPollsForAPage(urlFilteredKeysArr, normPollObj, sliceIndex);

  return { pageCount, btwnSlashNPage, numFromUrl, _idsForPageArr };
};

const AppContainer = connect(mapStateToProps)(AppComponent);

export default AppContainer;
