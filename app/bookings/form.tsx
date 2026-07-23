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
    const [expireDateError, setExpireDateError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [medicareCardError, setMedicareCardError] = useState("");
    const [dobError, setDobError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [Fullnameoncard, setFullNameOnCard] = useState("");
    const [ExpiryDate, setExpiryDate] = useState("");
    const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

    const [touched, setTouched] = useState({
        Firstname: false,
        Lastname: false,
    });

    const isFormValid = () => {
        const allBaseFilled = 
            Firstname.trim() !== "" &&
            Lastname.trim() !== "" &&
            DateofBirth.length === 10 &&
            Phonenumber.length === 10 &&
            Email.trim() !== "" &&
            MedicareCardNumber.trim() !== "" &&
            Fullnameoncard.trim() !== "" &&
            ExpiryDate.length === 5 &&
            gender !== "";

        const noErrors = dobError === "" && phoneError === "" && medicareCardError === "" && expireDateError === "" && emailError === "";

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

    const handleDobChange = (text: string, isChild: boolean) => {
        if (isChild) {
            setChildDOB(text);
        } else {
            setDateOfBirth(text);
        }

        if (text.length === 10) {
            const [day, month, year] = text.split('/');
            const d = parseInt(day, 10);
            const m = parseInt(month, 10) - 1;
            const y = parseInt(year, 10);
            const dob = new Date(y, m, d);

            if (dob.getFullYear() !== y || dob.getMonth() !== m || dob.getDate() !== d) {
                setDobError("Invalid date entered.");
                return;
            }

            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }

            if (isChild) {
                if (age >= 16) {
                    setDobError("Patients aged 16 and above must create their own form.");
                } else {
                    setDobError("");
                }
            } else {
                if (age < 16) {
                    setDobError("You must be 16 or older to book for yourself.");
                } else {
                    setDobError("");
                }
            }
        } else {
            setDobError("");
        }
    };

    const handlePhoneChange = (text: string) => {
        const cleaned = text.replace(/[^0-9]/g, '');
        setPhoneNumber(cleaned);

        if (cleaned.length > 0) {
            if (!cleaned.startsWith("04")) {
                setPhoneError("Australian mobile numbers must start with 04.");
            } else if (cleaned.length !== 10) {
                setPhoneError("Phone number must be exactly 10 digits.");
            } else {
                setPhoneError("");
            }
        } else {
            setPhoneError("");
        }
    };

    const handleMedicareCardNameChange = (text: string) => {
        const cleaned = text.replace(/[^0-9]/g, '');
        setMedicareCardNumber(cleaned);

        if (cleaned.length > 0) {
            if (cleaned.length !== 10) {
                setMedicareCardError('Medicare card number must be 10 digits.');
            } else {
                setMedicareCardError('');
            }
        } else {
            setMedicareCardError('');
        }
    };

    const handleExpiryChange = (text: string) => {
        setExpiryDate(text);
        const cleaned = text.replace(/[^0-9]/g, '');

        if (cleaned.length > 0) {
            if (cleaned.length < 4) {
                setExpireDateError("Enter a valid expiry date (MM/YY).");
                return;
            }

            const monthStr = cleaned.slice(0, 2);
            const yearStr = cleaned.slice(2, 4);

            const month = parseInt(monthStr, 10);
            const year = parseInt(yearStr, 10);

            if (month < 1 || month > 12) {
                setExpireDateError("Expiry date is invalid.");
            } 
            else if (year <= 26) {
                setExpireDateError("Expiry year must be after 2026.");
            } else {
                setExpireDateError("");
            }
        } else {
            setExpireDateError("");
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);

        if (text.trim() !== "") {
            const lowerEmail = text.toLowerCase();
            if (!lowerEmail.endsWith("@gmail.com") && !lowerEmail.endsWith("@hotmail.com")) {
                setEmailError("We only accept gmail or hotmail accounts. Enter a valid email address");
            } else {
                setEmailError(""); 
            }
        } else {
            setEmailError("");
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

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="interactive"
                >
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
                    <Text style={styles.label}>Your full name:</Text>
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

                    <Text style={styles.label}>Phone number:</Text>
                    <TextInput 
                        style={[styles.input, phoneError !== "" && { borderColor: 'red' }]} 
                        placeholder="e.g 04XX XXX XXX (Australia)" 
                        keyboardType="phone-pad" 
                        maxLength={10}
                        value={Phonenumber} 
                        onChangeText={handlePhoneChange} 
                    />
                    {phoneError !== "" && (
                        <Text style={{ color: 'red', fontSize: 12, marginBottom: 10, marginTop: -5, marginLeft: 5 }}>
                            {phoneError}
                        </Text>
                    )}

                    <Text style={styles.label}>Email address:</Text>
                    <TextInput style={styles.input} placeholder="@gmail.com or @hotmail.com" keyboardType="email-address" value={Email} onChangeText={handleEmailChange} />
                    {emailError !== "" && (
                        <Text style={{ color: 'red', fontSize: 12, marginBottom: 10, marginTop: -5, marginLeft: 5 }}>
                            {emailError}
                        </Text>
                    )}

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
                                keyboardType="numeric"
                            />
                        </View>
                    )}

                    <Text style={styles.label}>Enter your medicare card number as indicated by the image below:</Text>
                    <Image source={require("../../assets/images/medicare1.png")} style={{ width: 350, height: 175, resizeMode: "contain", marginBottom: 15 }} />
                    
                    <Text style={styles.label}>Medicare Card Number:</Text>
                    <TextInput 
                        style={[styles.input, medicareCardError !== "" && { borderColor: 'red' }]} 
                        placeholder="e.g. 1234 56789 1" 
                        keyboardType="phone-pad" 
                        maxLength={10}
                        value={MedicareCardNumber} 
                        onChangeText={handleMedicareCardNameChange} 
                    />
                    {medicareCardError !== "" && (
                        <Text style={{ color: 'red', fontSize: 12, marginBottom: 10, marginTop: -5, marginLeft: 5 }}>
                            {medicareCardError}
                        </Text>
                    )}

                    <Text style={styles.label}>Full name on card:</Text>
                    <TextInput style={styles.input} placeholder="E.g John A Citizen" keyboardType="default" value={Fullnameoncard} onChangeText={setFullNameOnCard} />

                    <Text style={styles.label}>Expiry Date (MM/YY):</Text>
                    <TextInputMask
                        type={'datetime'}
                        options={{ format: 'MM/YY' }}
                        value={ExpiryDate}
                        onChangeText={handleExpiryChange}
                        style={styles.input}
                        placeholder="MM/YY"
                        keyboardType="numeric"
                    />

                    {expireDateError !== "" && (
                        <Text style={{ color: 'red', fontSize: 12, marginBottom: 10, marginTop: -5, marginLeft: 5 }}>
                            {expireDateError}
                        </Text>
                    )}

                    <Text style={styles.subtitle}>
                        <Text style={{ fontWeight: 'bold' }}>Warning:</Text> Do not enter real medicare card information as this is a demo application. Please use dummy data for testing purposes.
                    </Text>

                    {/* Gender Selection */}
                    <Text style={styles.label}>What gender do you identify as?</Text>
                    <Pressable style={styles.input} onPress={() => setIsGenderModalVisible(true)}>
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

                    {/* Brief reason for visit */}
                    <Text style={styles.label}>Brief reason for visit:</Text>
                    <TextInput 
                        style={[styles.input, styles.textArea]} 
                        placeholder="Optional - Maximum 50 words"
                        multiline={true}
                        numberOfLines={4}
                        maxLength={300}
                        textAlignVertical="top" 
                    />

                    <View style={{ height: 100 }} />

                    <Text style={styles.subtitle}>Make sure all details are filled before proceeding.</Text>

                    <TouchableOpacity 
                        style={[
                            styles.nextButton, 
                            !isFormValid() && { backgroundColor: "#ccc" }
                        ]} 
                        onPress={() => {
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

// Ensure you have your styles defined below!


                
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