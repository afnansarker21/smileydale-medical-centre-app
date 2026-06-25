// this is our home screen for the smileydale medical app :)

import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();

  return (

<SafeAreaView style={styles.container}>

  {/* Header */}
  <View style={styles.header}>
    <Text style={styles.headerText}>SmileyDale</Text>
  </View>

  {/* Content wrapper */}
  <View style={styles.content}>
    <View style={styles.card}>
      <Text style={styles.title}>
      Book your next appointment
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/booking")}
      >
        <Text style={styles.buttonText}>Book in a GP now</Text>
      </Pressable>

      <Text style={styles.subtitle}>
        {"\n"}SmileyDale Medical Centre is a general practice and healthcare clinic located in 71 Forest Street, Smileydale NSW.
        {"\n\n"}
        We are open from Monday to Sunday, everyday from 7am-11pm.
      </Text>
    </View>
  </View>

</SafeAreaView>
  );
}

const styles = StyleSheet.create({

    header: {
  width: "100%",
  height: 80,
  backgroundColor: "#FAFAFA",
  justifyContent: "center",
  alignItems: "center",
  elevation: 4,
  zIndex: 10,
},

  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  content: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
  container: {
    flex: 1,
    backgroundColor: "#DAFAEA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
  },


  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#BFDBE4",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
});