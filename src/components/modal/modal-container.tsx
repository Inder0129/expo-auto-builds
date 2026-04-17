import React from 'react';
import { View, Modal, ModalProps } from 'react-native';

type ModalContainerProps = {
  children: React.ReactNode;
  visible?: boolean;
  animationType?: ModalProps['animationType'];
  transparent?: boolean;
};

export function ModalContainer({
  children,
  visible = true,
  animationType = 'slide',
  transparent = true,
}: ModalContainerProps) {
  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      statusBarTranslucent
    >
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </Modal>
  );
}
