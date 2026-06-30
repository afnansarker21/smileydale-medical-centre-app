import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mapping doctor names to their images
const DR_IMAGES: { [key: string]: any } = {
  "Dr. Alia Kumar": require("../../assets/images/drkumar.png"),
  "Dr. Greg Hopkins": require("../../assets/images/drhopkins.png"),
  "Dr. Josephine Sibanda": require("../../assets/images/drsibanda.png"),
  "Dr. Adam Kim": require("../../assets/images/drkim.png"),
  "Dr. Timothy Kritikos": require("../../assets/images/drkritikos.png"),
  "Dr. Khadijah Amin": require("../../assets/images/dramin.png"),
  "Dr. Akash Patel": require("../../assets/images/drpatel.png"),
  "Dr. Cindy Nguyen": require("../../assets/images/drnguyen.png"),
};

// Fixed type signature and bracket configuration for rosters
interface Shift {
  start: number;
  end: number;
}

interface DoctorSchedule {
  "in-person"?: { [key: number]: Shift };
  "telehealth"?: { [key: number]: Shift };
}

const DR_ROSTERS: { [key: string]: DoctorSchedule } = {
  "Dr. Alia Kumar": {
    "in-person": {
      1: { start: 7, end: 14 },  // Mon 7am-2pm
      2: { start: 7, end: 13 },  // Tue 7am-1pm
      5: { start: 10, end: 17 }, // Fri 10am-5pm
      0: { start: 7, end: 13 },  // Sun 7am-1pm
    },
    "telehealth": {
      1: { start: 7, end: 11 },  // Mon 7am-11am
    }
  },
  "Dr. Greg Hopkins": {
    "in-person": {
      1: { start: 15, end: 22 }, // Mon 3pm-10pm
      2: { start: 7, end: 13 },  // Tue 7am-1pm
      3: { start: 11, end: 16 }, // Wed 11am-4pm
      5: { start: 10, end: 17 }, // Fri 10am-5pm
      0: { start: 7, end: 13 },  // Sun 7am-1pm
    }
  },
  "Dr. Josephine Sibanda": {
    "in-person": {
      1: { start: 16, end: 19 }, // Mon 4pm-7pm
      2: { start: 17, end: 23 }, // Tue 2pm-11pm
      5: { start: 16, end: 23 }, // Fri 4pm-11pm
      0: { start: 14, end: 22 }, // Sun 2pm-10pm
    },

    "telehealth": {
        2: { start: 14, end: 16 }, // Tue 2pm-4pm
        0: { start: 14, end: 16 }, // Sun 2pm-4pm
    }
  },
  "Dr. Adam Kim": {
    "in-person": {
      4: { start: 7, end: 14 },  // Thu 7am-2pm
      6: { start: 16, end: 23 }, // Sat 4pm-11pm
    }
  },
  "Dr. Timothy Kritikos": {
    "in-person": {
      1: { start: 14, end: 23 }, // Mon 2pm-11pm
      2: { start: 14, end: 23 }, // Tue 2pm-11pm
      3: { start: 7, end: 14 },  // Wed 7am-2pm
      5: { start: 7, end: 14 },  // Fri 7am-2pm
    },

    "telehealth": {
        3: { start: 7, end: 10 },  // Wed 7am-10am
        5: { start: 7, end: 10 },  // Fri 7am-10am
    }
  },
  "Dr. Khadijah Amin": {
    "in-person": {
      1: { start: 7, end: 14 },  // Mon 7am-2pm
      6: { start: 7, end: 14 },  // Sat 7am-2pm
      0: { start: 7, end: 13 },  // Sun 7am-1pm
    },

    "telehealth": {
        6: { start: 7, end: 10 },  // Sat 7am-10am

  }

},
  "Dr. Akash Patel": {
    "in-person": {
      4: { start: 14, end: 23 }, // Thu 2pm-11pm
      6: { start: 7, end: 14 },  // Sat 7am-2pm
      0: { start: 14, end: 23 }, // Sun 2pm-11pm
    }
  },
  "Dr. Cindy Nguyen": {
    "in-person": {
      2: { start: 17, end: 23 }, // Tue 5pm-11pm
      3: { start: 7, end: 13 },  // Wed 7am-1pm
      4: { start: 7, end: 14 },  // Thu 7am-2pm
    },

    "telehealth": {
        2: { start: 14, end: 16} // Tue: 2pm-4pm
    }


  },
};

