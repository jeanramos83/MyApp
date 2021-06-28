import React from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../../Services/api';
import { MyButton } from '../../Components/MyButton/MyButton';
import colors from '../../styles/colors';
import Loading from '../../Components/Loading/Loading';
import { LinkButton } from '../../Components/LinkButton/LinkButton';

import { SafeAreaView } from 'react-native-safe-area-context';

interface NewStudentProps {
    nome: string,
    cpf: string,
    email: string,
    senha: string
}

//type nameOfIcons = 'eye' | 'eye-off'

enum nameOfIcons {
    eye = 'eye',
    eyeOff = 'eye-off'
}

interface PasswordConfig {
    flShowPass: boolean,
    iconPass: nameOfIcons
}

interface listErrors {
    errors: string[];
}

export default function Login() {
    const [objPasswordConfig, setConfigForm] = React.useState<PasswordConfig>
        ({ flShowPass: false, iconPass: nameOfIcons.eye });

    const [objPasswordConfirmConfig, setConfigConfirmForm] = React.useState<PasswordConfig>
        ({ flShowPass: false, iconPass: nameOfIcons.eye });


    const [txtName, setName] = React.useState('')
    const [txtDocument, setDocument] = React.useState('')
    const [txtEmail, setEmail] = React.useState('')
    const [txtPassword, setPassword] = React.useState('')
    const [txtPasswordConfirm, setPasswordConfirm] = React.useState('')
    const navigation = useNavigation();
    const [flLoading, setLoading] = React.useState(false)
    const [lstErrors, setListErrors] = React.useState<listErrors>({ errors: [] });

    function handleChangeIcon() {
        let icone = objPasswordConfig.iconPass === nameOfIcons.eye ? nameOfIcons.eyeOff : nameOfIcons.eye;
        let flShowPass = !objPasswordConfig.flShowPass;
        setConfigForm({ iconPass: icone, flShowPass });
    }

    function handleChangeIconConfirm() {
        let icone = objPasswordConfirmConfig.iconPass === nameOfIcons.eye ? nameOfIcons.eyeOff : nameOfIcons.eye;
        let flShowPass = !objPasswordConfirmConfig.flShowPass;
        setConfigConfirmForm({ iconPass: icone, flShowPass });
    }


    async function handlePostNewStudent() {

        let objNewStudent: NewStudentProps = {
            nome: txtName,
            senha: txtPassword,
            cpf: txtDocument,
            email: txtEmail
        };

        if (txtName.trim() === '') {
            alert('Campo Nome é obrigatório');
            return;
        }
        if (txtEmail.trim() === '') {
            alert('Campo Email é obrigatório');
            return;
        }
        if (txtDocument.trim() === '') {
            alert('Campo CPF é obrigatório');
            return;
        }
        if (txtPassword.trim() === '') {
            alert('Campo senha é obrigatório');
            return;
        }
        if (txtPassword.trim() !== txtPasswordConfirm.trim()) {
            alert('Senha e confirmar senha não conferem!');
            return;
        }
        setLoading(true);
        try {
            const response = await api.post(`/aluno`, objNewStudent);
            alert('Student Created!');
            navigation.navigate('Home');
        }
        catch (error) {
            setListErrors({ errors: error.response.data.errors });
        }
        setLoading(false);
    }

    if (flLoading) {
        return (<Loading />);
    }

    function navigateToBack() {
        navigation.goBack();
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textTitle}>Preencha seus dados!</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Nome"
                onChangeText={text => setName(text)}
                maxLength={50}
                value={txtName}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Cpf"
                onChangeText={text => setDocument(text)}
                maxLength={11}
                value={txtDocument}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                maxLength={50}
                value={txtEmail}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.textInputPassword}
                    placeholder="Senha"
                    onChangeText={text => setPassword(text)}
                    value={txtPassword}
                    secureTextEntry={objPasswordConfig.flShowPass}
                    maxLength={11}
                />
                <Feather
                    style={styles.iconEye}
                    name={objPasswordConfig.iconPass}
                    size={28}
                    color={colors.redButton}
                    onPress={handleChangeIcon}
                />
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.textInputPassword}
                    placeholder="Confirmar Senha"
                    onChangeText={text => setPasswordConfirm(text)}
                    value={txtPasswordConfirm}
                    secureTextEntry={objPasswordConfirmConfig.flShowPass}
                    maxLength={11}
                />
                <Feather
                    style={styles.iconEye}
                    name={objPasswordConfirmConfig.iconPass}
                    size={28}
                    color={colors.redButton}
                    onPress={handleChangeIconConfirm}
                />
            </View>

            <MyButton title='Salvar' onPress={handlePostNewStudent} />
            <LinkButton title='Voltar'
                onPress={navigateToBack}
            />

            <FlatList

                data={lstErrors.errors}
                keyExtractor={error => error}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: itemError }) => (
                    <Text>{itemError}</Text>

                )}
            />

        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        color: 'red',
        fontSize: 28,
        marginBottom: 8
    },
    textInput: {
        height: 40,
        borderColor: colors.gray,
        borderRadius: 8,
        borderWidth: 1,
        width: '70%',
        marginBottom: 16,
        paddingHorizontal: 8
    },
    textInputPassword: {
        height: 40,
        borderWidth: 0,
        width: '70%',
        marginBottom: 16,
        paddingHorizontal: 8
    },
    buttonIn: {
        backgroundColor: colors.redButton,
        borderRadius: 8,
        height: 50,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextIn: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    passwordContainer: {
        marginBottom: 16,
        height: 40,
        borderColor: '#dcdce6',
        borderRadius: 8,
        borderWidth: 1,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconEye: {
        paddingHorizontal: 8,
        marginTop: 6
    },
});