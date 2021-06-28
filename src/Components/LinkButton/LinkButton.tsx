import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';
import colors from '../../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string
}

export function LinkButton({ title, ...rest }: ButtonProps) {

    return (
        <>
            <TouchableOpacity style={styles.MyButtonStyle}
                activeOpacity={0.7}
                {...rest}
            >
                <Text style={styles.MyTextButtonStyle}> {title} </Text>
            </TouchableOpacity>
        </>

    );
}


const styles = StyleSheet.create({
    MyButtonStyle: {
        backgroundColor: colors.white,
        borderRadius: 8,
        height: 50,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16
    },
    MyTextButtonStyle: {
        color: colors.redButton,
        fontSize: 18,
        fontWeight: 'bold'
    },
});