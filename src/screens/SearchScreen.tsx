import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const SearchScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 2) {
      setIsSearching(true);
      
      setTimeout(() => {
        const results = [
          { id: '1', type: 'surah', name: 'Al-Baqarah', arabicName: 'البقرة', number: 2 },
          { id: '2', type: 'verse', surah: 'Al-Baqarah', verse: 255, text: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence...' },
          { id: '3', type: 'verse', surah: 'Al-Baqarah', verse: 286, text: 'Allah does not charge a soul except with that within its capacity...' },
          { id: '4', type: 'surah', name: 'Al-Kahf', arabicName: 'الكهف', number: 18 },
          { id: '5', type: 'verse', surah: 'Al-Kahf', verse: 1, text: 'Praise is to Allah, who has sent down upon His Servant the Book...' },
        ];
        
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };
  
  const renderSearchResult = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.resultItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => {
        if (item.type === 'surah') {
          navigation.navigate('Surah', { surahId: item.number });
        } else {
          navigation.navigate('Surah', { surahId: item.surah, verse: item.verse });
        }
      }}
    >
      <View style={styles.resultContent}>
        <View 
          style={[
            styles.resultIcon, 
            { 
              backgroundColor: item.type === 'surah' ? colors.primary : colors.primaryDark 
            }
          ]}
        >
          <Feather 
            name={item.type === 'surah' ? 'book' : 'file-text'} 
            size={18} 
            color="#ffffff" 
          />
        </View>
        
        <View style={styles.resultInfo}>
          {item.type === 'surah' ? (
            <>
              <Text style={[styles.resultTitle, { color: colors.text }]}>
                {item.name} ({item.arabicName})
              </Text>
              <Text style={[styles.resultSubtitle, { color: colors.textSecondary }]}>
                Surah {item.number}
              </Text>
            </>
          ) : (
            <>
              <Text style={[styles.resultTitle, { color: colors.text }]}>
                {item.surah} {item.verse}
              </Text>
              <Text 
                style={[styles.resultSubtitle, { color: colors.textSecondary }]}
                numberOfLines={2}
              >
                {item.text}
              </Text>
            </>
          )}
        </View>
      </View>
      
      <Feather name="chevron-right" size={20} color={colors.textSecondary} />
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
        
        <View style={[styles.searchInputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Feather name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search Surah or Verse"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => handleSearch('')}
            >
              <Feather name="x" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {isSearching ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Searching...</Text>
        </View>
      ) : searchQuery.length > 0 && searchResults.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="search" size={64} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No results found
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Try different keywords or check spelling
          </Text>
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.initialContainer}>
          <Text style={[styles.initialText, { color: colors.textSecondary }]}>
            Search for Surahs, verses, or keywords
          </Text>
          <View style={styles.recentSearches}>
            <Text style={[styles.recentTitle, { color: colors.text }]}>Recent Searches</Text>
            <TouchableOpacity 
              style={[styles.recentItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleSearch('Ayatul Kursi')}
            >
              <Feather name="clock" size={16} color={colors.textSecondary} style={styles.recentIcon} />
              <Text style={[styles.recentText, { color: colors.text }]}>Ayatul Kursi</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.recentItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleSearch('Al-Kahf')}
            >
              <Feather name="clock" size={16} color={colors.textSecondary} style={styles.recentIcon} />
              <Text style={[styles.recentText, { color: colors.text }]}>Al-Kahf</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
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
  initialContainer: {
    flex: 1,
    padding: 16,
  },
  initialText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 24,
  },
  recentSearches: {
    marginTop: 16,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  recentIcon: {
    marginRight: 8,
  },
  recentText: {
    fontSize: 16,
  },
});

export default SearchScreen;