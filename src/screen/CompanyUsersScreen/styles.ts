import { StyleSheet,Platform,StatusBar } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen';
  import Color from '../../theme/Colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
   padding:wp(4)
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems:'center',
    // width:wp(100)
  },
  addButton: {
 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:Color.primaryBGColor,
    paddingHorizontal: wp(1),
    borderRadius: 5,
    height:hp(5.5),
    width:wp(30)
  },
  addButtonText: {
    color: 'white',
    paddingLeft:wp(1),
    fontSize: 14,
    fontWeight:'700'
  },
  searchContainer: {
   
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal:wp(1),
    borderWidth: 1,
    borderColor: '#ddd',
    width:wp(60)
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
   
    fontSize: 14,
    height:hp(6),
    width:wp(60)
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 3,
  },
  userRenewal: {
    fontSize: 14,
    color: '#888',
  },
  statusButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    minWidth: 70,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#e6f7ee',
    borderColor: '#28a745',
    borderWidth: 1,
  },
  inactiveButton: {
    backgroundColor: '#f8f9fa',
    borderColor: '#6c757d',
    borderWidth: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default styles;