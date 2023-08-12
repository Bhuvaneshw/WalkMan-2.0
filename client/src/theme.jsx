import {extendTheme} from '@chakra-ui/react'

const AppTheme = extendTheme({
    colors: {
        primary: {
            50: '#5F04A7',
            100: '#5F04A7',
            200: '#5F04A7',
            300: '#5F04A7',
            400: '#5F04A7',
            500: '#5F04A7',
            600: '#5F04A7',
            700: '#5F04A7',
            800: '#5F04A7',
            900: '#5F04A7',
        },
    },
    styles: {
        global: {

            body: {
                bg: '#EEF2FD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },

            '#root': {
                width: '100%'
            },

            ".color-black70": {
                color: '#000000B2',
            },

            ".color-black40": {
                color: '#00000066',
            },

            ".color-white": {
                color: '#FBFCFE',
            },

            ".bg-color-white": {
                background: '#FBFCFE',
            },

            ".color-primary": {
                color: '#5F04A7',
            },

            ".color-primary80": {
                color: '#5F04A7cc',
            },

            ".color-primary40": {
                color: '#5F04A766',
            },

            ".color-primary10": {
                color: '#5F04A719',
            },

            '.flex': {
                display: 'flex',
                flexDirection: 'column'
            },

            '.fill': {
                flex: '1'
            }
        },
    },
})

export default AppTheme