
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import userImg from '../../assets/Mascote.png';
import colors from '../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header() {
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        async function loadStoreUserName() {
            const user: string = await AsyncStorage.getItem('@nomeApp:userName') || '';
            setUserName(user);
        }
        loadStoreUserName();
    }, []);



    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image source={userImg} style={styles.userImage} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 20,

    },
    userImage: {
        width: 75,
        height: 75,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        lineHeight: 40,
        fontWeight: 'bold'
    }

});