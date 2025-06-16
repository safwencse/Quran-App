import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import Slider from '@react-native-community/slider';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { colors, theme, setTheme, isDark } = useTheme();
  
  const [fontSize, setFontSize] = useState(18);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTajweed, setShowTajweed] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [highlightVerse, setHighlightVerse] = useState(true);
  const [volume, setVolume] = useState(80);
  
  const handleThemeChange = () => {
    setTheme(isDark ? 'light' : 'dark');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="type" size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Display Settings</Text>
          </View>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Font Size</Text>
              <View style={styles.sliderContainer}>
                <Feather name="minus" size={16} color={colors.textSecondary} />
                <Slider
                  style={styles.slider}
                  minimumValue={12}
                  maximumValue={30}
                  step={1}
                  value={fontSize}
                  onValueChange={setFontSize}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
                <Feather name="plus" size={16} color={colors.textSecondary} />
              </View>
            </View>
            
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
              <Switch
                trackColor={{ false: '#767577', true: colors.primaryDark }}
                thumbColor={isDark ? colors.primary : '#f4f3f4'}
                ios_backgroundColor="#767577"
                onValueChange={handleThemeChange}
                value={isDark}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Mushaf Type</Text>
              <TouchableOpacity style={[styles.selectButton, { borderColor: colors.border }]}>
                <Text style={{ color: colors.text }}>Medinah Mushaf</Text>
                <Feather name="chevron-down" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="volume-2" size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Audio Settings</Text>
          </View>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Reciter</Text>
              <TouchableOpacity style={[styles.selectButton, { borderColor: colors.border }]}>
                <Text style={{ color: colors.text }}>Mishary Rashid Alafasy</Text>
                <Feather name="chevron-down" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Volume</Text>
              <View style={styles.sliderContainer}>
                <Feather name="volume" size={16} color={colors.textSecondary} />
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={volume}
                  onValueChange={setVolume}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
                <Feather name="volume-2" size={16} color={colors.textSecondary} />
              </View>
            </View>
            
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Auto-play on page change</Text>
              <Switch
                trackColor={{ false: '#767577', true: colors.primaryDark }}
                thumbColor={autoPlay ? colors.primary : '#f4f3f4'}
                ios_backgroundColor="#767577"
                onValueChange={setAutoPlay}
                value={autoPlay}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Highlight verse during recitation</Text>
              <Switch
                trackColor={{ false: '#767577', true: colors.primaryDark }}
                thumbColor={highlightVerse ? colors.primary : '#f4f3f4'}
                ios_backgroundColor="#767577"
                onValueChange={setHighlightVerse}
                value={highlightVerse}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="book-open" size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Reading Settings</Text>
          </View>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Show Translation</Text>
              <Switch
                trackColor={{ false: '#767577', true: colors.primaryDark }}
                thumbColor={showTranslation ? colors.primary : '#f4f3f4'}
                ios_backgroundColor="#767577"
                onValueChange={setShowTranslation}
                value={showTranslation}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Show Tajweed Colors</Text>
              <Switch
                trackColor={{ false: '#767577', true: colors.primaryDark }}
                thumbColor={showTajweed ? colors.primary : '#f4f3f4'}
                ios_backgroundColor="#767577"
                onValueChange={setShowTajweed}
                value={showTajweed}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Translation Language</Text>
              <TouchableOpacity style={[styles.selectButton, { borderColor: colors.border }]}>
                <Text style={{ color: colors.text }}>English</Text>
                <Feather name="chevron-down" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  settingsCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  settingLabel: {
    fontSize: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 150,
  },
});

export default SettingsScreen;