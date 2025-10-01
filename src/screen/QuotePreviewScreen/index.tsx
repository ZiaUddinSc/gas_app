import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Pdf from 'react-native-pdf';
import styles from './style';
import {
  ArrowLeft,
  Download,
  Pencil,
  Mail,
  CheckCircle,
  ArrowLeftRight,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import RNFetchBlob from 'rn-fetch-blob';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Settings from '../../config/settings';
import {GetData} from '../../helper/CommonHelper';

const QuotePreviewScreen = ({route}) => {
  const {quoteData,quote_id} = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [pdfUri, setPdfUri] = useState('');
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetData(Settings.endpoints.quote_details_by_id(quote_id)).then(data => {
      if (data?.success) {
      
        fetchPdf(data?.data?.pdf_url);
        setQuote(data.data.quote)
      } else {
        alert('Data not found');
      }
      setLoading(false);
    });
  }, []);

  const fetchPdf = async pdgUrl => {
    try {
      const res = await RNFetchBlob.config({fileCache: true}).fetch(
        'GET',
        pdgUrl,
      );
      const localPath = res.path();
      setPdfUri(`file://${localPath}`);
    } catch (err) {
      console.log('PDF download fail:', err.message);
    }
  };

  const onApprove = () => {
    GetData(Settings.endpoints.quote_approve(quote_id)).then(data => {
      if (data?.success) {
        navigation.navigate('Dashboard');
      } else {
        alert('Data not found');
      }
    });
  };
  const onApproveAndEmail = () => {
    GetData(Settings.endpoints.quote_approve_email(quote_id)).then(data => {
      if (data?.success) {
        navigation.navigate('Dashboard');
      } else {
        alert('Data not found');
      }
    });
  };



 
  const handleDownload = async () => {
    try {
      const filePath = pdfUri.replace('file://', '');
      const downloadPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${quote_id}.pdf`;

      const data = await RNFetchBlob.fs.readFile(filePath, 'base64'); // Read existing temp PDF

      await RNFetchBlob.fs.writeFile(downloadPath, data, 'base64'); // Write to Download folder

      // Register with Download Manager (Android only)
      if (Platform.OS === 'android') {
        RNFetchBlob.android.addCompleteDownload({
          title: 'Quote PDF',
          description: 'Downloaded quote file',
          mime: 'application/pdf',
          path: downloadPath,
          showNotification: true,
          mediaScannable: true,
        });
      }

      alert('Download complete!');
      console.log('Saved file path:', downloadPath);
    } catch (e) {
      console.log('Download failed:', e.message);
      alert('Download failed');
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomHeader
        title="Quote Preview"
        fontSize={hp(2.2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />

      {/* PDF Viewer */}
      <View style={styles.pdfContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#008080" />
        ) : (
          <Pdf
            source={{uri: pdfUri}}
            style={styles.pdf}
            trustAllCerts={false}
            onError={err => console.log('PDF error:', err.message)}
          />
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('QuoteEditScreen', {
              quoteData:quoteData,
              quote: quote, 
            })
          }>
          <Pencil size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onApprove()}>
          <CheckCircle size={20} color="#fff" />
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onApproveAndEmail()}>
          <Mail size={20} color="#fff" />
          <Text style={styles.buttonText}>Approve & Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDownload()}>
          <Download size={20} color="#fff" />
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('On progressing')}>
          <ArrowLeftRight size={20} color="#fff" />
          <Text style={styles.buttonText}>Convert to Invoice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuotePreviewScreen;
