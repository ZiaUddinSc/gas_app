import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SignatureScreen, {SignatureViewRef} from 'react-native-signature-canvas';

const SignaturePad = ({signature, setSignature}) => {
  const signCanvasRef = useRef<SignatureViewRef>(null);
  const handleSignature = signature => {
    console.log(signature);
    // onOK(signature);
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleClear = () => {
    signCanvasRef.current?.clearSignature();
  };

  const handleEnd = () => {
    signCanvasRef.current?.readSignature();
  };
  // Called after ref.current.getData()
  const handleData = data => {
    signCanvasRef.current.getData();
  };
  useEffect(() => {
    return () => {
      // You might need to release resources or perform cleanup here.
      // For example, if the SignatureCapture library has a dispose method,
      // you could call it here:
      // if (sigRef.current) {
      //   sigRef.current.dispose(); // If such a method exists
      // }
    };
  }, []);

  return (
    <View style={{marginVertical: 10}}>
      <SignatureScreen
        ref={signCanvasRef}
        onEnd={handleEnd}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onGetData={handleData}
        autoClear={true}
        style={{height: 150, borderWidth: 1, borderColor: '#ddd'}}
        descriptionText="Sign"
      />

      <View style={{flexDirection: 'row', marginTop: 5}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#e2e8f0',
            padding: 10,
            alignItems: 'center',
            flex: 1,
            marginVertical: 7,
          }}
          onPress={handleClear}>
          <Text style={{color: '#000', fontSize: 17}}>Clear Signature</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignaturePad;
