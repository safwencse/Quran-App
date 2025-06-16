import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
  PanResponder,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

interface QuranPageViewProps {
  pageNumber: number;
  currentVerse: {
    surah: number;
    ayah: number;
  };
  onPageChange: (page: number) => void;
  totalPages: number;
}

const QuranPageView: React.FC<QuranPageViewProps> = ({
  pageNumber,
  currentVerse,
  onPageChange,
  totalPages,
}) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<any>({
    surah: 1,
    surahName: 'Al-Fatihah',
    lines: [
      { lineNumber: 1, text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', verses: [{ surah: 1, ayah: 1 }] },
      { lineNumber: 2, text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', verses: [{ surah: 1, ayah: 2 }] },
      { lineNumber: 3, text: 'الرَّحْمَٰنِ الرَّحِيمِ', verses: [{ surah: 1, ayah: 3 }] },
      { lineNumber: 4, text: 'مَالِكِ يَوْمِ الدِّينِ', verses: [{ surah: 1, ayah: 4 }] },
      { lineNumber: 5, text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', verses: [{ surah: 1, ayah: 5 }] },
      { lineNumber: 6, text: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', verses: [{ surah: 1, ayah: 6 }] },
      { lineNumber: 7, text: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', verses: [{ surah: 1, ayah: 7 }] },
    ],
  });
  
  const position = useRef(new Animated.Value(0)).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue(gestureState.dx);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120 && pageNumber > 1) {
          Animated.timing(position, {
            toValue: width,
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            position.setValue(0);
            onPageChange(pageNumber - 1);
          });
        } else if (gestureState.dx < -120 && pageNumber < totalPages) {
          Animated.timing(position, {
            toValue: -width,
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            position.setValue(0);
            onPageChange(pageNumber + 1);
          });
        } else {
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;
  
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.surface }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  
  return (
    <Animated.View
      style={[
        styles.pageView,
        { 
          backgroundColor: colors.surface,
          borderColor: colors.border,
          transform: [{ translateX: position }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.pageHeader}>
        <Text style={[styles.surahName, { color: colors.primary }]}>
          {pageData.surahName}
        </Text>
        <Text style={[styles.pageNumberLabel, { color: colors.textSecondary }]}>
          Page {pageNumber}
        </Text>
      </View>
      
      <View style={styles.quranTextContainer}>
        {pageData.lines.map((line: any, index: number) => (
          <View 
            key={index}
            style={[
              styles.textLine,
              line.verses.some((v: any) => v.surah === currentVerse.surah && v.ayah === currentVerse.ayah) && 
                [styles.highlightedVerse, { backgroundColor: colors.highlight }]
            ]}
          >
            <Text style={[styles.arabicText, { color: colors.text }]}>
              {line.text}
            </Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    width: width - 32,
    height: height * 0.7,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageView: {
    width: width - 32,
    height: height * 0.7,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  surahName: {
    fontSize: 16,
    fontWeight: '600',
  },
  pageNumberLabel: {
    fontSize: 14,
  },
  quranTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textLine: {
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  highlightedVerse: {
    borderRadius: 4,
  },
  arabicText: {
    fontSize: 22,
    lineHeight: 40,
    textAlign: 'right',
    fontFamily: 'System',
    writingDirection: 'rtl',
  },
});

export default QuranPageView;