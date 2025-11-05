import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveUserData, setOnboardingComplete, loadTheme } from '../src/lib/storage';
import { UserData } from '../src/lib/estimate';
import { getThemeColors } from '../src/lib/theme';
import InputField from '../src/components/InputField';
import Button from '../src/components/Button';
import Disclaimer from '../src/components/Disclaimer';
import GothicBackground from '../src/components/GothicBackground';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark' | 'void'>('dark');
  const [colors, setColors] = useState(getThemeColors('dark'));

  const [formData, setFormData] = useState<Partial<UserData>>({
    birthdate: new Date(1990, 0, 1),
    smoker: false,
    heavyDrinker: false,
    exerciseFrequency: 'sometimes',
    sleepHours: 7,
    stressLevel: 5,
    dietQuality: 'average',
    believesInNumerology: false,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  React.useEffect(() => {
    loadTheme().then((t) => {
      setTheme(t);
      setColors(getThemeColors(t));
    });
  }, []);

  const completeOnboarding = async () => {
    try {
      await saveUserData(formData as UserData);
      await setOnboardingComplete(true);
      router.replace('/dashboard');
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
      alert('Failed to save your data. Please try again.');
    }
  };

  const renderWelcome = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.title, { color: colors.text }]}>Welcome to LastTick</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        A philosophical reflection on time and existence.
      </Text>
      
      <Disclaimer colors={colors} variant="warning" />
      
      <Text style={[styles.body, { color: colors.textSecondary }]}>
        This app helps you maintain awareness of life's finite nature—not to induce fear, but to
        inspire presence, intention, and meaning.
      </Text>
      <Text style={[styles.body, { color: colors.textSecondary }]}>
        All data is stored locally on your device and never shared.
      </Text>
    </View>
  );

  const renderHealthInputs = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.title, { color: colors.text }]}>Your Health Profile</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Help us estimate your life expectancy
      </Text>

      <TouchableOpacity
        style={[styles.dateButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={[styles.dateText, { color: colors.text }]}>
          Birthdate: {formData.birthdate?.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={formData.birthdate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            if (Platform.OS === 'android') {
              setShowDatePicker(false);
            }
            if (event.type === 'dismissed') return;
            if (date) setFormData({ ...formData, birthdate: date });
          }}
          maximumDate={new Date()}
        />
      )}

      {Platform.OS === 'ios' && showDatePicker && (
        <Button
          title="Done"
          onPress={() => setShowDatePicker(false)}
          colors={colors}
          variant="primary"
        />
      )}

      <View style={styles.toggleContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Do you smoke?</Text>
        <View style={styles.toggleButtons}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.smoker && { backgroundColor: colors.accent },
              { borderColor: colors.border },
            ]}
            onPress={() => setFormData({ ...formData, smoker: true })}
          >
            <Text style={[styles.toggleText, { color: formData.smoker ? '#FFF' : colors.text }]}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              !formData.smoker && { backgroundColor: colors.accent },
              { borderColor: colors.border },
            ]}
            onPress={() => setFormData({ ...formData, smoker: false })}
          >
            <Text style={[styles.toggleText, { color: !formData.smoker ? '#FFF' : colors.text }]}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Drink alcohol frequently?</Text>
        <View style={styles.toggleButtons}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.heavyDrinker && { backgroundColor: colors.accent },
              { borderColor: colors.border },
            ]}
            onPress={() => setFormData({ ...formData, heavyDrinker: true })}
          >
            <Text
              style={[styles.toggleText, { color: formData.heavyDrinker ? '#FFF' : colors.text }]}
            >
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              !formData.heavyDrinker && { backgroundColor: colors.accent },
              { borderColor: colors.border },
            ]}
            onPress={() => setFormData({ ...formData, heavyDrinker: false })}
          >
            <Text
              style={[styles.toggleText, { color: !formData.heavyDrinker ? '#FFF' : colors.text }]}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Exercise frequency</Text>
        <View style={styles.toggleButtons}>
          {(['never', 'sometimes', 'regular'] as const).map((freq) => (
            <TouchableOpacity
              key={freq}
              style={[
                styles.toggleButton,
                formData.exerciseFrequency === freq && { backgroundColor: colors.accent },
                { borderColor: colors.border },
              ]}
              onPress={() => setFormData({ ...formData, exerciseFrequency: freq })}
            >
              <Text
                style={[
                  styles.toggleText,
                  { color: formData.exerciseFrequency === freq ? '#FFF' : colors.text },
                ]}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <InputField
        label="Average sleep hours per night (1-16)"
        colors={colors}
        value={formData.sleepHours?.toString() || ''}
        onChangeText={(text) => {
          const num = parseInt(text, 10);
          if (Number.isFinite(num)) {
            const clamped = Math.min(16, Math.max(1, num));
            setFormData({ ...formData, sleepHours: clamped });
          } else if (text === '') {
            setFormData({ ...formData, sleepHours: undefined as any });
          }
        }}
        keyboardType="number-pad"
        placeholder="7"
      />

      <InputField
        label="Stress level (1-10)"
        colors={colors}
        value={formData.stressLevel?.toString() || ''}
        onChangeText={(text) => {
          const num = parseInt(text, 10);
          if (Number.isFinite(num)) {
            const clamped = Math.min(10, Math.max(1, num));
            setFormData({ ...formData, stressLevel: clamped });
          } else if (text === '') {
            setFormData({ ...formData, stressLevel: undefined as any });
          }
        }}
        keyboardType="number-pad"
        placeholder="5"
      />

      <View style={styles.toggleContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Diet quality</Text>
        <View style={styles.toggleButtons}>
          {(['poor', 'average', 'good'] as const).map((quality) => (
            <TouchableOpacity
              key={quality}
              style={[
                styles.toggleButton,
                formData.dietQuality === quality && { backgroundColor: colors.accent },
                { borderColor: colors.border },
              ]}
              onPress={() => setFormData({ ...formData, dietQuality: quality })}
            >
              <Text
                style={[
                  styles.toggleText,
                  { color: formData.dietQuality === quality ? '#FFF' : colors.text },
                ]}
              >
                {quality.charAt(0).toUpperCase() + quality.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderBeliefs = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.title, { color: colors.text }]}>Beliefs & Philosophy</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Optional: Numerology and astrology
      </Text>

      <View style={styles.toggleContainer}>
        <Text style={[styles.label, { color: colors.text }]}>
          Do you believe in numerology or astrology?
        </Text>
        <View style={styles.toggleButtons}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.believesInNumerology && { backgroundColor: colors.accent },
              { borderColor: colors.border },
            ]}
            onPress={() => setFormData({ ...formData, believesInNumerology: true })}
          >
            <Text
              style={[
                styles.toggleText,
                { color: formData.believesInNumerology ? '#FFF' : colors.text },
              ]}
            >
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              !formData.believesInNumerology && { backgroundColor: colors.accent },
              { borderColor: colors.border },
            ]}
            onPress={() => setFormData({ ...formData, believesInNumerology: false })}
          >
            <Text
              style={[
                styles.toggleText,
                { color: !formData.believesInNumerology ? '#FFF' : colors.text },
              ]}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {formData.believesInNumerology && (
        <>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            We'll calculate your Life Path Number and Sun Sign from your birthdate to make small
            adjustments to your life expectancy estimate (+/- 0-3 years).
          </Text>
          <InputField
            label="Birth time (optional, HH:MM)"
            colors={colors}
            placeholder="09:30"
            value={formData.birthTime}
            onChangeText={(text) => setFormData({ ...formData, birthTime: text })}
          />
          <InputField
            label="Birth place (optional)"
            colors={colors}
            placeholder="New York, NY"
            value={formData.birthPlace}
            onChangeText={(text) => setFormData({ ...formData, birthPlace: text })}
          />
        </>
      )}
    </View>
  );

  const renderPrivacy = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.title, { color: colors.text }]}>Legal & Privacy</Text>

      <Disclaimer colors={colors} variant="legal" />

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>🔒 Complete Privacy</Text>
        <Text style={[styles.body, { color: colors.textSecondary }]}>
          All information is stored locally on your device only. Nothing is uploaded to
          servers or shared with anyone. Ever.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>⚖️ No Liability</Text>
        <Text style={[styles.body, { color: colors.textSecondary }]}>
          We are not doctors. We cannot predict the future. By continuing, you agree that the creators
          of this app are not responsible for any decisions you make based on these estimates.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>🎯 Purpose</Text>
        <Text style={[styles.body, { color: colors.textSecondary }]}>
          To inspire mindful living through awareness of mortality. "Memento Mori" - remember you will die, 
          so you may truly live.
        </Text>
      </View>
    </View>
  );

  const steps = [renderWelcome, renderHealthInputs, renderBeliefs, renderPrivacy];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      completeOnboarding();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <GothicBackground opacity={0.12} blur={10}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {steps[step]()}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View style={styles.progressDots}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === step ? colors.accent : colors.border,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          {step > 0 && (
            <Button title="Back" onPress={handleBack} colors={colors} variant="outline" />
          )}
          <View style={{ flex: 1, marginLeft: step > 0 ? 8 : 0 }}>
            <Button
              title={isLastStep ? 'Begin' : 'Next'}
              onPress={handleNext}
              colors={colors}
              variant="primary"
            />
          </View>
        </View>
      </View>
    </GothicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  stepContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Georgia',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    fontFamily: 'Georgia',
    letterSpacing: 0.5,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  dateButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
  },
  toggleContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  toggleButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
});
