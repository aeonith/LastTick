import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { login, signUp, resetPassword, isLoggedIn } from '../src/lib/auth';
import { loadTheme } from '../src/lib/storage';
import { getThemeColors } from '../src/lib/theme';
import InputField from '../src/components/InputField';
import Button from '../src/components/Button';
import AnimatedHourglass from '../src/components/AnimatedHourglass';

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark' | 'void'>('dark');
  const [colors, setColors] = useState(getThemeColors('dark'));

  useEffect(() => {
    checkAuth();
    loadTheme().then((t) => {
      setTheme(t);
      setColors(getThemeColors(t));
    });
  }, []);

  const checkAuth = async () => {
    const loggedIn = await isLoggedIn();
    if (loggedIn) {
      router.replace('/');
    }
  };

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    const result = await login(email.trim(), password);
    
    if (result.success) {
      router.replace('/');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  const handleSignUp = async () => {
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    const result = await signUp(email.trim(), password);
    
    if (result.success) {
      router.replace('/');
    } else {
      setError(result.error || 'Sign up failed');
    }
    
    setLoading(false);
  };

  const handleReset = async () => {
    setError('');
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    const result = await resetPassword(email.trim());
    
    if (result.success) {
      alert('Password reset email sent! Check your inbox.');
      setMode('login');
    } else {
      setError(result.error || 'Reset failed');
    }
    
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AnimatedHourglass opacity={0.08} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.logo, { color: colors.text }]}>⏳</Text>
            <Text style={[styles.title, { color: colors.text }]}>LastTick</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {mode === 'login' && 'Welcome back'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'reset' && 'Reset your password'}
            </Text>
          </View>

          <View style={styles.form}>
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              colors={colors}
            />

            {mode !== 'reset' && (
              <InputField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
                colors={colors}
              />
            )}

            {mode === 'signup' && (
              <InputField
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                secureTextEntry
                colors={colors}
              />
            )}

            {error && (
              <View style={[styles.errorBox, { backgroundColor: colors.error + '15', borderColor: colors.error }]}>
                <Text style={[styles.errorText, { color: colors.error }]}>⚠️ {error}</Text>
              </View>
            )}

            {mode === 'login' && (
              <>
                <Button
                  title={loading ? 'Logging in...' : 'Log In'}
                  onPress={handleLogin}
                  colors={colors}
                  variant="primary"
                  disabled={loading || !email || !password}
                  loading={loading}
                />

                <TouchableOpacity onPress={() => setMode('reset')} style={styles.linkContainer}>
                  <Text style={[styles.link, { color: colors.accent }]}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                  <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or</Text>
                  <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                </View>

                <Button
                  title="Create New Account"
                  onPress={() => setMode('signup')}
                  colors={colors}
                  variant="outline"
                />
              </>
            )}

            {mode === 'signup' && (
              <>
                <Button
                  title={loading ? 'Creating account...' : 'Sign Up'}
                  onPress={handleSignUp}
                  colors={colors}
                  variant="primary"
                  disabled={loading || !email || !password || !confirmPassword}
                  loading={loading}
                />

                <TouchableOpacity onPress={() => setMode('login')} style={styles.linkContainer}>
                  <Text style={[styles.link, { color: colors.accent }]}>
                    Already have an account? Log in
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {mode === 'reset' && (
              <>
                <Button
                  title={loading ? 'Sending...' : 'Send Reset Email'}
                  onPress={handleReset}
                  colors={colors}
                  variant="primary"
                  disabled={loading || !email}
                  loading={loading}
                />

                <TouchableOpacity onPress={() => setMode('login')} style={styles.linkContainer}>
                  <Text style={[styles.link, { color: colors.accent }]}>
                    ← Back to login
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              By continuing, you agree that this app is for philosophical reflection only and not medical advice
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 72,
    marginBottom: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  errorBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
