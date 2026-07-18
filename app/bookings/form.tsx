import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TextInputMask } from 'react-native-masked-text';
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
    const allBaseFilled = 
        Firstname.trim() !== "" &&
        Lastname.trim() !== "" &&
        DateofBirth.length === 10 &&
        Phonenumber.trim() !== "" &&
        Email.trim() !== "" &&
        MedicareCardNumber.trim() !== "" &&
        Fullnameoncard.trim() !== "" &&
        ExpiryDate.length === 5 &&
        gender !== "";

    // 2. No errors allowed
    const noErrors = dobError === "";

    // 3. Conditional logic
    if (isForSelf) {
        return allBaseFilled && noErrors;
    } else {
        return allBaseFilled && 
               noErrors &&
               childFirstName.trim() !== "" && 
               childLastName.trim() !== "" && 
               childDOB.length === 10;
    }
};

    const [gender, setGender] = useState("");
    const [isForSelf, setIsForSelf] = useState(true);
    const [Firstname, setFirstName] = useState("");
    const [Lastname, setLastName] = useState("");
    const [DateofBirth, setDateOfBirth] = useState("");
    const [childFirstName, setChildFirstName] = useState("");
    const [childLastName, setChildLastName] = useState("");
    const [childDOB, setChildDOB] = useState("");
    const [Phonenumber, setPhoneNumber] = useState("");
    const [Email, setEmail] = useState("");
    const [MedicareCardNumber, setMedicareCardNumber] = useState("");
    const [dobError, setDobError] = useState("");
    const [Fullnameoncard, setFullNameOnCard] = useState("");
    const [ExpiryDate, setExpiryDate] = useState("");
    const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

    const [touched, setTouched] = useState({
    Firstname: false,
    Lastname: false,
    // Add other fields here if you want to be thorough
});

    const handleDobChange = (text: string, isChild: boolean) => {
    // 1. Update the correct state variable
    if (isChild) {
        setChildDOB(text);
    } else {
        setDateOfBirth(text);
    }

    // 2. Only validate when the full date is typed (DD/MM/YYYY = 10 chars)
    if (text.length === 10) {
        const [day, month, year] = text.split('/');
        const d = parseInt(day, 10);
        const m = parseInt(month, 10) - 1;
        const y = parseInt(year, 10);
        const dob = new Date(y, m, d);

        // Date validity check
        if (dob.getFullYear() !== y || dob.getMonth() !== m || dob.getDate() !== d) {
            setDobError("Invalid date entered.");
            return;
        }

        // Age calculation
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        // 3. Validation Logic
        if (isChild) {
            // Child must be under 16
            if (age >= 16) {
                setDobError("Patients aged 16 and above must create their own form.");
            } else {
                setDobError("");
            }
        } else {
            // Adult/Self must be 16 or older
            if (age < 16) {
                setDobError("You must be 16 or older to book for yourself.");
            } else {
                setDobError("");
            }
        }
    } else {
        // Clear error while typing
        setDobError("");
    }
};

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

                  <Text style={styles.subtitle}>
                <Text style={{ fontWeight: 'bold' }}>Note:</Text> Forms must be filled out by patients aged 16 and above. For patients under 16, a parent or guardian must fill out the form on their behalf.
              </Text>

                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}><Text style={{fontWeight: 'bold'}}>General Practitioner:</Text> {name}</Text>
                    <Text style={styles.summaryText}><Text style={{fontWeight: 'bold'}}>Date Booked:</Text> {date}</Text>
                    <Text style={styles.summaryText}><Text style={{fontWeight: 'bold'}}>Time Booked:</Text> {time}</Text>
                    <Text style={styles.summaryText}><Text style={{fontWeight: 'bold'}}>Consultation Type:</Text> {type} appointment</Text>
                </View>

                {/* First Name Field */}
<TextInput 
    style={[styles.input, (touched.Firstname && Firstname.trim() === "") && { borderColor: 'red' }]} 
    placeholder="First name" 
    value={Firstname} 
    onChangeText={setFirstName} 
    onBlur={() => setTouched({ ...touched, Firstname: true })}
/>
{touched.Firstname && Firstname.trim() === "" && (
    <Text style={styles.errorText}>First name is required</Text>
)}

{/* Last Name Field */}
<TextInput 
    style={[styles.input, (touched.Lastname && Lastname.trim() === "") && { borderColor: 'red' }]} 
    placeholder="Last name" 
    value={Lastname} 
    onChangeText={setLastName} 
    onBlur={() => setTouched({ ...touched, Lastname: true })}
