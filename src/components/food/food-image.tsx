import { View, Image, Text } from 'react-native';
import { ViewStyle, ImageStyle, TextStyle } from 'react-native';

interface FoodImageProps {
  imageUrl: string;
  name: string;
  style?: ViewStyle;
}

export const FoodImage: React.FC<FoodImageProps> = ({ imageUrl, name, style }: FoodImageProps) => {
  return (
    <View style={[{
      width: '100%',
      height: 300,
      backgroundColor: '#E5E5EA',
    }, style]}>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: '100%',
          height: '100%',
        } as ImageStyle}
        resizeMode="cover"
      />
    </View>
  );
};
