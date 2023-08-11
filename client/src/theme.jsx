import {extendTheme} from '@chakra-ui/react'

const AppTheme = extendTheme({
    styles: {
        global: {
            body: {
                bg: '#EEF2FD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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

            ".title": {
                fontWeight: 'bold',
                fontSize: 'x-large'
            }
        },
    },
    // components: {
    //     Button: {
    //         // 1. We can update the base styles
    //         baseStyle: {
    //             fontWeight: 'bold', // Normally, it is "semibold"
    //         },
    //         // 2. We can add a new button size or extend existing
    //         sizes: {
    //             xl: {
    //                 h: '56px',
    //                 fontSize: 'lg',
    //                 px: '32px',
    //             },
    //         },
    //         // 3. We can add a new visual variant
    //         black: {
    //             color: '#19282b'
    //         },
    //
    //         variants: {
    //             'with-shadow': {
    //                 bg: 'red.400',
    //                 boxShadow: '0 0 20px 20px #efdfde',
    //             },
    //             // 4. We can override existing variants
    //             solid: (props) => ({
    //                 bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
    //             }),
    //             // 5. We can add responsive variants
    //             sm: {
    //                 bg: 'teal.500',
    //                 fontSize: 'md',
    //             },
    //         },
    //         // 6. We can overwrite defaultProps
    //         defaultProps: {
    //             size: 'lg', // default is md
    //             variant: 'sm', // default is solid
    //             colorScheme: 'green', // default is gray
    //         },
    //     },
    // },
})

export default AppTheme