const MONTH_MAP: { [key: string]: { index: number; days: number } } = {
  "September 2026": { index: 8, days: 30 },
  "October 2026": { index: 9, days: 31 },
  "November 2026": { index: 10, days: 30 },
  "December 2026": { index: 11, days: 31 },
};

export default function BookingTypeScreen() {
  const router = useRouter();
  const { name, type } = useLocalSearchParams<{ name: string; type: string }>();

  const [selectedMonth, setSelectedMonth] = useState("September 2026");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [dynamicTimeSlots, setDynamicTimeSlots] = useState<string[]>([]);

  const doctorImage = DR_IMAGES[name] || require("../../assets/images/logo.png");
  
  // Safely extract roster type based on url path match
  const selectedType = type === "telehealth" ? "telehealth" : "in-person";
  const doctorRoster = DR_ROSTERS[name]?.[selectedType] || {};

  const currentMonthInfo = MONTH_MAP[selectedMonth];
  
  const startDayOfWeek = (() => {
    const d = new Date(2026, currentMonthInfo.index, 1).getDay();
    return d === 0 ? 6 : d - 1; 
  })();

  const daysArray = Array.from({ length: currentMonthInfo.days }, (_, i) => i + 1);
  const blankSlots = Array.from({ length: startDayOfWeek }, (_, i) => i);

  useEffect(() => {
    if (!selectedDay) {
      setDynamicTimeSlots([]);
      return;
    }

    const dateObj = new Date(2026, currentMonthInfo.index, selectedDay);
    const weekday = dateObj.getDay(); 
    const shift = doctorRoster[weekday];

    if (shift) {
      const slots: string[] = [];
      for (let hour = shift.start; hour < shift.end; hour++) {
        const formatTime = (h: number, m: string) => {
          const ampm = h >= 12 ? "PM" : "AM";
          const displayHour = h % 12 === 0 ? 12 : h % 12;
          return `${displayHour}:${m} ${ampm}`;
        };
        slots.push(formatTime(hour, "00"));
        slots.push(formatTime(hour, "30"));
      }
      setDynamicTimeSlots(slots);
    } else {
      setDynamicTimeSlots([]);
    }
    setSelectedTime(null); 
  }, [selectedDay, selectedMonth, doctorRoster]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Select Appointment</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Doctor Card */}
        <View style={styles.doctorSummaryCard}>
          <Image source={doctorImage} style={styles.avatar} />
          <View style={styles.doctorInfo}>
            <Text style={styles.docName}>{name}</Text>
            {type === "telehealth" ? (
              <Text style={styles.serviceText}>Telehealth services - 30 minute phone call.</Text>
            ) : (
              <Text style={styles.serviceText}>In-Person Consultation - 30 minutes</Text>
            )}
          </View>
        </View>

        {/* notifying patients about telehealth availability */}
        {type === "telehealth" && (
          <View style={styles.warningNotice}>
            <Text style={styles.warningText}>
              ⚠️ {name} is only available for telehealth on specific days.
            </Text>
          </View>
        )}


        <Text style={styles.sectionTitle}>Select a Date (2026)</Text>
        
        {/* Month Selector Tabs */}
        <View style={styles.monthTabs}>
          {["September", "October", "November", "December"].map((month) => (
            <Pressable
              key={month}
              style={[styles.monthTab, selectedMonth.includes(month) && styles.activeMonthTab]}
              onPress={() => {
                setSelectedMonth(`${month} 2026`);
                setSelectedDay(null);
              }}
            >
              <Text style={[styles.monthTabText, selectedMonth.includes(month) && styles.activeMonthTabText]}>
                {month.substring(0, 3)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Real Calendar Grid layout */}
        <Text style={styles.currentMonthLabel}>{selectedMonth}</Text>
        <View style={styles.calendarGrid}>
          
          {/* Calendar Week Labels */}
          {["M", "T", "W", "T", "F", "S", "S"].map((label, idx) => (
            <View key={`lbl-${idx}`} style={styles.calendarHeaderCell}>
              <Text style={styles.calendarHeaderCellText}>{label}</Text>
            </View>
          ))}

          {/* Offsetting blank slots */}
          {blankSlots.map((blank) => (
            <View key={`blank-${blank}`} style={styles.calendarDayCell} />
          ))}

          {/* Render real numeric calendar days */}
          {daysArray.map((day) => {
            const currentDayDate = new Date(2026, currentMonthInfo.index, day);
            const currentWeekday = currentDayDate.getDay();
            const isAvailable = !!doctorRoster[currentWeekday];

            return (
              <Pressable
                key={`day-${day}`}
                disabled={!isAvailable}
                style={[
                  styles.calendarDayCell,
                  selectedDay === day && styles.activeCalendarDay,
                  !isAvailable && styles.blockedCalendarDay
                ]}
                onPress={() => setSelectedDay(day)}
              >
                <Text style={[
                  styles.dayText,
                  selectedDay === day && styles.activeDayText,
                  !isAvailable && styles.blockedDayText
                ]}>
                  {day}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Custom Dropdown Time Menu */}
        <Text style={styles.sectionTitle}>Select a Time</Text>
        <Pressable 
          disabled={!selectedDay}
          style={[styles.dropdownSelector, !selectedDay && { opacity: 0.5 }]} 
          onPress={() => setShowTimeDropdown(!showTimeDropdown)}
        >
          <Text style={styles.dropdownSelectorText}>
            {selectedTime ? selectedTime : selectedDay ? "--- Click to select a time slot ---" : "Choose a date first"}
          </Text>
          <Text style={styles.dropdownArrow}>{showTimeDropdown ? "▲" : "▼"}</Text>
        </Pressable>

       {showTimeDropdown && selectedDay && (
  <ScrollView 
    style={styles.dropdownMenu} 
    nestedScrollEnabled={true}
  >
    {dynamicTimeSlots.map((time) => (
      <Pressable
        key={time}
        style={styles.dropdownItem}
        onPress={() => {
          setSelectedTime(time);
          setShowTimeDropdown(false);
        }}
      >
        <Text style={styles.dropdownItemText}>{time}</Text>
      </Pressable>
    ))}
  </ScrollView>
)}

        {/* Next Button */}
        <Pressable
          style={[styles.nextButton, (!selectedDay || !selectedTime) && styles.disabledNextButton]}
          disabled={!selectedDay || !selectedTime}
          onPress={() => router.push({
            pathname: "/bookings/form", 
            params: { name, type, date: `${selectedDay} ${selectedMonth}`, time: selectedTime }
          } as any)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
    height: 60,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 8, // Clean square look applied perfectly here
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  serviceText: {
    fontSize: 14,
    color: "#000000",
    marginTop: 4,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    marginTop: 10,
  },
  monthTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  monthTab: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 2,
  },
  activeMonthTab: {
    backgroundColor: "#BFDBE4",
  },
  monthTabText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
  },
  activeMonthTabText: {
    color: "#000",
  },
  currentMonthLabel: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
    color: "#555",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#FAFAFA",
    padding: 10,
    borderRadius: 12,
    marginBottom: 25,
  },
  calendarHeaderCell: {
    width: "14.28%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  calendarHeaderCellText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#999",
  },
  calendarDayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
    borderRadius: 6,
  },
  activeCalendarDay: {
    backgroundColor: "#BFDBE4",
  },
  blockedCalendarDay: {
    backgroundColor: "transparent",
    opacity: 0.15,
  },
  dayText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  activeDayText: {
    fontWeight: "bold",
    color: "#000",
  },
  blockedDayText: {
    textDecorationLine: "line-through",
    color: "#A0A0A0",
  },
  dropdownSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    padding: 14,
    borderRadius: 8,
    marginBottom: 5,
  },
  dropdownSelectorText: {
    fontSize: 14,
    color: "#333",
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666",
  },
  dropdownMenu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EAEAEB",
    maxHeight: 200,
    marginBottom: 20,
    overflow: "hidden",
  },
  dropdownItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#BFDBE4",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  disabledNextButton: {
    backgroundColor: "#E0E0E0",
    opacity: 0.6,
  },
  nextButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },

  doctorSummaryCardContainer: {
    marginBottom: 25,
  },
  // We remove the bottom margin from the main card since the container handles spacing now
  doctorSummaryCard: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  warningNotice: {
    backgroundColor: "#FFF3CD", // Soft warning yellow
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#FFEEBA",
  },
  warningText: {
    fontSize: 13,
    color: "#856404", // Dark amber text for readability
    fontWeight: "500",
  },
});