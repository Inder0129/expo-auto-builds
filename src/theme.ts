import { StyleSheet } from 'react-native';

export const moderateScaleFactor = () => 1;
export const spacing = 10;
export const fontSize = 14;
export const useThemedStyles = () => StyleSheet.create({
  button: {
    padding: spacing,
    borderRadius: 5,
  },
  buttonPrimary: {
    backgroundColor: 'blue',
  },
  buttonSecondary: {
    backgroundColor: 'gray',
  },
  buttonText: {
    fontSize: fontSize,
    color: 'white',
  },
  buttonTextPrimary: {
    color: 'white',
  },
  buttonTextSecondary: {
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: spacing,
  },
  inputLabel: {
    fontSize: fontSize,
    marginBottom: spacing,
  },
  inputError: {
    borderColor: 'red',
  },
  inputErrorText: {
    fontSize: fontSize,
    color: 'red',
    marginTop: spacing,
  },
  wrapperView: {
    padding: spacing,
  },
});