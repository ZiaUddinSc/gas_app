import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import {Dropdown} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../theme/Colors';

const TitleNameEditModal = ({
  visible,
  onClose,
  initialValues,
  onSubmit,
  titleOptions,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              handleBlur,
              values,
            }) => (
              <>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Title</Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={titleOptions}
                    labelField="name"
                    valueField="id"
                    placeholder="Please Select"
                    value={values.title_id}
                    onChange={item => setFieldValue('title_id', item.id)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name </Text>

                  <TextInput
                    style={styles.input}
                    value={values.full_name}
                    onChangeText={handleChange('full_name')}
                    placeholder="Enter Full Name"
                    placeholderTextColor="black"
                    onBlur={handleBlur('fullName')}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSubmit}>
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onClose}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};
const textColorPrimary = '#343a40';
const borderColor = '#ced4da';
const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: wp(5),
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp(5),
    elevation: 5,
  },
  formContainer: {
    backgroundColor: Color.white,
    padding: wp(4),
    borderRadius: wp(1),
    marginBottom: hp(2),
    // borderWidth: 1,
    // borderColor: borderColor,
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    color: textColorPrimary,
    marginBottom: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    paddingBottom: hp(0.5),
  },
  inputGroup: {
    marginBottom: hp(2),
    justifyContent: 'center',
  },
  label: {
    fontSize: hp(1.8),
    color: textColorPrimary,
    marginBottom: hp(0.5),
  },
  required: {
    color: 'red',
  },
  input: {
    height: hp(5.2),
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    fontSize: hp(1.8),
    backgroundColor: Color.white,
    elevation: 2,
  },
  multilineInput: {
    minHeight: hp(10),
    textAlignVertical: 'top',
  },
  dropdown: {
    height: hp(5.2),
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    backgroundColor: Color.white,
    elevation: 2,
  },
  saveBtn: {
    backgroundColor: '#008080',
    paddingVertical: hp(1.5),
    borderRadius: 6,
    marginTop: hp(2),
  },
  btnText: {
    color: '#fff',
    fontSize: hp(2),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelText: {
    color: 'red',
    textAlign: 'center',
    marginTop: hp(1),
    fontSize: hp(1.8),
  },
  saveButton: {
    backgroundColor: Color.primaryBGColor,
    height: hp(5),
    borderRadius: wp(5),
    // marginBottom: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(35),
  },
  saveButtonText: {
    color: Color.white,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  cancelButton: {
    backgroundColor: Color.white,
    height: hp(5),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: Color.primaryBGColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(35),
  },
  cancelButtonText: {
    color: Color.textPrimaryColor,
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(2),
  },
});

export default TitleNameEditModal;
