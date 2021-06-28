import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    FlatList
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import Header from '../../Components/Header/Header';
import colors from '../../styles/colors';
import OptionButton from '../../Components/OptionButton/OptionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface vaccineType {
    title: string,
    active: boolean
}

export default function Home() {
    const navigation = useNavigation();

    const vaccineTypeList: vaccineType[] = [
        {
            title: '1ª Dose COVID',
            active: false
        },
        {
            title: '2ª Dose COVID',
            active: false
        },
    ]


    const [listVaccine, setLista] = useState<vaccineType[]>(vaccineTypeList);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.header}>
                    <Header />
                    <Text style={styles.question}>
                        Qual a dose você vai solicitar?
                    </Text>
                </View>
                <View style={styles.vaccineListCss}>
                    <FlatList
                        data={listVaccine}
                        renderItem={({ item }) => (
                            <OptionButton title={item.title} active />
                        )}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        contentContainerStyle={styles.itemVaccineCSS}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 20
    },
    question: {
        fontSize: 17,
        color: colors.heading
    },
    vaccineListCss: {

    },
    itemVaccineCSS: {

    }
});
