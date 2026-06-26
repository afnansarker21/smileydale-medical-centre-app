import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServicesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
      </View>

      <ScrollView contentContainerStyle={styles.content}
  showsVerticalScrollIndicator={false}
></ScrollView>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>

          <Text style={styles.title}>Our Services</Text>

          <Text style={styles.subtitle}>Please note, we do not accept walk-in appointments. <Text style={{ fontWeight: "bold" }}>Scroll down for more information.</Text></Text>

          <Text style={styles.subtitle}>
            At  <Text style={{ fontWeight: "bold" }}>SmileyDale Medical Centre</Text>, we aim to provide comprehensive and compassionate healthcare to our community. We offer a range of services with our 8 talented general practitioners, including:
          </Text>

          <View style={{ marginTop: 10 }}>
            {[
              "General Practice",
              "Skin Checks",
              "Vaccinations",
              "Mental Health Support",
              "Chronic Disease Management",
            ].map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.subtitle}>
            {"\n"}Our general practitioners also specialise in various areas:
          </Text>

          <View style={{ marginTop: 10 }}>
            {[
              "Paediatrics",
              "Geriatrics",
              "Women's Health",
              "Men's Health",
              "Rehabilitation & Injury Management",
            ].map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.subtitle}>
            {"\n"}If you have any questions, call <Text style={{ fontWeight: "bold" }}>(02) 8731 9829</Text> or email <Text style={{ fontWeight: "bold" }}>info@smileydalemedical.com.au</Text>.
            {"\n\n"}Other services within NSW:
          </Text>

          <View style={{ marginTop: 10 }}>
            {[
              "Lifeline Australia: 13 11 14 (24/7 crisis support and suicide prevention)",
              "Beyond Blue: 1300 22 4636",
              "Kids Helpline: 1800 55 1800",
              "Healthdirect: 1800 022 222",
              "Medicare Mental Health: 1800 022 222",
            ].map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.subtitle}>
            {"\n"}<Text style={{ fontWeight: "bold" }}>If you are in immediate danger and/or life-threatening medical emergency, please dial 000.</Text>
          </Text>

        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  header: {
    width: "100%",
    height: 80,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",     
    justifyContent: "flex-start", 
    alignItems: "center",    
    paddingHorizontal: 16,    
    elevation: 4,
  },

  
  logo: {
    width: 80,                
    height: 80,
    resizeMode: "contain",    
    marginRight: 12,       
  },

  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },

 content: {
  padding: 20,
  paddingTop: 10,
  alignItems: "center",
},

container: {
  flex: 1,
  backgroundColor: "#DAFAEA",
},

card: {
  backgroundColor: "#FFFFFF",
  paddingVertical: 30,
  paddingHorizontal: 20, 
  borderRadius: 12,
  width: "100%",
},

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "left",
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

  listItem: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 6,
},

bullet: {
  fontSize: 16,
  marginRight: 8,
},

listText: {
  fontSize: 16,
  color: "#555",
  flex: 1,
},
});


