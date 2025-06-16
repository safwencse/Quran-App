import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const BookmarksScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  
  const bookmarks = [
    { id: '1', type: 'page', pageNumber: 2, surah: 'Al-Baqarah', date: '2023-05-15' },
    { id: '2', type: 'verse', surah: 'Al-Fatihah', verse: 5, pageNumber: 1, date: '2023-05-14' },
    { id: '3', type: 'page', pageNumber: 25, surah: 'Al-Baqarah', date: '2023-05-10' },
    { id: '4', type: 'verse', surah: 'Ali Imran', verse: 103, pageNumber: 63, date: '2023-05-08' },
    { id: '5', type: 'page', pageNumber: 152, surah: 'An-Nisa', date: '2023-05-05' },
  ];
  
  const renderBookmarkItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.bookmarkItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => {
        navigation.navigate('Home', { pageNumber: item.pageNumber });
      }}
    >
      <View style={styles.bookmarkContent}>
        <View style={[styles.bookmarkIcon, { backgroundColor: colors.primary }]}>
          <Feather 
            name={item.type === 'page' ? 'book-open' : 'bookmark'} 
            size={18} 
            color="#ffffff" 
          />
        </View>
        
        <View style={styles.bookmarkInfo}>
          <Text style={[styles.bookmarkTitle, { color: colors.text }]}>
            {item.surah}
          </Text>
          <Text style={[styles.bookmarkSubtitle, { color: colors.textSecondary }]}>
            {item.type === 'page' ? `Page ${item.pageNumber}` : `Verse ${item.verse}`}
          </Text>
        </View>
      </View>
      
      <View style={styles.bookmarkActions}>
        <Text style={[styles.bookmarkDate, { color: colors.textSecondary }]}>
          {item.date}
        </Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: colors.text }]}>Bookmarks</Text>
        
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="trash-2" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      {bookmarks.length > 0 ? (
        <FlatList
          data={bookmarks}
          renderItem={renderBookmarkItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Feather name="bookmark" size={64} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No bookmarks yet
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Bookmark your favorite verses or pages to access them quickly
          </Text>
        </View>
      )}
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
  iconButton: {
    padding: 8,
  },
  listContent: {
    padding: 16,
  },
  bookmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  bookmarkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bookmarkInfo: {
    flex: 1,
  },
  bookmarkTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookmarkSubtitle: {
    fontSize: 14,
  },
  bookmarkActions: {
    alignItems: 'flex-end',
  },
  bookmarkDate: {
    fontSize: 12,
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default BookmarksScreen;