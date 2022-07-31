
import {createGlobalStyle} from 'styled-components'


 export const darkTheme = {
    
     
    body:'#000',
    fontColor:'#fff',
    zIndex:"-1"
}

 export const lightTheme = {
    body:'#fff',
    fontColor:'#000',
    zIndex:"-1"
};

export const GlobalStyles = createGlobalStyle`

body{
    background-color:${props=>props.theme.body};
    }


`
