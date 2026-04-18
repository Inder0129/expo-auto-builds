import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  imageUrl: string;
};

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantPress: (restaurantId: string) => void;
  style?: ViewStyle;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onRestaurantPress, style }) => {
  const renderItem = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      style={restaurantItemStyle}
      onPress={() => onRestaurantPress(item.id)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={restaurantImageStyle}
        resizeMode="cover"
      />
      <View style={restaurantInfoStyle}>
        <Text style={restaurantNameStyle}>{item.name}</Text>
        <Text style={restaurantCuisineStyle}>{item.cuisine}</Text>
        <View style={restaurantDetailsStyle}>
          <View style={ratingContainerStyle}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={ratingTextStyle}>{item.rating}</Text>
          </View>
          <Text style={deliveryTimeStyle}>{item.deliveryTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={restaurants}
      renderItem={renderItem}
      keyExtractor={(item: Restaurant) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
    />
  );
};

const restaurantItemStyle: ViewStyle = {
  width: 250,
  marginRight: spacing.md,
  backgroundColor: colors.surface,
  borderRadius: 12,
  overflow: 'hidden',
};

const restaurantImageStyle: ImageStyle = {
  width: '100%',
  height: 150,
};

const restaurantInfoStyle: ViewStyle = {
  padding: spacing.md,
};

const restaurantNameStyle: TextStyle = {
  ...typography.h3,
  color: colors.text,
  marginBottom: spacing.xs,
};

const restaurantCuisineStyle: TextStyle = {
  ...typography.bodySmall,
  color: colors.textSecondary,
  marginBottom: spacing.sm,
};

const restaurantDetailsStyle: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const ratingContainerStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const ratingTextStyle: TextStyle = {
  ...typography.bodySmall,
  color: colors.text,
  marginLeft: spacing.xs,
};

const deliveryTimeStyle: TextStyle = {
  ...typography.bodySmall,
  color: colors.textSecondary,
};
