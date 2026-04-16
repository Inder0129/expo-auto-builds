import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const moderateScaleFactor = width / 375;

const spacing = { sm: 10 * moderateScaleFactor, md: 20 * moderateScaleFactor, lg: 30 * moderateScaleFactor };
const borderRadius = { sm: 5 * moderateScaleFactor, md: 10 * moderateScaleFactor };
export default { spacing, borderRadius, moderateScaleFactor };
