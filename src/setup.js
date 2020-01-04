import * as React from "react";
import { Provider } from "mobx-react";
import { StyleProvider } from "native-base";

import App from "./app";
import getTheme from "./common/theme/components";
import variables from "./common/theme/variables/platform";
import { stores } from '../src/store'

export default class Setup extends React.Component {
    render() {
        return (
            <StyleProvider style={getTheme(variables)}>
                <Provider {...stores}>
                    <App />
                </Provider>
            </StyleProvider>
        )
    }
}
