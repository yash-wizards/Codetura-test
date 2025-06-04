import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { resetAndNavigate } from '../utils/NavigationUtils';

interface SplashScreenProps {
}

const SplashScreenContent: React.FC<SplashScreenProps> = () => {
    const insets = useSafeAreaInsets();

    useEffect(() => {
        setTimeout(() => {
            resetAndNavigate('Home')
        }, 2500)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#4A90E2"
                translucent={true}
            />
            <View style={[styles.content, { paddingTop: insets.top }]}>
                <View style={styles.iconContainer}>
                    <Icon name="assignment" size={moderateScale(80)} color="#FFFFFF" />
                </View>
                <Text style={styles.title}>Todo List</Text>
                <Text style={styles.subtitle}>Stay Organized, Stay Productive</Text>
            </View>
        </View>
    );
};

const SplashScreen: React.FC<SplashScreenProps> = () => {
    return (
        <SafeAreaProvider>
            <View style={{ flex: 1, backgroundColor: '#4A90E2' }}>
                <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
                    <SplashScreenContent />
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: scale(120),
        height: scale(120),
        borderRadius: scale(60),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(30),
    },
    title: {
        fontSize: moderateScale(32),
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: verticalScale(8),
        textAlign: 'center',
    },
    subtitle: {
        fontSize: moderateScale(16),
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginBottom: verticalScale(40),
    }
});

export default SplashScreen; 