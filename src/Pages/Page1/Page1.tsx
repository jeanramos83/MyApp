import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
//import colors from './src/styles/colors';
import { useNavigation } from '@react-navigation/core';
import { MyButton } from '../../Components/MyButton/MyButton';


export default function Page1() {
    //sintaxe cria um objeto array com 2 valores
    // 1º valor do array - variavel que armazena estado
    // 2º a função que trabalhar com estado - setar o valor
    const [txtIdadeAnos, setIdade] = React.useState('');
    const [flVisualiza, setFlVisualiza] = React.useState(false);
    const navigation = useNavigation();

    function clickMe() {
        setFlVisualiza(true);
        if (parseInt(txtIdadeAnos) >= 18) {
            alert('Você pode tirar carteira!');
        } else {
            alert('Voce não pode tirar carteira');
        }

    }

    function backToWelcome() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <Text>Olá H1</Text>
                        <TextInput
                            placeholder="Digite sua idade"
                            style={styles.textInput}
                            onChangeText={text => setIdade(text)}
                            value={txtIdadeAnos}
                        />
                        <MyButton title='Clique Aqui!' onPress={clickMe} />
                        <MyButton title='Voltar Aqui!' onPress={backToWelcome} />

                        <Text> {
                            flVisualiza ?
                                txtIdadeAnos.length > 0 ?
                                    Number(txtIdadeAnos) >= 18 ? '🎅' : '👮‍♂️'
                                    : ''
                                : ''
                        }</Text>
                        <Text style={
                            flVisualiza ?
                                Number(txtIdadeAnos) >= 18 ? styles.imcObesidadeIII : styles.imcNormal
                                : styles.imcNormal
                        }>
                            Teste Texto H1
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 8,
        borderWidth: 1,
        width: '100%',
        textAlign: 'center',
        marginBottom: 16
    },
    buttonClickMe: {
        marginTop: 16,
        backgroundColor: 'red',
        borderRadius: 8,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButtonClickMe: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    imcObesidadeIII: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 18
    },
    imcNormal: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 18
    }
});
