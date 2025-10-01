import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Mail,
  Home,
  Key,
  AlertCircle,
  Wrench,
  Flame,
  Droplets,
  ClipboardList,
  FileText,
  ArrowLeft,
} from 'lucide-react-native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {styles} from './styles';

const EmailTemplateScreen = ({navigation}) => {
  const templates = [
    {
      title: 'Quote Email',
      description: 'Email template when sending Quote.',
      icon: <FileText size={hp(3)} color="#3b82f6" />,
    },
    {
      title: 'CP12 Homeowner Gas Safety Record',
      description:
        'Email template when sending CP12 Homeowner Gas Safety Record.',
      icon: <Home size={hp(3)} color="#ef4444" />,
    },
    {
      title: 'CP14 Gas Warning Notice Email',
      description: 'Email template when sending CP14 Gas Warning Notice.',
      icon: <AlertCircle size={hp(3)} color="#f59e0b" />,
    },
    {
      title: 'Gas Breakdown Record Email',
      description: 'Email template when sending Gas Breakdown Record.',
      icon: <Flame size={hp(3)} color="#f97316" />,
    },
    {
      title: 'Powerflush Certificate Email',
      description: 'Email template when sending Powerflush Certificate.',
      icon: <Droplets size={hp(3)} color="#06b6d4" />,
    },
    {
      title: 'Unvented Hot Water Cylinders Email',
      description: 'Email template when sending Unvented Hot Water Cylinders.',
      icon: <Droplets size={hp(3)} color="#8b5cf6" />,
    },
    {
      title: 'Invoice Email',
      description: 'Email template when sending Invoice.',
      icon: <FileText size={hp(3)} color="#10b981" />,
    },
    {
      title: 'CP12 Landlord Gas Safety Record',
      description:
        'Email template when sending CP12 Landlord Gas Safety Record.',
      icon: <Key size={hp(3)} color="#f59e0b" />,
    },
    {
      title: 'Service / Maintenance Record Email',
      description: 'Email template when sending Service / Maintenance Record.',
      icon: <Wrench size={hp(3)} color="#64748b" />,
    },
    {
      title: 'Gas Boiler System Commissioning Checklist Email',
      description:
        'Email template when sending Gas Boiler System Commissioning Checklist.',
      icon: <ClipboardList size={hp(3)} color="#8b5cf6" />,
    },
    {
      title: 'Installation / Commissioning Decommissioning Record Email',
      description:
        'Email template when sending Installation / Commissioning Decommissioning Record.',
      icon: <Wrench size={hp(3)} color="#64748b" />,
    },
    {
      title: 'Job Sheet Email',
      description: 'Email template when sending Job Sheet.',
      icon: <ClipboardList size={hp(3)} color="#8b5cf6" />,
    },
  ];

  const handleTemplatePress = template => {
    // Handle template selection
    console.log('Selected template:', template.title);
    // Navigate to template editor or show modal
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title="Service Reminders and Email Templates"
        fontSize={hp(2)}
        leftIcon={<ArrowLeft size={24} color="white" />}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {templates.map((template, index) => (
            <TouchableOpacity
              key={index}
              style={styles.templateCard}
              onPress={() => handleTemplatePress(template)}>
              <View style={styles.templateHeader}>
                {template.icon}
                <Text style={styles.templateTitle}>{template.title}</Text>
              </View>

              <Text style={styles.templateDescription}>
                {template.description}
              </Text>

              <View style={styles.divider} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EmailTemplateScreen;
