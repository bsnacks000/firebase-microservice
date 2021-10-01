export default {
	palette: {
		primary: {
		  light: '#e5dec9',
		  main: '#c6bed8',
		  dark: '#a59cb8',
		  contrastText: '#5A5656'
		},
		secondary: {
		  light: '#ff6333',
		  main: '#ff3d00',
		  dark: '#b22a00',
		  contrastText: '#fff'
		}
	  },

    spreadThis: {
        typography: {
            useNextVariants: true
        },
    
        form: {
            textAlign: 'left'
        },
    
        pageTitle: {
            margin: '10px auto 10px auto'
        }, 
    
        textField: {
            margin: '10px auto 10px auto'
        },
    
        button: {
            marginTop: '20',
            position: 'relative',
            marginBottom: '20',
        },
        spinner: {
            position: 'absolute'
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10,
            marginBottom: 10,
        },
        progress: {
            position: 'absolute'
        },

        invisibleRuler: {
            border: 'none',
            margin: 4
            },
        visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20
            }
        
    }
}
