import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { resetAndNavigate } from '../utils/NavigationUtils';

interface SplashScreenProps {
}

const SplashScreen: React.FC<SplashScreenProps> = () => {

    useEffect(() => {
        setTimeout(() => {
            resetAndNavigate('Home')
        }, 2500)
    }, [])

    return (
        <View style={styles.container}>
            <View
                style={styles.content}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>📝</Text>
                </View>
                <Text style={styles.title}>Todo List</Text>
                <Text style={styles.subtitle}>Stay Organized, Stay Productive</Text>
            </View>
        </View>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    icon: {
        fontSize: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginBottom: 40,
    }
});

export default SplashScreen; 