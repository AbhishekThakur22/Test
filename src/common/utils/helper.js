import { Toast } from 'native-base'

// export const showToast = ({ text, position, type, }) => {
//     Toast.show({ text, position, type,
//         // buttonText: "Okay",
//         // buttonTextStyle: { color: "#008000" },
//         // buttonStyle: { backgroundColor: "#5cb85c" }
//         // textStyle: { color: "yellow" },
//     })
// }
export const showToast = (msgObj) => {
    Toast.show(msgObj)
}