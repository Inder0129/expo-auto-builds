import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 16,
  },
  userEmail: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 4,
  },
  userInfo: {
    fontSize: 14,
    color: colors.text.tertiary,
    marginTop: 8,
  },
  editButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  actionsSection: {
    marginTop: 32,
    marginBottom: 48,
    paddingHorizontal: 16,
  },
  logoutButton: {
    marginBottom: 16,
  },
  deleteAccountButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  deleteAccountText: {
    fontSize: 16,
    color: colors.text.danger,
  },
});
