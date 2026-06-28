import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OurGPsScreen() {
  const router = useRouter();
  const doctors = [
    {
      name: "Dr. Alia Kumar",
      desc: "Dr Alia Kumar has been practising at SmileyDale Family Medical Centre for over 10 years. She completed her studies at The University of Sydney (USyd), earning a Bachelor of Medical Science and a Doctor of Medicine (MD). Dr Kumar specialises in women’s health and paediatrics. \n\nKnows: English, Hindi and Punjabi.",
      image: require("../../assets/images/drkumar.png"),
    },
    {
      name: "Dr. Greg Hopkins",
      desc: "Dr Greg Hopkins has over 30 years of General Practitioner experience. He has worked as a Consultant at Royal Prince Alfred Hospital. Dr. Hopkins specialises in Men’s Health, geriatrics and paediatrics. \n\n Knows: English.",
      image: require("../../assets/images/drhopkins.png"), 
    },
    {
      name: "Dr. Josephine Sibanda",
      desc: "Dr Josphine Sibanda has recently joined our Medical Centre.  She studied a Bachelor of Medical Science and a Doctor of Medicine (MD) at the University of Sydney (USyd). She has interned at Westmead Children's Hospital in 2019.  Dr Sibanda  specialises in paediatrics and women’s health. \n\n Knows: English, Zulu and Shona.",
      image: require("../../assets/images/drsibanda.png"), 
    },
    {
      name: "Dr. Adam Kim",
      desc: "Dr Adam Kim has worked at Smileydale Medical Centre for 5 years. He has studied a Bachelor of Medical Studies / Doctor of Medicine (BMed/MD) at the University of New South Wales (UNSW). Dr KIm speciaises in musculoskeletal conditions and sports injuries. \n\n Knows: English and Korean.",
      image: require("../../assets/images/drkim.png"),
    },
    {
      name: "Dr. Timothy Kritikos",
      desc: "Dr Timothy Kritikos has 10 years of General Practioner experience. He has studied a Bachelor of Applied Science (Physiotherapy) at the University of Sydney (USyd), additionally completed a Doctor of Medicine (MD).  Dr Kritikos takes care of Rehabilitation & Injury Management. \n\n Knows: English, Greek and Arabic.",
      image: require("../../assets/images/drkritikos.png"), 
    },
    {
      name: "Dr. Khadijah Amin",
      desc: "Dr Khadijah Amin has worked with Smileydale Medical Centre for 3 years. She has completed a Bachelor of Medical Studies / Doctor of Medicine (BMed/MD) at the University of New South Wales (UNSW). In 2021, she has interned at Prince of Wales Hospital. Dr Amin specialises in Preventative Health & Women’s Health. \n\n Knows: English, Arabic and Kurdish.",
      image: require("../../assets/images/dramin.png"), 
    },
    {
      name: "Dr. Akash Patel",
      desc: "Dr. Akash Patel has worked at Smileydale Medical Centre for 10 years. He has worked as a consultant at Prince of Wales Hospital in 2011. Dr Patel specialises in General Practice and Men’s Health. \n\n Knows: English, Gujarati, Hindi and Telugu.",
      image: require("../../assets/images/drpatel.png"), 
    },
    {
      name: "Dr. Cindy Nguyen",
      desc: "Dr. Cindy Nguyen has worked at Smileydale Medical Centre for over a year. She has studied a Bachelor of Applied Science (Physiotherapy) at the University of Sydney (USyd), additionally completed a Doctor of Medicine (MD).  Dr Cindy takes care of Rehabilitation, Injury Management, paediatrics and women’s health advocate. \n\n Knows: English, Vietnamese and Mandarin.",
      image: require("../../assets/images/drnguyen.png"), 
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
        <Text style={styles.title}>Our GPs</Text>
        <Text style={styles.subtitle}>Meet our team of eight dedicated general practitioners. 
          {"\n\n"}Once you have chosen a GP in mind, please click the button below to start your booking:</Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/bookings/finddoctor" as any)}
        >
          <Text style={styles.buttonText}>Book an appointment</Text>
        </Pressable>

        {doctors.map((doc, index) => (
          <View key={index} style={styles.card}>
            
            {/* Doctor Image on the Left */}
            {doc.image && <Image source={doc.image} style={styles.image} />}

            {/* Text Content on the Right */}
            <View style={styles.textContainer}>
              <Text style={styles.name}>{doc.name}</Text>
              <Text style={styles.desc}>{doc.desc}</Text>
            </View>

          </View>
        ))}
        
        <Text style={styles.subtitle}>
          <Text style={{ fontWeight: 'bold' }}>Note:</Text> All our general practitioners are trained to take care of general practice needs such as regular checkups, diagnoses for common flus, minor health issues, and prescriptions.
        </Text>

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
    flexDirection: "row", 
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    alignItems: "flex-start", 
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
});