/>
{touched.Lastname && Lastname.trim() === "" && (
    <Text style={styles.errorText}>Last name is required</Text>
)}

                 <Text style={styles.label}>Date of Birth (DD/MM/YYYY):</Text>
                <TextInputMask
                 type={'datetime'}
                options={{ format: 'DD/MM/YYYY' }}
                 value={DateofBirth}
                 onChangeText={(text: string) => handleDobChange(text, false)}
                style={styles.input}
                placeholder="DD/MM/YYYY"
                 keyboardType="numeric"
                />
                {dobError !== "" && (
                 <Text style={{ color: 'red', fontSize: 12, marginBottom: 10, marginTop: -5, marginLeft: 5 }}>
                 {dobError}
                </Text>
                )}


                <TextInput style={styles.input} placeholder="Phone number" keyboardType="phone-pad" value={Phonenumber} onChangeText={setPhoneNumber} />
                <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={Email} onChangeText={setEmail} />

                <Text style={styles.label}>Who is this appointment for?</Text>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                 <TouchableOpacity 
                 style={[styles.toggleButton, isForSelf && styles.activeToggle]}
                onPress={() => setIsForSelf(true)}
                     >
                <Text>Myself</Text>
                </TouchableOpacity>
                    <TouchableOpacity 
    style={[styles.toggleButton, !isForSelf && styles.activeToggle]}
             onPress={() => setIsForSelf(false)}
                >
            <Text>A Child</Text>
            </TouchableOpacity>
            </View>

            {!isForSelf && (
    <View>
        <Text style={styles.label}>Child's Details</Text>
        <TextInput 
            style={styles.input} 
            placeholder="Child's first name" 
            value={childFirstName} 
            onChangeText={setChildFirstName} 
        />
        <TextInput 
            style={styles.input} 
            placeholder="Child's last name" 
            value={childLastName} 
            onChangeText={setChildLastName} 
        />
        <TextInputMask
            type={'datetime'}
            options={{ format: 'DD/MM/YYYY' }}
            value={childDOB}
            onChangeText={(text: string) => handleDobChange(text, true)}
            style={styles.input}
            placeholder="Child's DOB (DD/MM/YYYY)"
            keyboardType="numeric"/>
        {dobError !== "" && (
            <Text style={{ color: 'red', fontSize: 12, marginBottom: 10, marginTop: -5, marginLeft: 5 }}>
                {dobError}
            </Text>
        )}
    </View>
)}

                <Text style={styles.label}>Enter your medicare card number as indicated by the image below:</Text>
                <Image source={require("../../assets/images/medicare1.png")} style={{ width: 350, height: 175, resizeMode: "contain", marginBottom: 15, alignItems: "center" }} />
                <TextInput style={styles.input} placeholder="Medicare Card Number" keyboardType="numeric" value={MedicareCardNumber} onChangeText={setMedicareCardNumber} />
                <TextInput style={styles.input} placeholder="Full name on card" keyboardType="default" value={Fullnameoncard} onChangeText={setFullNameOnCard} />

                <Text style={styles.label}>Expiry Date (MM/YY):</Text>
                <TextInputMask
                type={'datetime'}
                options={{
                 format: 'MM/YY'
                     }}
                 value={ExpiryDate}
                onChangeText={(text: string) => setExpiryDate(text)}
                style={styles.input}
                placeholder="MM/YY"
                keyboardType="numeric"
                />

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
        !isFormValid() && { backgroundColor: "#ccc" }
    ]} 
    onPress={() => {
        // One final check right here
        if (!isFormValid()) {
            alert("Please fix the errors before continuing.");
            return;
        }
        router.push("/bookings/confirmation");
    }}
    disabled={!isFormValid()} 
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

    errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 5,
    marginTop: -10,
    marginBottom: 10,
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
    nextButtonText: { 
        color: "#FFFFFF", 
        fontSize: 16, 
        fontWeight: "bold" 
    },

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

toggleButton: {
  flex: 1, // Makes them share the width equally
  padding: 15,
  borderWidth: 1,
  borderColor: '#ccc',
  alignItems: 'center',
  justifyContent: 'center',
},
activeToggle: {
  backgroundColor: '#e0f7fa', // Light blue background
  borderColor: '#00796b',      // Darker border to show it's active
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

dateContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 15,
  // Add these to match your existing TextInput style
  height: 50, 
  paddingHorizontal: 10,
},
dateInput: {
  // Make the individual boxes (DD, MM, YYYY) look like your inputs
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  backgroundColor: '#fff',
  textAlign: 'center',
  fontSize: 16,
  // Adjust width based on how many boxes you have
  width: '30%', 
  height: 50,
},

textArea: {
    height: 100, // Makes it taller for easier reading
    paddingTop: 10,
},

});