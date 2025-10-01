import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from '../../theme/Colors';
export default StyleSheet.create({
      safeArea: {
             flex: 1,
             backgroundColor: Color.primaryBGColor,
           },
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: '#111',
  },
  addButton: {
    backgroundColor: '#008080',
    padding: wp('2.5%'),
    borderRadius: wp('2%'),
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: wp('3%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: hp('2%'),
    color: '#000',
  },
  listContent: {
    paddingBottom: hp('2%'),
  },
  card: {
    backgroundColor: '#fff',
    padding: wp('4%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1.5%'),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textContainer: {
    marginLeft: wp('3%'),
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: wp('4.2%'),
    color: '#111',
    marginBottom: hp('0.5%'),
    paddingLeft:wp(2)
  },
  address: {
    fontSize: wp('3.6%'),
    color: '#555',
    paddingLeft:wp(2)
  },
  searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: wp(2),
  paddingHorizontal: wp(3),
  marginBottom: hp(2),
  marginHorizontal: wp(3),
},


emptyContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: hp(5),
},
emptyText: {
  fontSize: hp(2),
  color: '#666',
  textAlign: 'center',
},
filterRow: {
    flexDirection: 'row',
    // marginBottom: hp('1.5%'),
    gap: wp('2%'),
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: wp(1),
    marginBottom:hp(1)
  },
  searchIcon: {position: 'absolute', marginLeft: wp(3)},
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: wp('2%'),
    padding: wp('2.5%'),
    backgroundColor: '#fff',
    paddingLeft: wp(8),
  },
  saveButton: {
    backgroundColor: Color.primaryBGColor,
    height: hp(6),
    borderRadius: wp(10),
    marginBottom: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: Color.white,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
});
