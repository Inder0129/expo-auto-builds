import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

export interface LanguageSelectorProps {
  currentLanguage: string;
  onSelectLanguage: (language: string) => void;
  style?: any;
}

type LanguageOption = {
  id: string;
  name: string;
  code: string;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = (props: LanguageSelectorProps) => {
  const { currentLanguage, onSelectLanguage, style } = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const languages: LanguageOption[] = [
    { id: 'en', name: 'English', code: 'EN' },
    { id: 'hi', name: 'Hindi', code: 'HI' },
    { id: 'es', name: 'Spanish', code: 'ES' },
    { id: 'fr', name: 'French', code: 'FR' },
    { id: 'de', name: 'German', code: 'DE' }
  ];

  const handleSelect = (language: LanguageOption) => {
    onSelectLanguage(language.name);
    setModalVisible(false);
  };

  return (
    <View style={style}>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.currentLanguage}>{currentLanguage}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.text.secondary} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            {languages.map((language: LanguageOption) => (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.languageOption,
                  currentLanguage === language.name && styles.selectedOption
                ]}
                onPress={() => handleSelect(language)}
                activeOpacity={0.7}
              >
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.languageCode}>{language.code}</Text>
                {currentLanguage === language.name && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  currentLanguage: {
    fontSize: 14,
    color: colors.text.secondary
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    paddingBottom: 32,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  selectedOption: {
    backgroundColor: colors.primary + '10'
  },
  languageName: {
    fontSize: 16,
    color: colors.text.primary,
    flex: 1
  },
  languageCode: {
    fontSize: 14,
    color: colors.text.secondary,
    marginRight: 12
  }
});
