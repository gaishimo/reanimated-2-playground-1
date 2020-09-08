import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated"
import { View, Button, StyleSheet, Text } from "react-native"
import React, { useEffect, useState } from "react"

type Position = { x: number; y: number }

export default function App(props) {
  const [seconds, setSeconds] = useState<number>(0)
  const position = useSharedValue<Position>({ x: 100, y: 100 })

  const move = () => {
    position.value = { x: 300, y: 500 }
  }

  useEffect(() => {
    move()
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(position.value.x, {
        duration: 10000,
        easing: Easing.linear,
      }),
      top: withTiming(position.value.y, {
        duration: 10000,
        easing: Easing.linear,
      }),
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("setSeconds()")
      setSeconds(seconds => seconds + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.time}>
        <Text style={styles.timeText}>{seconds}</Text>
      </View>
      <Animated.View style={[styles.shape, animatedStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  time: { paddingTop: 32, alignItems: "flex-end", paddingRight: 16 },
  timeText: { fontSize: 20 },
  shape: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(250, 120, 0, 0.7)",
    position: "absolute",
  },
})
