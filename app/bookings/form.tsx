import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingForm() {
    const router = useRouter();



    const { name, date, time, type } = useLocalSearchParams<{
        name: string;
        date: string;
        time: string;
        type: string;
    }>();

    const isFormValid = () => {
    return (
        Firstname.trim() !== "" &&
        Lastname.trim() !== "" &&
        DateofBirth.trim() !== "" &&
        Phonenumber.trim() !== "" &&
        Email.trim() !== "" &&
        MedicareCardNumber.trim() !== "" &&
        Fullnameoncard.trim() !== "" &&
        ExpiryDate.trim() !== "" &&
        gender !== ""
    );
};

    const [gender, setGender] = useState("");
    const [Firstname, setFirstName] = useState("");
    const [Lastname, setLastName] = useState("");
    const [DateofBirth, setDateOfBirth] = useState("");
    const [Phonenumber, setPhoneNumber] = useState("");
    const [Email, setEmail] = useState("");
    const [MedicareCardNumber, setMedicareCardNumber] = useState("");
    const [Fullnameoncard, setFullNameOnCard] = useState("");
    const [ExpiryDate, setExpiryDate] = useState("");
    const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
              {/* Header */}
              <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                  <Text style={styles.backButtonText}>← Back</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Please complete the form</Text>
                <View style={{ width: 50 }} />
              </View>

                  {/* This component handles the keyboard shift */}
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView  contentContainerStyle={styles.content}
             keyboardShouldPersistTaps="handled"
             keyboardDismissMode="interactive">

                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}><Text style={{fontWeight: 'bold'}}>General Practitioner:</Text> {name}</Text>
                    <Text style={styles.summaryText}><Text style={{fontWeight: 'bold'}}>Date Booked:</Text> {date}</Text>
                    <Text style={styles.summaryText}><Text style={{fontWeight: 'bold'}}>Time Booked:</Text> {time}</Text>
                    <Text style={styles.summaryText}><Text style={{fontWeight: 'bold'}}>Consultation Type:</Text> {type} appointment</Text>
                </View>

                <TextInput style={styles.input} placeholder="First name" />
                <TextInput style={styles.input} placeholder="Last name" />
                <TextInput style={styles.input} placeholder="Date of Birth (DD/MM/YYYY)" />
                <TextInput style={styles.input} placeholder="Phone number" keyboardType="phone-pad" />
                <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />

                <Text style={styles.label}>Enter your medicare card number as indicated by the image below:</Text>
                <Image source={require("../../assets/images/medicare1.png")} style={{ width: 350, height: 175, resizeMode: "contain", marginBottom: 15, alignItems: "center" }} />
                <TextInput style={styles.input} placeholder="Medicare Card Number" keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Full name on card" keyboardType="default" />
                <TextInput style={styles.input} placeholder="Expiry Date (MM/YY)" keyboardType="numeric" />

              <Text style={styles.subtitle}>
                       <Text style={{ fontWeight: 'bold' }}>Warning:</Text> Do not enter real medicare card information as this is a demo application. Please use dummy data for testing purposes.
                     </Text>

                {/* Gender Selection */}
             <Text style={styles.label}>What gender do you identify as?</Text>
            <Pressable 
              style={styles.input} 
              onPress={() => setIsGenderModalVisible(true)}>

           <Text style={{color: gender ? "#000" : "#999"}}>
           {gender || "Select your gender"}
          </Text>
          </Pressable>

{/* Gender Modal */}
<Modal visible={isGenderModalVisible} transparent={true} animationType="fade">
    <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
            {["Female", "Male", "Non-binary", "Prefer not to say"].map((option) => (
                <Pressable 
                    key={option} 
                    style={styles.modalItem}
                    onPress={() => { setGender(option); setIsGenderModalVisible(false); }}
                >
                    <Text>{option}</Text>
                </Pressable>
            ))}
        </View>
    </View>
</Modal>

{/* textbox for reason for the visit*/}
<Text style={styles.label}>Brief reason for visit:</Text>
<TextInput 
    style={[styles.input, styles.textArea]} 
    placeholder="Maximum 50 words"
    multiline={true}
    numberOfLines={4}
    maxLength={300}
    textAlignVertical="top" 
/>


                {/* Buffer for keyboard */}
                    <View style={{ height: 100 }} />

                    <TouchableOpacity 
    style={[
        styles.nextButton, 
        !isFormValid() && { backgroundColor: "#ccc" } // Gray out if invalid
    ]} 
    onPress={() => {
        if (isFormValid()) {
            router.push("/bookings/confirmation");
        } else {
            alert("Please fill in all fields before continuing.");
        }
    }}
    disabled={!isFormValid()} // Actually prevents the click
>
    <Text style={styles.nextButtonText}>Next</Text>
</TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

                
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#FFFFFF",
        paddingTop: Platform.OS === "android" ? 25 : 0, // Adjust for Android status bar
     },
    
     content: { 
        padding: 20, 
        paddingTop: 10 
    },
    
    // Fixed: headerTitle matches the tag used in JSX
     headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

header: {
    height: 60,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    elevation: 2,
    
  },
    
    summaryBox: { 
        backgroundColor: "#FFFFFF", 
        padding: 15, 
        borderRadius: 12, 
        marginBottom: 20, 
        borderWidth: 1, 
        borderColor: "#E0E0E0" 
    },

    subtitle: {
        fontSize: 14,
        color: "#FF0000",
        marginBottom: 15,

    },


    summaryText: { fontSize: 16, marginBottom: 6, color: "#333" },
    input: { 
        backgroundColor: "#FFFFFF", 
        padding: 14, 
        borderRadius: 8, 
        borderWidth: 1, 
        borderColor: "#CCC", 
        marginBottom: 15, 
        fontSize: 16 
    },
    nextButton: { 
        backgroundColor: "#87CEEB", 
        paddingVertical: 16, 
        borderRadius: 8, 
        alignItems: "center", 
        marginTop: 10 
    },
    nextButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },

     logo: {
    width: 80,                
    height: 80,
    resizeMode: "contain",    
    marginRight: 12,       
  },

  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },

  label: { 
    fontSize: 16, 
    marginBottom: 8, 
    fontWeight: "bold" 
},

modalOverlay: { 
    flex: 1, 
    justifyContent: "center", 
    backgroundColor: "rgba(0,0,0,0.5)", 
    padding: 20 
},
modalContent: { 
    backgroundColor: "#FFF", 
    borderRadius: 12, 
    padding: 20
 },

modalItem: { 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: "#EEE" 
},

textArea: {
    height: 100, // Makes it taller for easier reading
    paddingTop: 10,
},

});