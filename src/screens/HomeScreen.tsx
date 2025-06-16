import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext';
import QuranPageView from '../components/QuranPageView';
import AudioPlayer from '../components/AudioPlayer';
import { getPageMetadata } from '../utils/quranUtils';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState({ surah: 1, ayah: 1 });
  const [pageInputValue, setPageInputValue] = useState('1');
  const [showPageInput, setShowPageInput] = useState(false);
  const [pageData, setPageData] = useState<any>(null);
  const totalPages = 604;
  
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Load page data
    const loadPageData = async () => {
      try {
        const data = await getPageMetadata(currentPage);
        setPageData(data);
      } catch (error) {
        console.error('Error loading page data:', error);
      }
    };
    
    loadPageData();
    
    // Reset audio when page changes
    if (isPlaying) {
      setIsPlaying(false);
    }
  }, [currentPage]);
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setPageInputValue(newPage.toString());
    }
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleTimeUpdate = (timestamp: number) => {
    const newVerse = {
      surah: 1,
      ayah: Math.floor(timestamp / 5) + 1, 
    };
    setCurrentVerse(newVerse);
  };
  
  const showPageInputField = () => {
    setShowPageInput(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  
  const hidePageInputField = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowPageInput(false);
    });
  };
  
  const goToPage = () => {
    const pageNumber = parseInt(pageInputValue, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      handlePageChange(pageNumber);
    } else {
      setPageInputValue(currentPage.toString());
    }
    hidePageInputField();
  };
  
  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => navigation.navigate('Bookmarks')}
      >
        <Feather name="menu" size={24} color={colors.primary} />
      </TouchableOpacity>
      
      <Text style={[styles.title, { color: colors.primary }]}>Golden Quran</Text>
      
      <View style={styles.headerRight}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Feather name="search" size={22} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Feather name="settings" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderPageControls = () => (
    <View style={[styles.pageControls, { backgroundColor: colors.surface }]}>
      <View style={styles.pageInfo}>
        {showPageInput ? (
          <Animated.View style={[styles.pageInputContainer, { opacity: fadeAnim }]}>
            <TextInput
              style={[styles.pageInput, { color: colors.text, borderColor: colors.border }]}
              value={pageInputValue}
              onChangeText={setPageInputValue}
              keyboardType="number-pad"
              autoFocus
              onBlur={hidePageInputField}
              onSubmitEditing={goToPage}
              maxLength={3}
            />
            <Text style={[styles.pageInputLabel, { color: colors.textSecondary }]}>
              / {totalPages}
            </Text>
          </Animated.View>
        ) : (
          <TouchableOpacity onPress={showPageInputField}>
            <Text style={[styles.pageNumber, { color: colors.text }]}>
              Page <Text style={{ fontWeight: 'bold' }}>{currentPage}</Text> of {totalPages}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity
        style={[styles.playButton, { backgroundColor: colors.primary }]}
        onPress={togglePlayPause}
      >
        <Feather name={isPlaying ? 'pause' : 'play'} size={18} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}
      
      {renderPageControls()}
      
      <View style={styles.pageContainer}>
        <QuranPageView 
          pageNumber={currentPage}
          currentVerse={currentVerse}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </View>
      
      <AudioPlayer
        pageNumber={currentPage}
        onTimeUpdate={handleTimeUpdate}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
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
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
  },
  pageControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  pageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageNumber: {
    fontSize: 16,
  },
  pageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageInput: {
    width: 50,
    height: 36,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 16,
  },
  pageInputLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;