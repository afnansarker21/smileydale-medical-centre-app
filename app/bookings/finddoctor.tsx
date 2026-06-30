import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// similar to ourGPs.tsx, but with availabilities and a telehealth/in person booking options:

export default function FindDoctorScreen() {
  const router = useRouter();

  const doctors = [
    { 
      name: "Dr. Alia Kumar", 
      desc: "Available Monday 7am-2pm,\n Tuesday 7am-1pm, Friday 10am-5pm and Sunday 7am-1pm.",
      image: require("../../assets/images/drkumar.png"),
      availableTypes: ["telehealth", "in-person"], 
    },

    { 
      name: "Dr. Greg Hopkins", 
      desc: "Available Monday 3pm-10pm, Tuesday 7am-1pm, Wednesday 11am-4pm, Friday 10am-5pm and Sunday 7am-1pm.",
      image: require("../../assets/images/drhopkins.png"),
      availableTypes: ["in-person"], 
    },

    {
      name: "Dr. Josephine Sibanda",
      desc: "Available Monday 4pm-11pm, Tuesday 2pm-11pm, Friday 4pm-11pm and Sunday 2pm-10pm.",
      image: require("../../assets/images/drsibanda.png"),
      availableTypes: ["telehealth", "in-person"],

    },

    {
      name: "Dr. Adam Kim",
      desc: "Available Saturday 4pm-11pm and Thursday 7am-2pm.",
      image: require("../../assets/images/drkim.png"),
      availableTypes: ["in-person"],
    },

    {
      name: "Dr. Timothy Kritikos",
      desc: "Available Monday 2pm-11pm, Tuesday 2pm-11am, Wednesday 7am-2pm, Friday 7am-2pm.",
      image: require("../../assets/images/drkritikos.png"),
      availableTypes: ["telehealth", "in-person"],
    },

    {
      name: "Dr. Khadijah Amin",
      desc: "Available Monday 7am-2pm, Saturday 7am-2pm, Sunday 7am-1pm.",
      image: require("../../assets/images/dramin.png"),
      availableTypes: ["telehealth", "in-person"],
    },

    {
      name: "Dr. Akash Patel",
      desc: "Available Thursday  2pm-11pm, Saturday7am-2pm and Sunday 2pm-11am.",
      image: require("../../assets/images/drpatel.png"),
      availableTypes: ["in-person"],
    },

    {
      name: "Dr. Cindy Nguyen",
      desc: "Available Tuesday 2pm-11pm, Wednesday 7am-1pm and Thursday 7am-2pm.",
      image: require("../../assets/images/drnguyen.png"),
      availableTypes: ["telehealth", "in-person"],
    },
    


   
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Please select a GP</Text>
        <Text style={styles.subtitle}>
          Please note that we do not accept walk-in visits to make an appointment. {"\n\n"}
          If there are any issues with our mobile/web app to make appointments, please call our line <Text style={{ fontWeight: "bold" }}>(02) 8731 9829</Text>. Our friendly staff will be there to help.
          {"\n\n"}If this is your first time making a booking via this mobile app, please click the button below for further information about our GPs and their specialisations:
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/(tabs)/ourGPs" as any)}
        >
          <Text style={styles.buttonText}>View GP info</Text>
        </Pressable>

        {/* Doctor Profiles */}
        {doctors.map((doc, index) => (
          <View key={index} style={styles.card}>
            
            {/* Top row: Image & Text Info */}
            <View style={styles.profileRow}>
              {/* Doctor Image */}
              {doc.image && <Image source={doc.image} style={styles.image} />}

              {/* Text Content */}
              <View style={styles.textContainer}>
                <Text style={styles.name}>{doc.name}</Text>
                <Text style={styles.desc}>{doc.desc}</Text>
              </View>
            </View>

            {/* Bottom row: Booking Option Buttons */}
            <View style={styles.bookingButtonGroup}>
              {doc.availableTypes.includes("in-person") && (
                <Pressable 
                  style={styles.bookingButton}
                  onPress={() => router.push({
                    pathname: "/bookings/type",
                    params: { name: doc.name, type: "in-person" }
                  } as any)}
                >
                  <Text style={styles.bookingButtonText}>In-Person</Text>
                </Pressable>
              )}

              {doc.availableTypes.includes("telehealth") && (
                <Pressable 
                  style={styles.bookingButton}
                  onPress={() => router.push({
                    pathname: "/bookings/type",
                    params: { name: doc.name, type: "telehealth" }
                  } as any)}
                >
                  <Text style={styles.bookingButtonText}>Telehealth</Text>
                </Pressable>
              )}
            </View>

          </View>
        ))}

        <Text style={styles.subtitle}>
          <Text style={{ fontWeight: 'bold' }}>Note:</Text> All our general practitioners are trained to take care of general practice needs such as regular checkups, diagnoses for common flus, minor health issues, and prescriptions. 
        {"\n\n"}Not all our GPs cover telehealth services.</Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/" as any)} 
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  card: {
    flexDirection: "column",
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    color: "#555",
  },
  subtitle: {
    fontSize: 15,
    color: "#000000",   
    marginBottom: 20, 
  },
  button: {
    backgroundColor: "#BFDBE4",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: "center", 
    marginBottom: 20,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  bookingButtonGroup: {
    flexDirection: "row",
    justifyContent: "flex-start", 
    gap: 10,
  },
  bookingButton: {
    backgroundColor: "#BFDBE4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  bookingButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
  },
});