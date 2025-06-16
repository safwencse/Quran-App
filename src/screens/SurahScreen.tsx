import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const SurahScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  
  // In a real app, this would come from route params
  const surah = {
    id: 1,
    name: 'Al-Fatihah',
    arabicName: 'الفاتحة',
    verses: 7,
    type: 'Meccan',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      {
        number: 1,
        text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        translation: 'All praise is for Allah—Lord of all worlds,',
      },
      {
        number: 2,
        text: 'الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'the Most Compassionate, Most Merciful,',
      },
      {
        number: 3,
        text: 'مَالِكِ يَوْمِ الدِّينِ',
        translation: 'Master of the Day of Judgment.',
      },
      {
        number: 4,
        text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        translation: 'You ˹alone˺ we worship and You ˹alone˺ we ask for help.',
      },
      {
        number: 5,
        text: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        translation: 'Guide us along the Straight Path,',
      },
      {
        number: 6,
        text: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        translation: 'the Path of those You have blessed—not those You are displeased with, or those who are astray.',
      },
    ],
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
        
        <View style={styles.headerTitle}>
          <Text style={[styles.surahName, { color: colors.text }]}>
            {surah.name}
          </Text>
          <Text style={[styles.surahInfo, { color: colors.textSecondary }]}>
            {surah.type} • {surah.verses} Verses
          </Text>
        </View>
        
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="bookmark" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.bismillahContainer}>
          <View style={[styles.surahIconContainer, { backgroundColor: colors.primary }]}>
            <Feather name="book-open" size={24} color="#ffffff" />
          </View>
          
          <Text style={[styles.bismillahText, { color: colors.text }]}>
            {surah.bismillah}
          </Text>
        </View>
        
        <View style={styles.versesContainer}>
          {surah.ayahs.map((ayah) => (
            <View 
              key={ayah.number}
              style={[styles.verseItem, { borderBottomColor: colors.border }]}
            >
              <View style={styles.verseHeader}>
                <View style={[styles.verseNumber, { backgroundColor: colors.primary }]}>
                  <Text style={styles.verseNumberText}>{ayah.number}</Text>
                </View>
                
                <TouchableOpacity style={styles.shareButton}>
                  <Feather name="share-2" size={18} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <Text style={[styles.arabicText, { color: colors.text }]}>
                {ayah.text}
              </Text>
              
              <Text style={[styles.translationText, { color: colors.textSecondary }]}>
                {ayah.translation}
              </Text>
            </View>
          ))}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 8,
  },
  surahName: {
    fontSize: 18,
    fontWeight: '600',
  },
  surahInfo: {
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 16,
  },
  bismillahContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  surahIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  bismillahText: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'System',
    marginBottom: 16,
  },
  versesContainer: {
    marginBottom: 24,
  },
  verseItem: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  verseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verseNumberText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  shareButton: {
    padding: 8,
  },
  arabicText: {
    fontSize: 24,
    lineHeight: 42,
    textAlign: 'right',
    marginBottom: 12,
    fontFamily: 'System',
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SurahScreen;