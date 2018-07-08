import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export const TextButton = ({ children, onPress, styleBtn, styleTxt }) => {
  return (
     <TouchableOpacity style={styleBtn} onPress={onPress}>
       <Text style={styleTxt}>{children}</Text>
     </TouchableOpacity>
   )
}
